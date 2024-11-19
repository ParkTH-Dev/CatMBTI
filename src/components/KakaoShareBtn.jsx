import { useEffect } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import kakaoLogo from "/img/KakaoTalk_logo.png";

const { Kakao } = window;

const StyledButton = styled(Button)`
  padding: 0.8rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  background: #fee500;
  color: #000000;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #fee500;
    color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  img {
    width: 24px;
    height: 24px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const KakaoShareBtn = ({ data }) => {
  const url = "https://th-catmbti.netlify.app";
  const resultURL = window.location.href;

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init("2cb8a7cbf18f2c8bddd08c6a66f77d75");
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "✈️ MBTI 여행스타일 테스트 결과",
        description: `당신의 MBTI 여행스타일은 ${data?.best} ${data?.name}입니다!\n${data?.desc}`,
        imageUrl: `${url}${data?.image}`,
        link: {
          mobileWebUrl: resultURL,
          webUrl: resultURL,
        },
      },
      buttons: [
        {
          title: "나도 테스트 하러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <StyledButton onClick={shareKakao}>
      <img src={kakaoLogo} alt="카카오톡 로고" />
      카카오톡 공유하기
    </StyledButton>
  );
};

export default KakaoShareBtn;
