import React, { useState } from "react";
import Modal from "./Modal";

const Card = ({ book }) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState(null);

    return (
        <>
            {book.map((item, index) => {
                const thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;
                const amount = item.saleInfo.listPrice?.amount;

                if (thumbnail && amount) {
                    return (
                        <div
                            className="card"
                            key={index}
                            onClick={() => {
                                setItem(item);
                                setShow(true);
                            }}
                        >
                            <img src={thumbnail} alt="book cover" />
                            <div className="bottom">
                                <h3 className="title">{item.volumeInfo.title}</h3>
                                <p className="amount">&#8377;{amount}</p>
                            </div>
                        </div>
                    );
                }
                return null;
            })}

            {show && (
                <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
            )}
        </>
    );
};

export default Card;
