import React, {useContext, useEffect, useState} from "react";
import {TokenContexte} from "./ContextToken";
import {serveur} from "./Constantes";
import {Manga} from "./Manga";


export default  function Favorites(){
    const [favorites, setFavorites] = useState([]);
    const contextToken = useContext(TokenContexte);
console.log(contextToken)

    useEffect(() => {
        async function getFavoris() {
            const bearerToken =`Bearer ${contextToken.token}`;
            const urlFavoris = `${serveur}/favorites`;
            const resultatFavoris = await fetch(urlFavoris, {
                method: "GET",
                headers: {
                    "content-Type":"application/json",
                    "Authorization": bearerToken
                },
            });
            if (resultatFavoris.ok) {
                const data = await resultatFavoris.json();
                setFavorites(data);
            } else {
                console.log("une erreur s'est produite lors de l'appel à api WebManga");
            }
        }

        getFavoris().then(() => console.log("done getFavoris"));
    },[contextToken.token]);

    return(
        <div>
            <div className="section">
                <h1 className="title is-1 has-text-centered">Favorites</h1>
            </div>
            <div className="section">
                <div className="row columns is-multiline">
                    {
                        favorites.map((manga) => {
                            return <Manga manga={manga}
                                key={manga.mangaId}/>;
                        })
                    }
                </div>
            </div>
        </div>
    );

}