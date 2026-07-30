import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="m-5 flex w-full flex-col items-center justify-center gap-5">
                <div className="text-4xl font-bold text-gray-600">
                    12주차
                </div>

                <Link
                    to="/books"
                    className="flex h-24 w-72 items-center justify-center rounded-2xl bg-[#b8edfb] text-2xl font-medium text-gray-700 shadow-md transition hover:shadow-lg"
                >
                    Books
                </Link>

                <Link
                    to="/quiz"
                    className="flex h-24 w-72 items-center justify-center rounded-2xl bg-[#b8edfb] text-2xl font-medium text-gray-700 shadow-md transition hover:shadow-lg"
                >
                    Quiz
                </Link>
            </div>
        </div>
    );
};

export default Home;