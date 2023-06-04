import React from "react";
import "./pagination.css";
// sfd

const Pagination = ({totalMangas,MangasPerPage,setCurrentPage,currentPage}) =>  {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalMangas / MangasPerPage); i++){
        pages.push(i);
    }

    function previousPage() {
        if (currentPage >= 2) {
            setCurrentPage(currentPage-1);
        }
    }
    function nextPage() {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage+1);
        }
    }
    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <button
                disabled={currentPage === 1 }
                className="pagination-previous"
                onClick={previousPage}
            >
                &lt;-
            </button>
            <button
                disabled={currentPage === pages.length }
                className="pagination-next"
                onClick={nextPage}
            >
                -&gt;
            </button>
            <ul className="pagination-list">
                {
                    pages.map(page =>(
                        <li className="page-item" key={page}>
                            <button  onClick={()=>setCurrentPage(page)}
                                     className = {page === currentPage ? "pagination-link active":"pagination-link"}
                            >
                                { page }
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Pagination;