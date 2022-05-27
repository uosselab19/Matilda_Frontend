import { useState, useEffect } from "react";
import { MypageNFTs } from "./MypageNFTs";
import { MypageOption } from "./MypageOption";
import { cookies } from "../../App";
import { useNavigate /*, useSearchParams */ } from "react-router-dom";
import { NotFound } from "../../NotFound";
// import Cookies from "universal-cookie";

import profileImage from "./../../profileImage.png";

interface Cookie {
  name: string
}

export const Mypage = () => {
  const navigate=useNavigate();
  const userInfo=cookies.get("userInfo") as Cookie;

  //위에 메뉴 선택하는 부분 state로 구현함. 네비게이션 바로 구현 다시 하자
  const [seletedTap, setSeletedTap]=useState(0);
  const MypageContent=(seletedNum: number)=>{
    switch(seletedNum){
      case 0: return <MypageNFTs/>;
      case 1: return <MypageOption/>;
      default: return <NotFound/>;
    }
  };

  //첫 마운트 시 유저정보 없으면 홈페이지로 날아가게 함.
  //URL로 마이페이지 접근을 막는 코드
  useEffect(()=>{
    if(!userInfo){
      alert('유저정보가 없어서 홈페이지로 이동합니다.');
      navigate('/');
    }
  },[]);
  
  //userInfo가 null인 경우면 JSX 안에 있는 userInfo.name 때문에 에러뜨게 되는 시스템이라 부득이하게 이렇게 사용
  //어떻게든 바꿔야 함 
  const myPage = (userInfo: Cookie) => { return (
    <main className="container text-center d-flex flex-column justify-content-center">
      <div className="row my-3">
        <div className="col-lg-4">
          <img src={profileImage} className="flex-column py-3 mt-5 mb-4" alt="" width="328" style={{borderRadius:"100%"}}/>
          <h2>{userInfo.name}</h2>
          한 줄 설명같은 거 적어두는 게 좋을까? 여기에다가는 뭘 적어서 넣을지 고민을 또 해봐야겠네.
        </div>

        {/* 네비게이션 바 */}
        <div className="col-lg-8">
          <div className="row my-3">
            <div className="col-lg-6">
            <button
                className={`btn btn-outline-light px-2 ${(seletedTap==2)?"text-dark fw-bold":"text-secondary"} text-decoration-none fs-5`}
                onClick={() => {setSeletedTap(0);}}>
                어떤 NFT를 가지고 있나요?
              </button>
            </div>
            <div className="col-lg-6">
            <button
                className={`btn btn-outline-light px-2 ${(seletedTap==2)?"text-dark fw-bold":"text-secondary"} text-decoration-none fs-5`}
                onClick={() => {setSeletedTap(1);}}>
                회원정보를 바꿀 수 있어요!
              </button>
            </div>
          </div>

          {/* 이 부분이 My Page 핵심 부분 */}
          {MypageContent(seletedTap)}
        </div>
      </div>
    </main>
  )};

  if(userInfo) return myPage(userInfo);
  else return null;
}