import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResultData } from "../assets/ResultData";
import KakaoShareBtn from "../components/KakaoShareBtn";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3); // 검은색 오버레이로 어둡게 처리
    z-index: 0;
  }
`;

const Header = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
`;

const Contents = styled(motion.div)`
  position: relative;
  z-index: 1;
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
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem 0;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 15px;
`;

const LogoImg = styled(motion.div)`
  z-index: -1;
  width: 280px;
  height: 280px;
  margin: 1rem 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Desc = styled.div`
  margin: 1.5rem 0;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  text-align: center;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 1rem;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.8rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  background: #fff;
  color: #1e3c72;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`;

const Result = () => {
  const [resultData, setResultData] = useState({});
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  const navigate = useNavigate();
  const constraintsRef = useRef(null);

  const handleClickBtn = () => {
    navigate("/");
  };

  useEffect(() => {
    const result = ResultData.find((obj) => obj.best === mbti);
    setResultData(result);
  }, [mbti]);

  return (
    <Wrapper>
      <Header>✈️ MBTI 여행스타일 테스트</Header>
      <Contents
        ref={constraintsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{resultData.best}</Title>
        <LogoImg
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            drag
            dragConstraints={constraintsRef}
            src={resultData.image}
          />
        </LogoImg>
        <Desc>{resultData.name}</Desc>
        <Desc>{resultData.desc}</Desc>
        <ButtonGroup>
          <StyledButton onClick={handleClickBtn}>테스트 다시하기</StyledButton>
          <KakaoShareBtn data={resultData} />
        </ButtonGroup>
      </Contents>
    </Wrapper>
  );
};

export default Result;
