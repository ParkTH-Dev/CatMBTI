import { useEffect } from "react";
import { Button } from "react-bootstrap";

const { Kakao } = window;

const KakaoShareBtn = () => {
  const url = "https://th-catmbti.netlify.app";
  const ressultURL = window.location.href;

  useEffect(() => {
    Kakao.init("2cb8a7cbf18f2c8bddd08c6a66f77d75");
    Kakao.isInitialized();
    // console.log(Kakao.isInitialized());
  }, []);
  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "예비집사 판별기 결과",
        description:
          "예비집사님이 고양이를 키운다면 가장 잘 맞는 고양이는 엑죠틱입니다!",
        imageUrl:
          "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
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

  return <Button onClick={shareKakao}>카카오톡 공유하기</Button>;
};

export default KakaoShareBtn;
