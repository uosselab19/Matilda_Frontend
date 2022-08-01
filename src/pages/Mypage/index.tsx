import { useState } from 'react';
import { MypageNFTs } from '../../components/Mypage/MypageNFTs';
import { MypageWallet } from '../../components/Mypage/MypageWallet';
import { MypageOption } from '../../components/Mypage/MypageOption';
//import { useNavigate } from 'react-router-dom';

import profileImage from './../../assets/images/Profile/profileImage.png';
import { NavButtons } from '../../components/NavButtons';
// import axios from 'axios';
// import useCookie from '../../hooks/useCookie';

export const Mypage = () => {
  // const navigate = useNavigate();
  //위에 메뉴 선택하는 부분 state로 구현함. 네비게이션 바로 구현 다시 하자
  // const [userInfo, setUserInfo] = useState({ nickname: '', desc: '' } as userInfo);
  const [selectedTap, setSelectedTap] = useState(0);

  const navItems = ["My NFT List", "Klaytn setting", "Edit info"];

  //첫 마운트 시 유저정보 없으면 홈페이지로 날아가게 함.
  //URL로 마이페이지 접근을 막는 코드
  // useEffect(() => {
  //   const {cookies}=useCookie();
  //   const userCookie = cookies.get('userInfo');
  //   if (!userCookie) {
  //     alert('유저정보가 없어서 홈페이지로 이동합니다.');
  //     navigate('/');
  //   } else {
  //     const loadUserinfo = async () => {
  //       try {
  //         const desc = (await axios.get('/members/2')).data.description;
  //         setUserInfo({ nickname: userCookie.nickname, desc: desc } as userInfo);
  //       } catch (err) {
  //         console.log(err);
  //         alert('회원정보를 불러오지 못했습니다.');
  //       }
  //     };
  //     loadUserinfo();
  //   }
  // }, []);

  //userInfo가 null인 경우면 JSX 안에 있는 userInfo.name 때문에 에러뜨게 되는 시스템이라 부득이하게 이렇게 사용
  //어떻게든 바꿔야 함
  const userInfo=true;
  return userInfo?(
    <main className="container d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-4">
          <img src={profileImage}
            className="flex-column py-3 mt-5 mb-4 px-4 w-100"
            alt=""
            style={{ borderRadius: '100%' }} />
          {/* <h2>{userInfo.nickname}</h2>
          {userInfo.desc} */}
        </div>

        {/* 네비게이션 바 */}
        <div className="col-lg-8">
          <div className="my-3">
            <NavButtons
              navItems={navItems}
              selectedTap={selectedTap}
              setSelectedTap={setSelectedTap}
              textBold={true}
              textSize={5}
              textColor={"black"} />
          </div>

          {/* 이 부분이 My Page 핵심 부분 */}
          <div className={`${selectedTap == 0 ? "d-block" : "d-none"}`}><MypageNFTs /></div>
          <div className={`${selectedTap == 1 ? "d-block" : "d-none"}`}><MypageWallet /></div>
          <div className={`${selectedTap == 2 ? "d-block" : "d-none"}`}><MypageOption /></div>
        </div>
      </div>
    </main>
  ):null;
};
