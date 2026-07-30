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
        }
        fetchQuestions();
    }, [])

    const handleAnswer = (answer) => {
        const question = questions[current];
        const updated = {...selected, [question.id]:answer};
        setSelected(updated);
        if (current < questions.length - 1) {
            setCurrent(current + 1);    
        } 
        else {
            submitAnswers(updated);
        }
    }

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
    }

    const question = questions[current];

    return (
        <div className="flex w-[600px] max-w-[90%] flex-col items-center gap-6 m-5">
            <div className="text-[20px] font-bold text-[#75b5f5]">
                {current + 1} / {questions.length}
            </div>

            <div className="flex w-full flex-col items-center gap-[30px] rounded-[16px] bg-white px-[30px] py-[40px] shadow-[2px_2px_10px_rgba(0,0,0,0.1)]">
                <div className="text-center text-[24px] font-semibold text-[#535353]">
                    {question?.question}
                </div>

                <div className="flex w-full flex-col gap-3">
                    {question?.answers.map((answer) => (
                        <button
                            key={answer}
                            onClick={() => handleAnswer(answer)}
                            className="w-[90%] rounded-[12px] border-2 border-[#ddd] bg-white p-4 text-[17px] text-[#535353] transition-all duration-200 hover:border-[#75b5f5] hover:bg-[#f0f8ff]"
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Quiz