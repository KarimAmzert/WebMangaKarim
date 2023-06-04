import { update } from "firebase/database";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { getDatabase, ref, set, child, push } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL} from "firebase/storage";

export function Upload(){
    const [images, setImages] = useState( [] );
    const [imageURLs, setImageURLs] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    function handleChangetitle(event){
        setTitle(event.target.value);

    }
    function handleChangedescription(event){
        setDescription(event.target.value);

    }
    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function cancel() {
        navigate("/");
    }

    async function upload() {
   //créer l'objet json du manga dans la bd et le storage et update la bd avec l'url du cover
        const db = getDatabase();
        const mangaRef = child(ref(db), 'data/mangas');
        const newMangaRef = push(mangaRef);
        const mangaId = newMangaRef.key;
        const mangaData = {
          name: title,
          description: description,
          overall: 0
        }
      
        async function writeMangaData() {
          const db = getDatabase();
          const reference = child(ref(db), 'data/mangas/' + mangaId);
          console.log(mangaId);
          return set(reference, mangaData);
        }
      
        await writeMangaData().then(() => {
          const storage = getStorage();
          const storageRef = sRef(storage, `mangas/${mangaId}/cover.jpg`);
          const uploadTask = uploadBytes(storageRef, images[0]);
          uploadTask.then(() => {
            getDownloadURL(storageRef).then((url) => {
              console.log(url);
              const db = getDatabase();
              const coverData = {
                cover: url
              }
              const coverRef = child(ref(db), 'data/mangas/' + mangaId);
              update(coverRef, coverData);
              const authorData =  {[title]: {mangaId:mangaId, name:title}};
              const mangaauthor = child(ref(db), 'data/Users/' + sessionStorage.getItem("id") + "/mangas");
              update(mangaauthor, authorData);
            });
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
        <><div className="notification">
        <div className="section">
              <img src="/images/apple-touch-icon@2.png" alt="logo"/>
            <h1 className="title is-1 has-text-centered ">Upload a new manga</h1>
        </div>
        <div class="card">
            <div class="card-content">
                <div className="field">
                
                    <div className="control has-icons-left">
                   
                        <input
                        onChange={handleChangetitle}
                            className="input is-rounded"
                            placeholder="Manga title" />
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        
                    </div>
                    <label className="label" htmlFor="email">Please note that if we find that your manga's title violates our code of conduct, your work will be removed and your account may be subject to getting banned.</label>
                    &nbsp;
                    <div className="control has-icons-left">
                   
                    <textarea
                    onChange={handleChangedescription}
                       className="textarea is-rounded"
                       placeholder="Manga description" />
                   
               </div>
                    <label className="label" htmlFor="email"> Your manga's description should accurately describe the synopsis behind you work's story and events.</label>
                </div>
                &nbsp;
                <div className="control has-icons-left">
                   
                <input type="file" multiple accept="image/jpeg, image/png" onChange={onImageChange}/>
                {imageURLs.map(imageSrc => <img src={imageSrc} alt={imageSrc}/>) }
                   <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                   
               </div>
               <label className="label" htmlFor="email"> Your cover image should be at least 200 pixels width by 306 pixels height.</label>
                    &nbsp;
                <button className="button is-dark is-rounded" onClick={upload}>
                    Upload
                </button>
                &nbsp;
                <button className="button is-dark is-rounded" onClick={cancel}>
                    Go Back
                </button>
            </div>
        </div>
    </div><div className="modal" id="modal1">
            <div className="modal-background"></div>
        </div></>
    );
}
