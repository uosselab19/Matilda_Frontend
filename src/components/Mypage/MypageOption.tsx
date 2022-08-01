import { useEffect } from 'react';

import TextBox from '../../components/forms/TextBox';
import useForm from '../../hooks/useForm';
import { UpdateMember } from '../../types/Member';
import { isEmail, isPassword, notMaxLength, notMinLength } from '../../utils/validator';
import TextArea from '../forms/TextArea';

const validate = (values: UpdateMember) => {
  const errors = {
    password: isPassword(values?.password),
    nickname:
      notMinLength(values?.nickname, 2, '설명을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.nickname, 10, '설명을 10글자 이하로 입력해 주세요.'),
    email: isEmail(values?.email),
    description:
      notMinLength(values?.description, 2, '설명을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.description, 10, '설명을 10글자 이하로 입력해 주세요.')
  };

  return errors;
};
const callback = () => {
  console.log('asdf');
};

export const MypageOption = () => {
  //첫 마운트.
  useEffect(() => { }, []);

  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

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

      <form id="memberEditForm" className="" noValidate>
        <div className="row g-3">
          {/* 비밀번호 */}
          <TextBox
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder={''}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            handleClick={handleClick}
            value={values['password']}
            error={errors['password']}
          />

          {/* 닉네임 */}
          <TextBox
            name="nickname"
            id="nickname"
            label="Nickname"
            type="text"
            placeholder={''}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            handleClick={handleClick}
            value={values['nickname']}
            error={errors['nickname']}
          />

          {/* 이메일 */}
          <TextBox
            name="email"
            id="email"
            label="Email"
            type="email"
            placeholder={''}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            handleClick={handleClick}
            value={values['email']}
            error={errors['email']}
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
          <div className="col-4" />

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
            name="description"
            id="description"
            label="Description"
            rows={5}
            placeholder={''}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            handleClick={handleClick}
            value={values['description']}
            error={errors['description']}
          />
        </div>
        <button className="col-6 btn btn-primary btn-lg bg-dark justify-content-center mt-3 w-100" type="submit" onClick={handleSubmit}>
          Edit info
        </button>
      </form>
    </div>
  );
};
