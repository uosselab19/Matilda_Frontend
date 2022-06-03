import { ChangeEvent, useState } from "react";

export const MypageOption = () => {
  const [password, setPassword] = useState("qwer4321");
  const [nickname, setNickname] = useState("mindul");
  const [email, setEmail] = useState("pencake33@naver.com");
  const [profileImg, setProfileImg] = useState("asdf");
  const [walletAddr, setWalletAddr] = useState("asdf");
  const [desc, setDesc] = useState("asdf");

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileImg(e.target.value);
  };
  const handleWalletAddr = (e: ChangeEvent<HTMLInputElement>) => {
    setWalletAddr(e.target.value);
  };
  const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
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

      <form id="signupForm" className="needs-validation" noValidate>
        <div className="row g-3">
          {/* 비밀번호 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Password
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="pw"
              placeholder={password} type="password" required
              onChange={handlePassword} />
            <div className="invalid-feedback">Please enter a valid password</div>
          </div>

          {/* 닉네임 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Nickname
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="nickname"
              placeholder={nickname} type="text" required
              onChange={handleNickname} />
            <div className="invalid-feedback">Please enter a valid Nickname</div>
          </div>

          {/* 이메일 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            E-mail
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="email"
              placeholder={email} type="email" required
              onChange={handleEmail} />
            <div className="invalid-feedback">Please enter a valid E-mail</div>
          </div>

          {/* 프사 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Profile Image
          </label>
          <div className="col-4">
            <input className="form-control border-dark" id="profileImg"
              type="file" accept="image/*" placeholder={profileImg}
              onChange={handleProfileImg} />
            <div className="invalid-feedback">Please enter a valid Profile Image</div>
          </div>
          <div className="col-4" />

          {/* 지갑주소 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Wallet Addr.
          </label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddr"
              placeholder={walletAddr} type="text" required
              onChange={handleWalletAddr} />
            <div className="invalid-feedback">Please enter a valid Wallet Address</div>
          </div>

          {/* 설명 */}
          <label htmlFor="id" className="form-label col-4 fs-3">
            Description
          </label>
          <div className="col-8">
            <textarea className="form-control border-dark" id="desc"
              placeholder={desc}
              rows={5}
              style={{ resize: 'none' }}
              onChange={handleDesc}
            />
            <div className="invalid-feedback">Please enter a valid Profile Image</div>
          </div>

          <button className="col-6 btn btn-primary btn-lg bg-dark justify-content-center" type="submit">
            Edit info
          </button>
        </div>
      </form>
    </div>
  );
};
