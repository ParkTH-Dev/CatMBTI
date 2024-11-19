import { motion } from "framer-motion";
import { Button, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { QuestionData } from "../assets/questiondata";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const Wrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: #fff;
  padding: 20px;
`;

const ProgressWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 100;

  .progress {
    height: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    .progress-bar {
      background-color: #fff;
    }
  }
`;

const Contents = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 15px;

  @media screen and (max-width: 780px) {
    font-size: 1.5rem;
    padding: 0.8rem 1.5rem;
    margin: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 400px;
  min-height: 120px;
  padding: 1.5rem;
  font-size: 1.2rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e3c72;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: 1.5;

  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 780px) {
    min-height: 100px;
    font-size: 1rem;
    padding: 1rem;
  }
`;

const Question = () => {
  const [questionNum, setQuestionNum] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);
  const navigate = useNavigate();

  const handleClickBtn = (num, type) => {
    const newScore = totalScore.map((item) =>
      item.id === type ? { id: item.id, score: item.score + num } : item
    );
    setTotalScore(newScore);
    if (QuestionData.length !== questionNum + 1) {
      setQuestionNum(questionNum + 1);
    } else {
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        ""
      );
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ProgressWrapper>
        <ProgressBar now={(questionNum / QuestionData.length) * 100} animated />
      </ProgressWrapper>
      <Contents>
        <Title>{QuestionData[questionNum].title}</Title>
        <ButtonGroup>
          <StyledButton
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleClickBtn(1, QuestionData[questionNum].type)}
          >
            {QuestionData[questionNum].answera}
          </StyledButton>
          <StyledButton
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleClickBtn(0, QuestionData[questionNum].type)}
          >
            {QuestionData[questionNum].answerb}
          </StyledButton>
        </ButtonGroup>
      </Contents>
    </Wrapper>
  );
};

export default Question;
