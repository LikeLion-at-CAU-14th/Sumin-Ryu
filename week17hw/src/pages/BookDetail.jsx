import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetail = () => {
    const params = useParams();
    const id = params.id;

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get("/databases/books.json");
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    const book = books.find((b) => b.id === parseInt(id));

    const [likes, setLikes] = useState(0);

    const updateLikes = () => {
        setLikes(likes + 1);
    };

    useEffect(() => {
        setLikes(0);
    }, [id]);

    if (!book) {
        return <div>찾는 책 없음</div>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
                {book.title}
            </h1>

            <h3 className="text-xl text-gray-600">
                {book.author}
            </h3>

            <p className="leading-relaxed text-gray-700">
                {book.description}
            </p>

            <button
                onClick={updateLikes}
                className="flex items-center justify-center rounded-full bg-[#75b5f5] px-4 py-1 text-base text-white transition-colors duration-300 hover:bg-[#9ecfff] active:bg-[#3d9dfd]"
            >
                <span className="mr-2 text-xl">
                    👍
                </span>
                {likes}
            </button>
        </div>
    );
};

export default BookDetail;