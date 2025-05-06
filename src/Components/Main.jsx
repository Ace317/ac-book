import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;

    const searchBook = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            axios
                .get(
                    `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`
                )
                .then((res) => {
                    setData(res.data.items || []);
                    setCurrentPage(1); // Reset to first page
                })
                .catch((err) => console.log(err));
        }
    };

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = bookData.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(bookData.length / booksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>
                     I guess there are never <br /> enough books.
                    </h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Enter Your Book Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={searchBook}
                        />
                        <button onClick={searchBook}>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <Card book={currentBooks} />
            </div>

            {bookData.length > booksPerPage && (
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default Main;
