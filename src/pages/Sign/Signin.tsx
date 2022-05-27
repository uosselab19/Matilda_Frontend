import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from 'react';
//import axios from "axios";
import matilda from "../../assets/images/matilda.png";

import { cookies } from '../../App';
import { Buffer } from "buffer";

export const Signin = () => {
  const navigate = useNavigate(); // 로그인 후에 다른 창으로 넘어가야 할 때 사용하는 훅

  //로그인시 사용하는 state
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const handleInputID = (e: ChangeEvent<HTMLInputElement>) => { setInputID(e.target.value); };
  const handleInputPW = (e: ChangeEvent<HTMLInputElement>) => { setInputPW(e.target.value); };

  //base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
  const parseToken = (token: string) => {
    const result= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    result.token=token;
    return result;
  }

  //로그인 정보 확인하는 함수
  const fetchSignin = async () => {
    //아이디와 비밀번호는 입력이 되어야 다음으로 넘어감
    if (!inputID.length)
      return alert("아이디를 입력해주세요.");
    if (!inputPW.length)
      return alert("비밀번호를 입력해주세요.");

    //const data=(await axios.post('http://localhost:8888/members/login', {ID: inputID, password: inputPW})).data;
    //data에 담기는 JWT 정보를 parsing할 필요가 있음.

    const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW0xMzA4NCIsInJvbGUiOiJVU0VSIiwibmFtZSI6IuuvvOuRmCIsImlhdCI6MTY1MDg3NjY2NSwiZXhwIjoxNzc3Nzc3Nzc3fQ.0fuf-P0e4S1nfYxUwSCYf9C_t_gwCNcuqvlVZ0V6Yeg";
    if (!jwt) return alert("아이디와 비밀번호를 다시 확인해주세요"); // 없으면 사인인 안 돼!

    //로그인 정보를 쿠키에다가 담는 중
    const parsedjwt = parseToken(jwt);
    cookies.set("userInfo", parsedjwt, {
      path: '/',
      expires: new Date(parsedjwt.exp * 1000)
    });

    //그냥 홈페이지로 넘어가게 하기
    navigate("/", { replace: true });
  };

  const onKeyPress = (e: { key: string; }) => {
    if(e.key=='Enter'){
      fetchSignin();
    }
  }

  return (
    <main className="form-signin text-center d-flex justify-content-center">
      <div style={{ margin: "5.8%", width: "330px" }}>
        <p><img src={matilda} width="128"></img></p>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        {/* ID 입력란 */}
        <div className="form-floating">
          <input type="id" className="form-control" id="floatingInput" placeholder="ID" value={inputID}
            onChange={handleInputID}>
          </input>
          <label htmlFor="floatingInput">ID</label>
        </div>

        {/* Password 입력란 */}
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={inputPW}
            onChange={handleInputPW} onKeyPress={(onKeyPress)}>
          </input>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <p />
        {/* remember ID 체크
        <div className="checkbox my-3">
          <input type="checkbox" className="form-checkbox" id="floatingCheckbox" value="remember-me" tabIndex={-1}></input>
          <label htmlFor="floatingCheckbox">Remember ID</label>
        </div> */}

        {/* Sign in 버튼 */}
        <button className="w-100 btn btn-lg btn-secondary mb-3" type="submit"
          onClick={fetchSignin} onKeyPress={(onKeyPress)}>
          Sign in
        </button>
        <Link to="/signup" className="text-muted">회원이 아니세요?</Link>
        <p className="mt-5 mb-3 text-muted">© Copyright by Mindul</p>
      </div>
    </main>
  );
}