import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./composantChapitres.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {TokenContexte} from "./ContextToken";
import { IdContexte } from "./ContextId";
import {serveur} from "./Constantes";
import { getDatabase, ref, get, child, update } from "firebase/database";

export function ComposantChapitres(props) {
  const contextToken = useContext(TokenContexte);
  const contextId = useContext(IdContexte);
  const params = useParams();
  const [chapitresObjets, setChapitresObjets] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [username, setUsername] = useState("");
  const [mangaData, setmangaData] = useState([]);
  const [isFavorite, setIsFavorite] = useState();

  const backgroundStyle = {
    minHeight: "67vh",
    backgroundImage: `url(${props.props.cover})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "30px",
    position: "relative",
    overflow: "hidden",
    filter: "blur(25px)",
    // Add any additional styles here
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  async function addManga() {
    const urlAddManga = `${serveur}/favorite`;
    console.log(sessionStorage.getItem("token"));
    const resUrlAddPodcast = await fetch(urlAddManga,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
        "Authorization": `Bearer ${contextToken.token}`
      },
      body:JSON.stringify({mangaId:params.mangaId})
    });
    if (resUrlAddPodcast.ok) {
      setIsFavorite(true);
      console.log("Manga add with success");
    } else {
      console.log("Manga not add");
    }
  }
  async function deleteManga() {
    const urlDeleteManga = `${serveur}/favorite`;
    console.log(sessionStorage.getItem("token"));
    const resUrlDeletePodcast = await fetch(urlDeleteManga,{
      method:"DELETE",
      headers:{
        "content-Type":"application/json",
        "Authorization": `Bearer ${contextToken.token}`
      },body:JSON.stringify({mangaId:params.mangaId})
    });
    if (resUrlDeletePodcast.ok) {
      setIsFavorite(false);
      console.log("Podcast delete with success");
    } else {
      console.log("Podcast not delete");
    }
  }

  function handleChangeRating(event){
    setRating(event.target.value);

}
function handleChangeReview(event){
  setReview(event.target.value);

}

  useEffect(() => {
    async function getChapitresBoutons() {
      // obtenir les pages d'un manga
      const urlChapitres = `http://localhost:4000/mangas/${params.mangaId}/chapters`;
      const resultatChapitres = await fetch(urlChapitres, {
        method: "GET",
        headers: {
          "content-Type": "application/json; charset=UTF-8",
        },
      });

      if (resultatChapitres.ok) {
        const data = await resultatChapitres.json();
        console.log(data);
        setChapitresObjets(data);
      } else {
        console.log("une erreur s'est productive lors de l'appel à /Manga");
      }
    }

  async function favorite() {
    const urlFavorite = `${serveur}/favorite/${params.mangaId}`;
    const resultatFavorite = await fetch(urlFavorite, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "Authorization": `Bearer ${contextToken.token}`
      },
    });
    if (resultatFavorite.ok) {
      const data = await resultatFavorite.json();
      setIsFavorite(data.isFavoris);
      console.log(isFavorite)
    } else {
      console.log("une erreur s'est produite lors de l'appel à /api/favorite");
    }
  }
  async function getData() {
    getChapitresBoutons().then(() => console.log("done getChapitresBoutons"));
    favorite().then(() => console.log("done favorite"));
  }
 
  getData().then(() => console.log("done getData"));
}, [params,isFavorite,params.mangaId,contextToken.token]);


