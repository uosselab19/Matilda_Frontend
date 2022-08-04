import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import matildaWhite from '../../assets/images/matilda_white.png';
import useCookie from '../../hooks/useCookie';
import { signoutMember } from '../../services/securityService';
import { NavButtons } from '../NavButtons';

export const Header = () => {
  const navigate = useNavigate(); //페이지 이동하는 훅
  const { getCookie, removeCookie } = useCookie();
  const location = useLocation(); // url 찍어주는 훅
  const pathname = location.pathname;
  const [selectedNavButton, setSelectedNavButton] = useState(pathname);

  const linkTo = (link: string) => {
    window.scrollTo({ top: 0 });
    navigate(link, { replace: false });
  };

  //로그아웃 버튼 기능
  const fetchSignout = () => {
    const cookie=getCookie();
    if(cookie)
      signoutMember(cookie);
    alert('sign out 하였습니다.'); // 로그아웃했다고 알림
    removeCookie(); // 로그인 기록 쿠키 지우기
    linkTo('/'); // 로그아웃하면 홈페이지로
  };

  useEffect(() => {
    setSelectedNavButton(pathname);
  }, [pathname]);

  const sign = // 오른쪽 버튼 보여주기
    (
      <div className='btn-group'>
        <button
          className="btn btn-outline-light me-1"
          onClick={() => {
            getCookie() ? fetchSignout() : linkTo('/signin');
          }}
        >{getCookie() ? 'sign-out' : 'Sign-in'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            getCookie() ? linkTo('/mypage') : linkTo('/signup');
          }}
        >{getCookie() ? 'My Page' : 'Sign-up'}
        </button>
      </div>
    );

  //왼쪽 부분 아이템 배열 생성 부분
  const navItems = [
    { key: '/', title: 'Home' },
    { key: '/marketplace', title: 'Marketplace' },
    { key: '/dressup', title: 'Dress Up' },
    { key: '/3Dconversion', title: '3D Conversion' },
    { key: '/NFTminting', title: 'NFT Minting' }
  ];

  return (
    <header className="p-2 bg-dark text-white sticky-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
          <Link to="/" className="mb-2 px-3">
            <img src={matildaWhite} width="48" alt="" />
          </Link>

          {/* lg 이상 클 때 */}
          <div className="nav col-lg-auto me-lg-auto d-none d-lg-block align-items-center">
            <NavButtons
              navItems={navItems}
              selectedNavButton={selectedNavButton}
              onClick={linkTo}
              textBold={true}
              textColor={"white"} />
          </div>

          {/* 검색바 */}

          <div className="col-lg-auto d-none d-lg-block">{sign}</div>

          {/* lg 미만 작을 때 */}
          <div className="align-items-end d-block d-lg-none">
            <div className="collapse" id="navbarToggleExternalContent">
              <div className="bg-dark p-4">
                <NavButtons
                  navItems={navItems}
                  selectedNavButton={selectedNavButton}
                  onClick={linkTo}
                  textBold={true}
                  textColor={"white"} />
                <div className="d-flex justify-content-end">{sign}</div>
              </div>
            </div>
            <div className="navbar navbar-dark bg-dark d-flex justify-content-end">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
