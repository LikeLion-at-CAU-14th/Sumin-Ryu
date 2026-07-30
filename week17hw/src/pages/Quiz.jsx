import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://week12-api-rcwo.onrender.com";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(`${BASE_URL}/api/questions`);
            setQuestions(response.data);
        };
        fetchQuestions();
    }, []);

    const handleAnswer = (answer) => {
        const question = questions[current];
        const updated = { ...selected, [question.id]: answer };
        setSelected(updated);

        if (current < questions.length - 1) {
            setCurrent(current + 1);
        } else {
            submitAnswers(updated);
        }
    };

    const submitAnswers = async (finalAnswers) => {
        const answers = questions.map((q) => ({
            id: q.id,
            answer: finalAnswers[q.id],
        }));

        try {
            const response = await axios.post(`${BASE_URL}/api/answers`, { answers });
            const score = response.data.results.filter((r) => r.correct).length;
            navigate(`/result?score=${score}`);
        } catch (error) {
            alert(error.response?.data?.error || "문제 제출 중 오류가 발생했습니다.");
        }
    };

    const question = questions[current];

    return (
        <div className="m-5 flex w-full max-w-xl flex-col items-center gap-6">
            <div className="text-xl font-bold text-[#75b5f5]">
                {current + 1} / {questions.length}
            </div>

            <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-white px-8 py-10 shadow-md">
                <div className="text-center text-2xl font-semibold text-gray-600">
                    {question?.question}
                </div>

                <div className="flex w-full flex-col gap-3">
                    {question?.answers.map((answer) => (
                        <button
                            key={answer}
                            onClick={() => handleAnswer(answer)}
                            className="rounded-xl border-2 border-gray-300 bg-white p-4 text-base text-gray-600 transition-all duration-200 hover:border-[#75b5f5] hover:bg-blue-50"
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quiz;