async function leaveReview() {
  const db = getDatabase();
  const userRef = child(ref(db), `data/Users/${contextId.Id}/username`);
  const userSnapshot = await get(userRef);
  if (userSnapshot.exists()) {
    
    setUsername(userSnapshot.val(), () => {
      console.log(username); // Make sure that the state variable has been updated
    });
    const username = userSnapshot.val();
    console.log(username);
    const date = new Date(Date.now());
    const newdate = date.toLocaleString('en-US', {month: 'short', day:"numeric", year:"numeric"});
    const reviewData = {
      comment: review,
      date: newdate,
      note: rating,
      name: username,
      userId: contextId.Id
    };
  
    // Write the review data to the database
    const reviewReference = child(ref(db), `data/mangas/${params.mangaId}/comments/${contextId.Id}`);
    await update(reviewReference, reviewData);
    console.log("Review successfully posted!");
  }
 

  // Update the overall rating
  const mangaReference = child(ref(db), `data/mangas/${params.mangaId}`);
  const mangaSnapshot = await get(mangaReference);
  if (mangaSnapshot.exists()) {
    const mangaData = mangaSnapshot.val();
    let newOverall = mangaData.overall;
    let commentCount = Object.keys(mangaData.comments)
    console.log(commentCount)
    const overallData = {
      overall: (parseInt(newOverall) + parseInt(rating)) / (commentCount.length + 1)
    };
    const overallReference = child(ref(db), `data/mangas/${params.mangaId}`);
    await update(overallReference, overallData);
    console.log("Overall rating successfully updated!");
    setmangaData(mangaData); // Update the manga data state
  }

  // Refresh the page
  window.location.reload();
}



  return (
    <>
      <div className="blurred-background" style={backgroundStyle}></div>
      <div className="container-description">
        <div className="detail-info">
          <div className="detail-info-cover">
            <img
              className="detail-info-cover-img"
              alt="solo leveling"
              src={props.props.cover}
            />
          </div>
          <div className="detail-info-right">
            <p className="detail-info-right-title">
              <span className="detail-info-right-title-font">
                {props.props.name}
              </span>
            </p>
            <p className="detail-info-description">{props.props.description}</p>
            <div className="columns">
              <p className="detail-info-rating">
                <span>Rating: </span>
                <span className="has-text-weight-bold">
                {props.props.overall.toString()}⭐
                </span>
              </p>
              {
                  contextToken.token  &&
                  <div className="has-text-centered">
                    {
                      isFavorite ?
                          <button onClick={deleteManga} className="btn"><i className="fa fa-heart"></i></button>:
                          <button onClick={addManga} className="btn1"><i className="fa fa-heart"></i></button>
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="chapter-details">
          <div className="chapter-title">Chapitres</div>
          <div className="liste-chapitres">
            <div className="row columns is-multiline">
              {chapitresObjets.map((chapitres) => (
                <div className="column is-4">
                  <Link to={`/mangas/${params.mangaId}/chapters/${chapitres.chapterId}`}>
                <button className="button is-normal has-background-info-light ml-2">{chapitres.title}</button>
                </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      { props.props.comments === undefined &&
      <div className="container">
        <div className="chapter-details">
          <div className="chapter-title">Reviews</div>
          <div className="liste-chapitres">
            <div className="row columns is-multiline">
            { contextToken.token &&
            <> 
                                 <div className="column is-12">
                                <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content ">
      <div className="control has-icons-left">
                   
                   <textarea
                   onChange={handleChangeReview}
                      className="textarea is-rounded"
                      placeholder="There are no reviews yet, be the first to leave a review!" />
                  
              </div>
        <p className="subtitle is-6 has-text-centered">
                <span className="has-text-centered">Rating: </span>
                <input type="number"
                onChange={handleChangeRating}
                            className="number is-rounded"
                            min="0" max="10"/>
                <span className="has-text-weight-bold-centered">⭐
                </span>
                <button className="button is-dark is-rounded" onClick={leaveReview}>Post</button>
              </p>
      </div>
    </div>
  </div>
</div>
                                </div>
                                &nbsp;</>
                                }
            </div>
          </div>
        </div>
      </div>
      }
      
      { props.props.comments !== undefined &&
      <div className="container">
        <div className="chapter-details">
          <div className="chapter-title">Reviews</div>
          <div className="liste-chapitres">
            <div className="row columns is-multiline">
            { contextToken.token &&
            <> 
                                 <div className="column is-12">
                                <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content ">
      <div className="control has-icons-left">
                   
                   <textarea
                       onChange={handleChangeReview}
                      className="textarea is-rounded"
                      placeholder="Leave a review!" />
                  
              </div>
        <p className="subtitle is-6 has-text-centered">
                <span className="has-text-centered">Rating: </span>
                <input type="number"
                onChange={handleChangeRating}
                            className="number is-rounded"
                            min="0" max="10" />
                <span className="has-text-weight-bold-centered">⭐
                </span>
                <button className="button is-dark is-rounded" onClick={leaveReview}>Post</button>
              </p>
      </div>
    </div>
  </div>
</div>
                                </div>
                                &nbsp;</>
                                }
            {Object.keys(props.props.comments).map((key) => (
                                 <>  
                                 <div className="column is-12">
                                <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content ">
        <p class="title is-4 has-text-left" key={key}>{props.props.comments[key].name}</p>
        <p class="subtitle is-6 has-text-left">@{props.props.comments[key].name}</p>
        <p class="subtitle is-6 has-text-left">{props.props.comments[key].date}</p>
        {props.props.comments[key].comment}
        <p className="subtitle is-6 has-text-centered">
                <span className="has-text-centered">Rating: </span>
                <span className="has-text-weight-bold-centered">
                {props.props.comments[key].note.toString()}⭐
                </span>
              </p>
      </div>
    </div>
  </div>
</div>
                                </div>
                                &nbsp;</>))}
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}
/* {props.props.chapters.map((c) => (
                    <div className="column is-4" key={c}>
                      <Link to={`/chapitres/${props.props.mangaId}/pages/${c.chapterId}`}>
                      <button className="button is-normal has-background-info-light ml-2">
                      {c.chapterId}
                    </button>
                    </Link>
                    </div>
                  ))}*/
