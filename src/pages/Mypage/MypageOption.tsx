//import { useState } from "react";

export const MypageOption = () => {
  return (
    <div>
      <div className="my-5">
        <h1>회원정보 수정</h1>
        <p>회원정보를 수정하는 부분입니다!<br />바꾸고 싶은 부분만 입력시면 알아서 바꿔드립니다.</p>
      </div>

      <form id="signupForm" className="needs-validation" noValidate>
        <div className="row g-3">
          {/* 비밀번호 */}
          <label htmlFor="id" className="form-label col-4 fs-3">Password</label>
          <div className="col-8">
            <input className="form-control border-dark" id="pw" placeholder=""
              type="password" required />
            <div className="invalid-feedback">
              Please enter a valid password
            </div>
          </div>

          {/* 닉네임 */}
          <label htmlFor="id" className="form-label col-4 fs-3">Nickname</label>
          <div className="col-8">
            <input className="form-control border-dark" id="nickname" placeholder=""
              type="text" required />
            <div className="invalid-feedback">
              Please enter a valid Nickname
            </div>
          </div>

          {/* 이메일 */}
          <label htmlFor="id" className="form-label col-4 fs-3">E-mail</label>
          <div className="col-8">
            <input className="form-control border-dark" id="email" placeholder=""
              type="email" required />
            <div className="invalid-feedback">
              Please enter a valid E-mail
            </div>
          </div>

          {/* 프사 */}
          <label htmlFor="id" className="form-label col-4 fs-3">Profile Image</label>
          <div className="col-4">
            <input className="form-control border-dark" id="profileImg" style={{height:200}}
              type="text" required />
            <div className="invalid-feedback">
              Please enter a valid Profile Image
            </div>
          </div>
          <div className="col-4"/>

          {/* 지갑주소 */}
          <label htmlFor="id" className="form-label col-4 fs-3">Wallet Addr.</label>
          <div className="col-8">
            <input className="form-control border-dark" id="walletAddress" placeholder=""
              type="text" required />
            <div className="invalid-feedback">
              Please enter a valid Wallet Address
            </div>
          </div>

          {/* 설명 */}
          <label htmlFor="id" className="form-label col-4 fs-3">Description</label>
          <div className="col-8">
            <input className="form-control border-dark" id="profileImg" style={{height:200}}
              type="text" required />
            <div className="invalid-feedback">
              Please enter a valid Profile Image
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}