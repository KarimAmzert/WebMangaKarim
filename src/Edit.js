import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import { getDatabase, ref, child, update, remove } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

export function Edit(){
    const [images, setImages] = useState( [] );
    const [imageURLs, setImageURLs] = useState([]);
    const [title, setTitle] = useState("");
    const userId = sessionStorage.getItem("id");
    
    const [description, setDescription] = useState("");
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
            setTitle(data.name);
            setDescription(data.description);
            images.push(data.cover);
          } else {
            console.log("une erreur s'est productive lors de l'appel à /Manga");
          }
        }
        
    
        getChapitres().then(() => console.log("done getChapitres"));
      }, [images, params.mangaId]);

    function handleChangetitle(event){
        setTitle(event.target.value);

    }
    function handleChangedescription(event){
        setDescription(event.target.value);

    }
    function openModal() {
      document.getElementById("modal2").classList.add("is-active");
    }
    function closeModal() {
      document.getElementById("modal2").classList.remove("is-active");
    }
    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function cancel() {
        navigate("/");
    }

    async function updateManga() {
        const mangaData = {
          name: title,
          description: description,
        }
      
        async function updateMangaData() {
          const db = getDatabase();
          const reference = child(ref(db), 'data/mangas/' + params.mangaId);
          console.log(params.mangaId);
          return update(reference, mangaData);
        }
      
        await updateMangaData().then(() => {
          const storage = getStorage();
          const storageRef = sRef(storage, `mangas/${params.mangaId}/cover.jpg`);
          const uploadTask = uploadBytes(storageRef, images[0]);
          uploadTask.then(() => {
            getDownloadURL(storageRef).then((url) => {
              console.log(url);
              const db = getDatabase();
              const coverData = {
                cover: url
              }
              const coverRef = child(ref(db), 'data/mangas/' + params.mangaId);
              update(coverRef, coverData);
            });
          }).catch((error) => {
            console.error(error);
          });
        });
      }
      
      async function deleteManga() {
  
        async function deleteMangaData() {
    
            // Get a reference to the folder you want to delete
            const storage = getStorage();
            const folderRef = sRef(storage, `/mangas/${params.mangaId}`);
            
            // Delete the folder and its contents
            deleteObject(folderRef)
              .then(() => {
                console.log("Folder deleted successfully.");
              })
              .catch((error) => {
                console.error("Error deleting folder:", error);
              });
            
        }
        await deleteMangaData().then(() => {
            const db = getDatabase();
            const reference = child(
              ref(db),
              `data/mangas/${params.mangaId}`
              
            );
            const referencelist = child(
              ref(db),
              `data/Users/${userId}/mangas/${mangadata.name}`
              
            );
            remove(referencelist);
            remove(reference);
            navigate("/");
        });
      }
    

    useEffect(() => {
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
            <h1 className="title is-1 has-text-centered ">Edit {mangadata.name}</h1>
        </div>
        <div class="card">
            <div class="card-content">
                <div className="field">
                <img src={mangadata.cover} alt={mangadata.name}></img>
                
                    <div className="control has-icons-left">
                    
                        <input
                        onChange={handleChangetitle}
                            className="input is-rounded"
                            value={title}
                            placeholder="Manga title" />
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        
                    </div>
                    <label className="label" htmlFor="email">Please note that if we find that your manga's title violates our code of conduct, your work will be removed and your account may be subject to getting banned.</label>
                    &nbsp;
                    <div className="control has-icons-left">
                   <textarea
                    onChange={handleChangedescription}
                       className="textarea is-rounded"
                       value={description}
                       placeholder="Manga description" />
                 
                   
               </div>
                    <label className="label" htmlFor="email"> Your manga's description should accurately describe the synopsis behind you work's story and events.</label>
                </div>
                &nbsp;
                <div className="control has-icons-left">
                   
                <input type="file" multiple accept="image/jpeg, image/png" onChange={onImageChange}/>
                {imageURLs.map(imageSrc => <img src={imageSrc} alt="cover"/>) }
                   <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                   
               </div>
             
               <label className="label" htmlFor="email"> Your cover image should be at least 200 pixels width by 306 pixels height.</label>
                    &nbsp;
                   
                    <div className="control has-icons-left">
                        <span className="icon is-small is-left"><img src="/images/apple-touch-icon@2.png" alt="logo"/></span>
                        <label className="label" htmlFor="email">{mangadata.name} Chapters:</label>
                    </div>
                    <Link to={`/manga/${params.mangaId}/uploadChapter`}>
                    <label className="label" htmlFor="email">Add new {mangadata.name} Chapter</label>
                    </Link>
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
                              <div className="modal" id="modal2">
                                    <div className="modal-background">
                                    <img src="/images/apple-touch-icon@2.png" alt="logo"/>
                                            &nbsp;
                                    </div>
                                    <div className="modal-card">
                                    <header className="modal-card-head">
                                    <h1 className="modal-card-title">
                                        <b>WebManga</b>
                                    </h1>
                                        <button className="delete"
                                            aria-label="close"onClick={closeModal}>
                                        </button>
                                    </header>
                                    <section className="modal-card-body has-text-centered-danger">
                                        <p>WARNING: this will permanently remove your Manga from our data and your account. Are you sure you want to proceed?</p>
                                    </section>
                                    <footer className="modal-card-foot">
                                                        <button className="button is-rounded is-danger" onClick={deleteManga}>
                                                            Yes, remove the Manga
                                                        </button>
                                                        <button className="button is-rounded is-dark" onClick={closeModal}>
                                                            Cancel
                                                        </button>
                                                    </footer>
                                    </div>
                                    </div>
                <button className="button is-dark is-rounded" onClick={updateManga}>
                    Update
                </button>
                &nbsp;
                <button className="button is-danger is-rounded" onClick={openModal}>
                    Remove Manga
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
