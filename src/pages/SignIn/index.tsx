import { Link, useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';
import TextBox from '../../components/forms/TextBox';
import useForm from '../../hooks/useForm';
import { SigninMember } from '../../types/Member';
import { isRequired, isID, isPassword } from '../../utils/validator';
import { Buffer } from 'buffer';
import useCookie from '../../hooks/useCookie';
import { useEffect } from 'react';
import { signinMember } from '../../services/securityService';

const validate = (values: SigninMember) => {
  const errors = {
    id: isRequired(values?.id) || isID(values?.id),
    password: isRequired(values?.password) || isPassword(values?.password)
  };

  return errors;
};

export const Signin = () => {
  const { setCookie, getCookie } = useCookie();
  const navigate = useNavigate();
  const callback = async (values: SigninMember) => {
    const { data, error } = await signinMember(values);
    if (error) { alert(error); return console.log(error); }
    console.log(data);

    //base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
    const parseToken = (token: string) => {
      const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      result.token = token;
      return result;
    };
    const userInfo = parseToken(data.accessToken);
    setCookie(userInfo);
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      const cookieData = getCookie();
      if (cookieData) {
        alert('이미 로그인한 정보가 있어서 홈페이지로 이동합니다.');
        navigate('/');
      }
    })();
  }, []);

  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

  return (
    <main className="form-signin d-flex justify-content-center">
      <div className='row g-3' style={{ margin: '5.8%', width: '330px' }}>
        <div className="text-center my-3">
          <img src={matilda} width="128" />
        </div>
        <h1 className="h3 mb-4 fw-normal text-center">Sign-in</h1>
        {/* ID 입력란 */}
        <TextBox
          name="id"
          id="id"
          label="ID"
          type="id"
          placeholder="ID"
          disabled={false}
          readonly={false}
          handleChange={handleChange}
          handleClick={handleClick}
          value={values['id']}
          error={errors['id']} />

        {/* Password 입력란 */}
        <TextBox
          name="password"
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          disabled={false}
          readonly={false}
          handleChange={handleChange}
          handleClick={handleClick}
          value={values['password']}
          error={errors['password']} />

        {/* remember ID 체크 */}
        <div className="checkbox mt-4 mb-3">
          <input type="checkbox" className="form-checkbox" id="floatingCheckbox" value="remember-me" tabIndex={-1}></input>
          <label htmlFor="floatingCheckbox">Remember ID 부분</label>
        </div>

        {/* Sign in 버튼 */}
        <button
          type="submit"
          className="w-100 btn-secondary mb-5"
          onClick={handleSubmit}
          onKeyPress={handleSubmit}>
          Sign in
        </button>
        <div className="text-center">
          <Link to="/signup" className="text-muted">
            회원이 아니세요?
          </Link>
        </div>
      </div>
    </main>
  );
};
