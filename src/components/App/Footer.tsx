import useCookie from "../../hooks/useCookie";
import { apiClient } from "../../services/apiClient";
import { selectMember } from "../../services/memberService";

export const Footer = () => {
  //Footer는 현재는 디버그용 버튼으로 활용 중
  const scrollTop = async () => {
    const { getCookie } = useCookie();
    const cookie = getCookie();
    console.log(cookie);
    if (!cookie) return;

    console.log(apiClient.defaults.headers);

    const { data, error } = await selectMember(cookie.num);
    if (error) { alert(error); return console.log(error); }
    console.log(data);
  };

  return (
    <footer className="text-muted text-center py-5">
      <div className="container">
        <p className="float mb-3">
          <button
            type="button"
            className="btn btn-link link-dark"
            onClick={scrollTop}>
            Back to top
          </button>
        </p>
        <p className="mb-0">
          Copyright ©2022 by selab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
