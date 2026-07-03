import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
        <Container>
            <Progress>{current + 1} / {questions.length}</Progress>
            <QuestionCard>
                <QuestionText>{question?.question}</QuestionText>
                <AnswerList>
                    {question?.answers.map((answer) => (
                        <AnswerButton key={answer} onClick={() => handleAnswer(answer)}>
                            {answer}
                        </AnswerButton>
                    ))}
                </AnswerList>
            </QuestionCard>
        </Container>
    )
}

export default Quiz

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 600px;
  max-width: 90%;
  margin: 20px;
`;

const Progress = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #75b5f5;
`;

const QuestionCard = styled.div`
  width: 100%;
  background-color: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const QuestionText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #535353;
  text-align: center;
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const AnswerButton = styled.button`
  width: 90%;
  padding: 16px;
  font-size: 17px;
  border: 2px solid #ddd;
  background-color: white;
  color: #535353;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: #75b5f5;
    background-color: #f0f8ff;
  }
`;