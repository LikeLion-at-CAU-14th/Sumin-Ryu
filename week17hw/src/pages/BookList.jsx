import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get("/databases/books.json");
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="m-5 flex h-[80vh] w-full items-center gap-5">
            <div className="flex h-4/5 flex-col rounded-r-lg bg-white p-12 shadow-md">
                <div
                    onClick={goHome}
                    className="cursor-pointer text-4xl font-bold text-gray-600"
                >
                    집
                </div>

                <div className="text-4xl font-bold text-gray-600">
                    Book List
                </div>

                <ul className="mt-4 space-y-2">
                    {books.map((book) => (
                        <Link
                            key={book.id}
                            to={`/books/${book.id}`}
                            className="block text-gray-700 hover:text-blue-500"
                        >
                            <li>{book.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="mt-24 flex h-full flex-col items-center justify-start p-12">
                <Outlet />
            </div>
        </div>
    );
};

export default BookList;