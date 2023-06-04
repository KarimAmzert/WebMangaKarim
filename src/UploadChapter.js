import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import { getDatabase, ref, set, child, push, update } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL} from "firebase/storage";

export function UploadChapter(){
    const [images, setImages] = useState( [] );
    const [imageURLs, setImageURLs] = useState([]);
    const [title, setTitle] = useState("");
    const [chapterNumber, setChapterNumber] = useState("");
    const navigate = useNavigate();
    const [mangadata, setmangadata] = useState("");
    const params = useParams();

    useEffect(() => {
        async function getChapitres() {
          // obtenir les pages d'un manga
          const urlChapitres = `http://localhost:4000/mangas/${params.mangaId}`;
          const resultatChapitres = await fetch(urlChapitres, {
            method: "GET",
            headers: {
              "content-Type": "application/json; charset=UTF-8",
            },
          });
    
          if (resultatChapitres.ok) {
            const data = await resultatChapitres.json();
            console.log(data);
            setmangadata(data);
          } else {
            console.log("une erreur s'est productive lors de l'appel à /Manga");
          }
        }
        
    
        getChapitres().then(() => console.log("done getChapitres"));
      }, [params.mangaId]);

    function handleChangetitle(event){
        setTitle(event.target.value);

    }
     function handleChangeChapterNumber(event){
        setChapterNumber(event.target.value);

    }
   
    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function cancel() {
        navigate("/");
    }

    async function uploadNewChapter() {
      //créer l'objet json du chapitre dans la bd et le storage et update la bd avec les urls des pages
        const db = getDatabase();
        const chapterRef = child(ref(db), `data/mangas/${params.mangaId}/chapters`);
        const newChapterRef = push(chapterRef);
        const chapterId = newChapterRef.key;
        const newDate = new Date();
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        const chapterData = {
          title: title,
          date: `${month}-${date}-${year}`,
          chapterId: chapterId
        };
      
        async function writeMangaData() {
          const db = getDatabase();
          const reference = child(
            ref(db),
            `data/mangas/${params.mangaId}/chapters/` + chapterNumber
          );
          console.log(chapterId);
          return set(reference, chapterData);
        }
      
        await writeMangaData().then(() => {
          const storage = getStorage();
          const storageRef = sRef(
            storage,
            `mangas/${params.mangaId}/chapters/${chapterId}`
          );
          const uploadPromises = images.map((file) => {
            const fileName = file.name;
            const fileRef = sRef(storageRef, fileName);
            return uploadBytes(fileRef, file).then(() => {
              return getDownloadURL(fileRef);
            });
          });
      
          Promise.all(uploadPromises).then((urls) => {
            console.log(urls);
            const db = getDatabase();
            const pageData = {
              pages: urls,
            };
            const pageRef = child(
              ref(db),
              `data/mangas/${params.mangaId}/chapters/${chapterNumber}`
            );
            update(pageRef, pageData);
          }).catch((error) => {
            console.error(error);
          });
        });
      }

    useEffect(() => {
      //useEffect qui set des urls temporaire d'images dans la liste 
      //newImageUrls pour les afficher sur la page
            if (images.length < 1) return;
            const newImageUrls = [];
            images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
            setImageURLs(newImageUrls);
          }, [images]);

    return (
        mangadata &&
        <><div className="notification">
        <div className="section">
              <img src="/images/apple-touch-icon@2.png" alt="logo"/>
            <h1 className="title is-1 has-text-centered ">Upload {mangadata.name} Chapter</h1>
        </div>
        <div class="card">
            <div class="card-content">
                <div className="field">
                <img src={mangadata.cover} alt={mangadata.name}></img>
                <div className="control has-icons-left">
                    
                        <input type="number"
                        onChange={handleChangeChapterNumber}
                            className="number is-rounded"
                            placeholder="Chapter Number" />
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        
                    </div>
                    <label className="label" htmlFor="email">Please note that if the chapter number entered is already inside the manga, it will be overwritten. Your first chapter's number should b 0.</label>
                    &nbsp;
                    <div className="control has-icons-left">
                    
                        <input
                        onChange={handleChangetitle}
                            className="input is-rounded"
                            placeholder="Chapter title" />
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        
                    </div>
                    <label className="label" htmlFor="email">Please note that if we find that your chapter's title violates our code of conduct, your work will be removed and your account may be subject to getting banned.</label>
                    &nbsp;
                    
                </div>
                &nbsp;
                <div className="control has-icons-left">
                   
                <input type="file" multiple accept="image/jpeg, image/png" onChange={onImageChange}/>
                {imageURLs.map(imageSrc => <img src={imageSrc} alt={imageSrc}/>) }
                   <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                   
               </div>
             
               <label className="label" htmlFor="email">Your pages should be uploaded in order (first to last).</label>
                    &nbsp;
                    <div className="control has-icons-left">
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        <label className="label" htmlFor="email">{mangadata.name} Chapters:</label>
                    </div>
                    
                    &nbsp;
                    {mangadata.chapters !== undefined &&
                      <div className="row columns is-multiline">
                    &nbsp;
                    {mangadata.chapters.map((chapitre) => (
                <div className="column is-12">
                  <Link to={`/mangas/${params.mangaId}/chapters/${mangadata.chapters.indexOf(chapitre)}`}>
                <button className="button is-normal has-background-info-light ml-2">{chapitre.title}</button>
                </Link>
                </div>
              ))}
                </div>
                      }
                <button className="button is-dark is-rounded" onClick={uploadNewChapter}>
                    Upload
                </button>
                &nbsp;
                <button className="button is-dark is-rounded" onClick={cancel}>
                    Go Back
                </button>
            </div>
        </div>
    </div>
  </>
    );
}
