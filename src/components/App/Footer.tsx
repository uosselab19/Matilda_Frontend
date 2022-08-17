// import Swal from "sweetalert2";
// import useCookie from "../../hooks/useCookie";
// import { selectMember } from "../../services/memberService";

export const Footer = () => {
  //Footer는 현재는 디버그용 버튼으로 활용 중
  const scrollTop = async () => {

    console.log(process.env.REACT_APP_IMAGESTORAGE);
    // const cookie = useCookie().getCookie();
    // console.log(cookie);
    // if (!cookie) return;

    // const { data, error } = await selectMember(cookie.num);

    // if (error) {
    //   console.log(error);
    //   Swal.fire({
    //     icon: 'error',
    //     title: '멤버정보 불러오기 에러',
    //     text: error.data.error,
    //   });
    // }

    // console.log(data?.presetList);
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
