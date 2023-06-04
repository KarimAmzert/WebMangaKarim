import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { ComposantChapitres } from "./ComposantChapitres";

export default function Chapitres() {
  const params = useParams();
  const [infoChapitres, setInfoChapitres] = useState(null);

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
        setInfoChapitres(data);
      } else {
        console.log("une erreur s'est productive lors de l'appel à /Manga");
      }
    }
    

    getChapitres().then(() => console.log("done getChapitres"));
  }, [params.mangaId]);

  if (infoChapitres !== null) {
    return (
      <div>
          <ComposantChapitres props = {infoChapitres} />
      </div>
    );
  }
}
