import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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
        }
        fetchResult();
    }, [score])

    return (
        <Container>
            <ResultCard>
                <Score>{score} / 5</Score>
                <Message>{message}</Message>
                <RetryButton onClick={() => navigate("/quiz")}>
                    다시 풀기
                </RetryButton>
            </ResultCard>
        </Container>
    )
}

export default Result

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background-color: white;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
`;

const Score = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #75b5f5;
`;

const Message = styled.div`
  font-size: 22px;
  color: #535353;
  text-align: center;
`;

const RetryButton = styled.button`
  margin-top: 10px;
  padding: 14px 40px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  border: none;
  background-color: #75b5f5;
  color: #ffffff;

  &:hover {
    background-color: #9ecfff;
  }
`;