import "./Home.css";
import {React, useEffect, useState} from "react";
import {Manga} from "./Manga";
import Pagination from "./pagination";
import { ComposantCarousel } from "./ComposantCarousel";
export function Home(){

    const [mangas, setMangas] = useState([]);
    const [mangasFiltered, setMangasFiltered] = useState([]);
    const [filtreMangas, setFiltreMangas] = useState("");
    const [nbMangasPerPage, setNbMangasPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);  

    useEffect(() => {
        async function getMangas() {
            // obtenir les mangas
            const urlManga = `http://localhost:4000/Mangas`;
        const resultatManga = await fetch(urlManga,{
            method:"GET",
            headers:{
                "content-Type":"application/json; charset=UTF-8"
            }
        });

        if (resultatManga.ok) {
            const data = await resultatManga.json();
            console.log(data)
            setMangas(data)
        } else {
            console.log("une erreur s'est productive lors de l'appel à /Manga");
        }
    }

        getMangas().then(() => console.log("done getMangas"));
    }, []);


      useEffect(() => {
        let m = mangas;
        if (filtreMangas !== "") {
            setCurrentPage(1);
            m = m.filter((m) => m.name.toLowerCase().includes(filtreMangas.toLowerCase()));
        }
        setMangasFiltered(m);

    }, [mangas, filtreMangas]);

    const lastMangaIndex = (currentPage - 1)  * nbMangasPerPage;
    const firstMangaIndex = lastMangaIndex + nbMangasPerPage;
    const currentMangas =  mangasFiltered.slice(lastMangaIndex,firstMangaIndex);



    return (
        <>
        <ComposantCarousel />
        <div className="section">
            <div className="row columns is-multiline">
                {
                    currentMangas.map((m) => {
                        return (
                            <Manga manga={m} key={m.mangaId}/>
                        );
                    })
                }
            </div>
            <Pagination
                totalMangas = {mangasFiltered.length}
                MangasPerPage = {nbMangasPerPage}
                setCurrentPage={setCurrentPage}
                currentPage = {currentPage}
            />
        </div>
        </>
    );
}
