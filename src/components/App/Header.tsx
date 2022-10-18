import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import matildaWhite from '../../assets/images/matilda_white.png';
import { alertSuccess } from '../../utils/alertUtil';
import { getUserInfo, removeUserInfo } from '../../utils/cookieUtil';
import { signoutMember } from '../../services/securityService';
import { NavButtons } from '../NavButtons';

export const Header = () => {
  const navigate = useNavigate(); //페이지 이동하는 훅
  const location = useLocation(); // url 찍어주는 훅
  const pathname = location.pathname;
  const [selectedNavButton, setSelectedNavButton] = useState(pathname);

  const linkTo = (link: string) => {
    window.scrollTo({ top: 0 });
    navigate(link, { replace: false });
  };

  //로그아웃 버튼 기능
  const fetchSignout = async () => {
    await signoutMember();
    alertSuccess('로그아웃', `로그아웃했습니다!`); // 로그아웃했다고 알림
    removeUserInfo(); // 로그인 기록 쿠키 지우기
    linkTo('/'); // 로그아웃하면 홈페이지로
  };

  useEffect(() => {
    setSelectedNavButton(pathname);
  }, [pathname]);

  const sign = // 오른쪽 버튼 보여주기
    (
      <div className="btn-group" role="group">
        <button
          className="btn btn-outline-light me-1"
          onClick={() => {
            getUserInfo() ? fetchSignout() : linkTo('/signin');
          }}
        >
          {getUserInfo() ? 'sign-out' : 'Sign-in'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            getUserInfo() ? linkTo('/mypage') : linkTo('/signup');
          }}
        >
          {getUserInfo() ? 'My Page' : 'Sign-up'}
        </button>
      </div>
    );

  //왼쪽 부분 아이템 배열 생성 부분
  const navItems = [
    { key: '/', title: 'Home' },
    { key: '/marketplace', title: 'Marketplace' },
    { key: '/dressup', title: 'Dress Up' },
    { key: '/3Dconversion', title: '3D Conversion' }
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
            <NavButtons navItems={navItems} selectedNavButton={selectedNavButton} onClick={linkTo} textBold={true} textColor={'white'} />
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
                  textColor={'white'}
                />
                <div className="d-flex justify-content-end">{sign}</div>
              </div>
            </div>
            <div className="navbar navbar-dark bg-dark d-flex justify-content-end">
              <button
                type="button"
                className="btn navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
