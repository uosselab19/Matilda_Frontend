import { useEffect, useState } from 'react';
import { MypageNFTs } from '../../components/Mypage/MypageNFTs';
import { MypageWallet } from '../../components/Mypage/MypageWallet';
import { MypageOption } from '../../components/Mypage/MypageOption';
import { useNavigate } from 'react-router-dom';
import { NavButtons } from '../../components/NavButtons';
import useCookie from '../../hooks/useCookie';
import { SelectMember } from '../../types/Member';
import { selectMember } from '../../services/memberService';

export const Mypage = () => {
  const navigate = useNavigate();
  const { getCookie } = useCookie();
  const [selectedNavButton, setSelectedNavButton] = useState("myNFTList");
  const [userInfo, setUserInfo] = useState(undefined as SelectMember | undefined);

  const navItems = [
    { key: "myNFTList", title: "My NFT List" },
    { key: "klaytnSetting", title: "Klaytn setting" },
    { key: "editInfo", title: "Edit Info" }
  ];

  //첫 마운트 시 유저정보 없으면 홈페이지로 날아가게 함.
  //URL로 마이페이지 접근을 막는 코드
  useEffect(() => {
    (async () => {
      const cookieData = getCookie("userInfo");
      if (!cookieData) {
        alert('유저정보가 없어서 홈페이지로 이동합니다.');
        navigate('/');
      } else {
        const { data, error } = await selectMember(cookieData.id);
        if(error) {console.log(error); return alert(error);}
        setUserInfo(data);
      }
    })();
  }, []);

  //userInfo가 null인 경우면 JSX 안에 있는 userInfo.name 때문에 에러뜨게 되는 시스템이라 부득이하게 이렇게 사용
  //어떻게든 바꿔야 함
  return userInfo ? (
    <main className="container d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-4">
          {/* <img src={profileImage}
            className="flex-column py-3 mt-5 mb-4 px-4 w-100"
            alt=""
            style={{ borderRadius: '100%' }} />
          <h2>{userInfo.nickname}</h2>
          {userInfo.desc} */}
        </div>

        {/* 네비게이션 바 */}
        <div className="col-lg-8">
          <div className="my-3">
            <NavButtons
              navItems={navItems}
              selectedNavButton={selectedNavButton}
              onClick={setSelectedNavButton}
              textBold={true}
              textSize={5}
              textColor={"black"} />
          </div>

          {/* 이 부분이 My Page 핵심 부분 */}
          <div className={`${selectedNavButton == "myNFTList" ? "d-block" : "d-none"}`}><MypageNFTs /></div>
          <div className={`${selectedNavButton == "klaytnSetting" ? "d-block" : "d-none"}`}><MypageWallet /></div>
          <div className={`${selectedNavButton == "editInfo" ? "d-block" : "d-none"}`}><MypageOption /></div>
        </div>
      </div>
    </main>
  ) : null;
};
