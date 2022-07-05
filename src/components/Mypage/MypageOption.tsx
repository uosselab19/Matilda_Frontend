import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextBox from '../../components/forms/TextBox';
import TextArea from '../forms/TextArea';

export const MypageOption = () => {
  const navigate = useNavigate();

  const initUserinfo = { password: undefined, nickname: undefined, email: undefined, desc: undefined };
  const [inputPW, setInputPW] = useState(initUserinfo.password as string | undefined);
  const [inputNickname, setInputNickname] = useState(initUserinfo.nickname as string | undefined);
  const [inputEmail, setInputEmail] = useState(initUserinfo.email as string | undefined);
  // const [inputProfileImg, setInputProfileImg] = useState('asdf');
  // const [inputWalletAddr, setInputWalletAddr] = useState('asdf');
  const [inputDesc, setInputDesc] = useState(initUserinfo.desc as string | undefined);

  //첫 마운트.
  useEffect(() => {
    const loadUserinfo = async () => {
      try {
        const userinfo = (await axios.get('/members/2')).data;
        setInputPW(userinfo.password);
        setInputNickname(userinfo.nickname);
        setInputEmail(userinfo.email);
        setInputDesc(userinfo.desc);
      } catch (err) {
        console.log(err);
        alert('회원정보를 불러오지 못했습니다.');
        navigate('/');
      }
    };
    loadUserinfo();
  }, []);

  // const handleProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
  //   setinputProfileImg(e.target.value);
  // };
  // const handleWalletAddr = (e: ChangeEvent<HTMLInputElement>) => {
  //   setWalletAddr(e.target.value);
  // };

  const submit = async (e: any) => {
    e.preventDefault(); // 화면 넘어가는 거 방지 코드

    const target = e.target as Element; // as Element 안 하면 setAttribute, removeAttribute 함수 못 씀

    if (inputEmail || inputNickname || inputPW || inputDesc) {
      target.setAttribute('disabled', 'true'); // 중복 입력 방지로, 한 번 submit를 제출하면 그냥 버튼을 비활성화시킴.

      //회원 정보 DB에 입력하는 부분
      try {
        await axios.put('/members/2', {
          email: inputEmail,
          nickname: inputNickname,
          password: inputPW,
          description: inputDesc
        });
        alert('회원정보가 수정되었습니다!');
        target.removeAttribute('disabled'); //중복 입력 방지 해제 코드
      } catch (error) {
        // DB 접속 오류
        console.log('회원 정보 DB에 put하다가 생긴 오류');
        console.log(error);
        alert('회원정보 수정에 오류가 생겨서 바뀌지 않았습니다. 다시 한 번 실행해주세요!');
        target.removeAttribute('disabled'); //중복 입력 방지 해제 코드
      }
    } else {
      //
      alert('바뀌는 정보가 없어요!');
    }
  };

  return (
    <div>
      <div className="my-5">
        <h1>회원정보 수정</h1>
        <p>
          회원정보를 수정하는 부분입니다!
          <br />
          바꾸고 싶은 부분만 입력시면 알아서 바꿔드립니다.
        </p>
      </div>

      <form id="signupForm" className="" noValidate>
        <div className="row g-3">
          {/* 비밀번호 */}
          <TextBox
            name="pw"
            id="pw"
            label="Password"
            type="password"
            placeholder={inputPW as string}
            helpText="Please enter a valid Password"
            disabled={false}
            readonly={false}
            handleChange={(e) => {
              setInputPW(e.target.value);
            }}
            value={inputPW}
          />

          {/* 닉네임 */}
          <TextBox
            name="nickname"
            id="nickname"
            label="Nickname"
            type="text"
            placeholder={inputNickname as string}
            helpText="Please enter a valid Nickname"
            disabled={false}
            readonly={false}
            handleChange={(e) => {
              setInputNickname(e.target.value);
            }}
            value={inputNickname}
          />

          {/* 이메일 */}
          <TextBox
            name="email"
            id="email"
            label="Email"
            type="email"
            placeholder={inputEmail as string}
            helpText="Please enter a valid Email"
            disabled={false}
            readonly={false}
            handleChange={(e) => {
              setInputEmail(e.target.value);
            }}
            value={inputEmail}
          />

          {/* 프사
          <label htmlFor="id" className="form-label col-4 fs-3">
            Profile Image
          </label>
          <div className="col-4">
            <input
              className="form-control border-dark"
              id="profileImg"
              type="file"
              accept="image/*"
              placeholder={inputProfileImg}
              onChange={handleProfileImg}
            />
          </div>
          <div className="col-4" /> */}

          {/* 지갑주소
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input
              className="form-control border-dark"
              id="walletAddr"
              placeholder={inputWalletAddr}
              type="text"
              required
              onChange={handleWalletAddr}
            />
          </div> */}

          {/* 설명 */}
          <TextArea
            name="desc"
            id="desc"
            label="Description"
            rows={5}
            placeholder={inputDesc as string}
            helpText="Please enter a valid Description"
            disabled={false}
            readonly={false}
            handleChange={(e) => setInputDesc(e.target.value)}
            value={inputDesc}
          />
        </div>
        <button
          className="col-6 btn btn-primary btn-lg bg-dark justify-content-center mt-3"
          type="submit"
          onClick={submit}
        >
          Edit info
        </button>
      </form>
    </div>
  );
};
