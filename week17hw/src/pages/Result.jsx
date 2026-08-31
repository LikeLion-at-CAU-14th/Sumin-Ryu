import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://week12-api-rcwo.onrender.com";

const Result = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const score = searchParams.get("score");

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchResult = async () => {
            const response = await axios.get(`${BASE_URL}/api/result?score=${score}`);
            setMessage(response.data.message);
        };

        fetchResult();
    }, [score]);

    return (
        <div className="m-5 flex flex-col items-center">
            <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl bg-white px-10 py-12 shadow-md">
                <div className="text-5xl font-bold text-[#75b5f5]">
                    {score} / 5
                </div>

                <div className="text-center text-2xl text-gray-600">
                    {message}
                </div>

                <button
                    onClick={() => navigate("/quiz")}
                    className="mt-2 rounded-full bg-[#75b5f5] px-10 py-3 text-lg font-bold text-white transition-colors hover:bg-[#9ecfff]"
                >
                    다시 풀기
                </button>
            </div>
        </div>
    );
};

export default Result;