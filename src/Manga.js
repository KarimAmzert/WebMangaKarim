import React from "react";
import {Link} from "react-router-dom";
import "./Manga.css";


export function Manga(props) {
    return (
        <>
        <div className="column is-2">
            <div className="card large">
                <Link to={`/mangas/${props.manga.mangaId}`}>
                <div className="card-image">
                    <figure className="image is 2by3">
                        <img alt={props.manga.name} src={props.manga.cover}/>
                    </figure>
                </div>
                </Link>
                <div className="card-content">
                    <div className="content">
                        <p className="title is-6 has-text-left" style={{color:"black"}}>
                            {props.manga.name}
                        </p>
                        <div className="mb-0 has-text-left">
                            <span className="has-text-weight-bold">Rating: </span>
                            <span className="has-text-weight-bold">{props.manga.overall != null ? props.manga.overall.toString() : ''}⭐</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </>
    )
};


