import { cookies } from "./App";

export const Footer = () => {
  //Footer는 현재는 디버그용 버튼으로 활용 중
  const userInfo = cookies.get('userInfo');
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
    console.log(userInfo);
  };

  return (
    <footer className="text-muted text-center py-5">
      <div className="container">
        <p className="float mb-3">
          <button className="btn btn-link link-dark" onClick={scrollTop}>
            Back to top
          </button>
        </p>
        <p className="mb-1">Develop by Mindul-Mendul</p>
        <p className="mb-0">Copyright ©2022 by selab. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
