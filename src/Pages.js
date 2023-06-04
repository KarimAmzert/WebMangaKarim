import React, { useEffect, useState } from "react";
import "./pages.css";
import {useParams, Link} from "react-router-dom";


export default function Pages(props) {
  const [infoPages, setInfoPages] = useState([]);
  const [infoTitle, setInfoTitle] = useState("");
  const [chapters, setChapters] = useState([]);
  const params = useParams();


  useEffect(() => {
    async function getPages() {
      // obtenir les pages d'un manga
      const urlPages = `http://localhost:4000/mangas/${params.mangaId}/chapters/${params.chapterId}`;
      const resultatPages = await fetch(urlPages, {
        method: "GET",
        headers: {
          "content-Type": "application/json; charset=UTF-8",
        },
      });

      if (resultatPages.ok) {
        const data = await resultatPages.json();
        setInfoPages(data.pages);
        setInfoTitle(data.title);
        console.log(infoPages);
      } else {
        console.log("une erreur s'est productive lors de l'appel à /Manga");
      }
    }

    async function getChapters() {
      // obtenir les pages d'un manga
      const urlChapter = `http://localhost:4000/mangas/${params.mangaId}/chapters/`;
      const resultatChapters = await fetch(urlChapter, {
        method: "GET",
        headers: {
          "content-Type": "application/json; charset=UTF-8",
        },
      });

      if (resultatChapters.ok) {
        const data = await resultatChapters.json();
        setChapters(data);
      } else {
        console.log("une erreur s'est productive lors de l'appel à /Manga");
      }
    }
    async function getData() {
      getPages().then(() => console.log("done getChapitresBoutons"));
      getChapters().then(() => console.log("done favorite"));
    }

    getData().then(() => console.log("done getData"));
  },  [params.mangaId,params.chapterId,infoPages]);

  const nextChapterId = String(Number(params.chapterId) + 1);
  const previousChapterId = String(Number(params.chapterId) - 1);


  return (
    <>
      <div className="section-page has-text-centered">
        <h1 className="title is-12 has-text-light">{infoTitle}</h1>
        {infoPages.map((p) => {
          return <img className="image-page is-100x100" alt={p} key={p} src={p} />;
        })}
        <div className="buttons">

        <Link to={`/mangas/${params.mangaId}/chapters/${previousChapterId}`}>
          <button
              disabled={parseInt(params.chapterId,10) === 0 }
              className="button is-normal has-background-info-light ml-2 mr-2"
               >
            Previous Chapter
          </button>
          </Link>
          &nbsp;
          <Link to={`/mangas/${params.mangaId}/chapters/${nextChapterId}`}>
          <button
              disabled={parseInt(params.chapterId,10) === (chapters.length-1) }
              className="button is-normal has-background-info-light ml-2"
          >
            Next Chapter
          </button>
          </Link>

          </div>
        </div>
    </>
  );
}
