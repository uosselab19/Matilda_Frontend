import { ChangeEvent, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';

import axios from 'axios';
import TextBox from '../../components/forms/TextBox';

export const Signup = () => {
  //회원가입 시 중요한 state
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const [inputNickname, setInputNickname] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const handleInputID = (e: ChangeEvent<HTMLInputElement>) => {
    setInputID(e.target.value);
  };
  const handleInputPW = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPW(e.target.value);
  };
  const handleInputNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
  };
  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };

  const navigate = useNavigate();

  const submit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 화면 넘어가는 거 방지 코드

    const target = e.target as Element; // as Element 안 하면 setAttribute, removeAttribute 함수 못 씀
    const form = document.getElementById('signupForm') as HTMLSelectElement;
    target.setAttribute('disabled', 'true'); // 중복 입력 방지로, 한 번 submit를 제출하면 그냥 버튼을 비활성화시킴.
    if (!form.checkValidity()) {
      // 폼 유효성 검사
      form.classList.add('was-validated'); // 폼 유효성 검사 후에 이미지화 시켜주는 코드
      target.removeAttribute('disabled'); // 중복 입력 방지 해제 코드
      return;
    }

    //아이디 중복 입력 체크하는 부분
    try {
      const data = (await axios.get('/members', { params: { ID: inputID } })).data;
      if (!data) {
        target.removeAttribute('disabled'); //중복 입력 방지 해제 코드
        return alert('이미 가입된 회원이 있습니다.');
      }
    } catch (error) {
      // DB 접속 오류
      console.log('아이디 중복 체크에서 생긴 오류');
      console.log(error);
    }

    //회원 정보 DB에 입력하는 부분
    try {
      await axios.post('/members', {
        email: inputEmail,
        id: inputID,
        nickname: inputNickname,
        password: inputPW
      });
      return navigate('/signin');
    } catch (error) {
      // DB 접속 오류
      console.log('회원 정보 DB에 넣다가 생긴 오류');
      console.log(error);
      target.removeAttribute('disabled'); //중복 입력 방지 해제 코드
    }
  };

  return (
    <main className="container mb-5">
      <div className="py-5 col-lg-6 text-center mx-auto">
        <img className="d-block mx-auto my-5" src={matilda} width="128"></img>
        <h2>Sign Up Form</h2>
        <p className="lead">
          Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a
          validation state that can be triggered by attempting to submit the form without completing it.
        </p>
      </div>

      <div className="col-md-12 col-lg-9 col-xl-7 mx-auto">
        <form id="signupForm" className="needs-validation" noValidate>
          <div className="row g-3">
            {/*아이디*/}
            <TextBox
              id="id"
              label="ID"
              type="id"
              placeholder="mindul486"
              helpText="Please enter a valid ID"
              disabled={false}
              readonly={false}
              handleChange={handleInputID}
              value={inputID}/>

            {/*비밀번호*/}
            <TextBox
              id="pw"
              label="Password"
              type="password"
              placeholder="password"
              helpText="Please enter a valid Password"
              disabled={false}
              readonly={false}
              handleChange={handleInputPW}
              value={inputPW}/>

            {/*별명*/}
            <TextBox
              id="nickname"
              label="Nickname"
              type="text"
              placeholder="Mindul"
              helpText="Your nickname is required."
              disabled={false}
              readonly={false}
              handleChange={handleInputNickname}
              value={inputNickname}/>

            {/*이메일*/}
            <TextBox
              id="email"
              label="Email"
              type="email"
              placeholder="mindul@example.com"
              helpText="Please enter a valid email address."
              disabled={false}
              readonly={false}
              handleChange={handleInputEmail}
              value={inputEmail}/>
          </div>

          <div className="col-12 my-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input border-dark" id="save-info" />
              <label className="form-check-label" htmlFor="save-info">
                약관 동의를 위한 체크버튼
              </label>
            </div>
          </div>

          <button className="w-100 btn btn-primary btn-lg bg-dark" type="submit" onClick={submit}>
            Continue to Sign-up
          </button>
        </form>
      </div>
    </main>
  );
};
