import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import matilda from '../../assets/images/matilda.png';

import { cookies } from '../../components/App/App';
import { Buffer } from 'buffer';
import TextBox from '../../components/forms/TextBox';

export const Signin = () => {
  const navigate = useNavigate(); // 로그인 후에 다른 창으로 넘어가야 할 때 사용하는 훅

  //로그인시 사용하는 state
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const handleInputID = (e: ChangeEvent<HTMLInputElement>) => {
    setInputID(e.target.value);
  };
  const handleInputPW = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPW(e.target.value);
  };

  //base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
  const parseToken = (token: string) => {
    const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    result.token = token;
    return result;
  };

  //로그인 정보 확인하는 함수
  const fetchSignin = async () => {
    //아이디와 비밀번호는 입력이 되어야 다음으로 넘어감
    if (!inputID.length) return alert('아이디를 입력해주세요.');
    if (!inputPW.length) return alert('비밀번호를 입력해주세요.');

    try {
      //jwt에 담기는 JWT 정보를 parsing할 필요가 있음.
      const jwt = (await axios.post('/security/login', { id: inputID, password: inputPW })).data;

      //const jwt =
      //  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW0xMzA4NCIsInJvbGUiOiJVU0VSIiwibmFtZSI6IuuvvOuRmCIsImlhdCI6MTY1MDg3NjY2NSwiZXhwIjoxNzc3Nzc3Nzc3fQ.0fuf-P0e4S1nfYxUwSCYf9C_t_gwCNcuqvlVZ0V6Yeg';
      if (!jwt) return alert('아이디와 비밀번호를 다시 확인해주세요'); // 없으면 사인인 안 돼!

      //로그인 정보를 쿠키에다가 담는 중
      const parsedjwt = parseToken(jwt);
      cookies.set('userInfo', parsedjwt, {
        path: '/',
        expires: new Date(parsedjwt.exp * 1000)
      });

      //그냥 홈페이지로 넘어가게 하기
      navigate('/', { replace: true });
    } catch (err) {
      if (err.response.data.message != undefined) alert(err.response.data.message);
      else alert(err.response.data);
    }
  };

  const onEnterPress = (e: { key: string }) => {
    if (e.key == 'Enter') {
      fetchSignin();
    }
  };

  return (
    <main className="form-signin d-flex justify-content-center">
      <div style={{ margin: '5.8%', width: '330px' }}>
        <p className="text-center">
          <img src={matilda} width="128"></img>
        </p>
        <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

        <p>
          {/* ID 입력란 */}
          <TextBox
            name="id"
            id="id"
            label="ID"
            type="id"
            placeholder="ID"
            helpText="Please enter a valid ID"
            disabled={false}
            readonly={false}
            handleChange={handleInputID}
            value={inputID}
          />
        </p>
        <p>
          {/* Password 입력란 */}
          <TextBox
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            helpText="Please enter a valid Password"
            disabled={false}
            readonly={false}
            handleChange={handleInputPW}
            value={inputPW}
          />
        </p>
        {/* remember ID 체크
        <div className="checkbox mt-4 mb-3">
          <input type="checkbox" className="form-checkbox" id="floatingCheckbox" value="remember-me" tabIndex={-1}></input>
          <label htmlFor="floatingCheckbox">Remember ID</label>
        </div> */}

        {/* Sign in 버튼 */}
        <button
          className="w-100 btn btn-lg btn-secondary mb-3"
          type="submit"
          onClick={fetchSignin}
          onKeyPress={onEnterPress}
        >
          Sign in
        </button>
        <p className="text-center">
          <Link to="/signup" className="text-muted">
            회원이 아니세요?
          </Link>
        </p>
      </div>
    </main>
  );
};
