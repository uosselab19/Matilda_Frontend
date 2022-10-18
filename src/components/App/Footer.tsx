import { getUserInfo } from "../../utils/cookieUtil";

export const Footer = () => {
  //Footer는 현재는 디버그용 버튼으로 활용 중
  const scrollTop = async () => {
  console.log(getUserInfo());
  //   const { data, error } = await refreshMember({ ignore: true });
  //   if (error) {
  //     console.log(error);
  //     alertError('리프레시 에러', '리프레시 안 됨 ㅋㅋㅋㅋㅋ');
  //     return;
  //   }
  //   setUserInfo(getUserInfoByToken(data));
  };

  return (
    <footer className="text-muted text-center py-5">
      <div className="container">
        <p className="float mb-3">
          <button type="button" className="btn btn-link link-dark" onClick={scrollTop}>
            Back to top
          </button>
        </p>
        <p className="mb-0">Copyright ©2022 by SELAB. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
