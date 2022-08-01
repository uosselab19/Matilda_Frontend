import { Link, useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';

import TextBox from '../../components/forms/TextBox';
import useForm from '../../hooks/useForm';
import { LoginMember } from '../../types/Member';
import { isRequired, isID, isPassword } from '../../utils/validator';
import { Buffer } from 'buffer';
import useCookie from '../../hooks/useCookie';

const validate = (values: LoginMember) => {
  const errors = {
    id: isRequired(values?.id) || isID(values?.id),
    password: isRequired(values?.password) || isPassword(values?.password)
  };

  return errors;
};

export const Signin = () => {
  const { setCookie } = useCookie();
  const navigate = useNavigate();
  const callback = async (values: LoginMember) => {
    // const { data, error } = await signinMember(values);
    // if(error) alert(error);
    // console.log(error);
    // console.log(data);

    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY1MDg3NjY2NSwiZXhwIjoxNzc3Nzc3Nzc3fQ._lNxhvNEly0ebal-RUnEZ46n-utx1e4M6U_WIb4TuEE';
    //base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
    const parseToken = (token: string) => {
      const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      result.token = token;
      return result;
    };
    const userInfo = parseToken(jwt);
    setCookie("userInfo", userInfo);
    navigate('/');
  };

  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

  return (
    <main className="form-signin d-flex justify-content-center">
      <div style={{ margin: '5.8%', width: '330px' }}>
        <div className="text-center my-4">
          <img src={matilda} width="128"></img>
        </div>
        <h1 className="h3 mb-5 fw-normal text-center">Sign-in</h1>
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
          error={errors['id']}
        />
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
          error={errors['password']}
        />
        {/* remember ID 체크 */}
        <div className="checkbox mt-4 mb-3">
          <input type="checkbox" className="form-checkbox" id="floatingCheckbox" value="remember-me" tabIndex={-1}></input>
          <label htmlFor="floatingCheckbox">Remember ID 부분</label>
        </div>

        {/* Sign in 버튼 */}
        <button className="w-100 btn btn-lg btn-secondary mb-5" type="submit" onClick={handleSubmit} onKeyPress={handleSubmit}>
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
