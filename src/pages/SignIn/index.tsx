import { Link } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';

import TextBox from '../../components/forms/TextBox';
import useForm from '../../hooks/useForm';
import { insertMember } from '../../services/memberService';
import { LoginMember } from '../../types/Member';
import { isRequired, isID, isPassword } from '../../utils/validator';

const validate = (values: LoginMember) => {
  const errors = {
    id: isRequired(values?.id) || isID(values?.id),
    password: isRequired(values?.password) || isPassword(values?.password)
  };

  return errors;
}

const callback = (values: LoginMember) => {
  console.log(values);
  insertMember(values);
}

export const Signin = () => {
  //base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
  // const parseToken = (token: string) => {
  //   const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  //   result.token = token;
  //   return result;
  // };

  //const jwt ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZW0xMzA4NCIsInJvbGUiOiJVU0VSIiwibmFtZSI6IuuvvOuRmCIsImlhdCI6MTY1MDg3NjY2NSwiZXhwIjoxNzc3Nzc3Nzc3fQ.0fuf-P0e4S1nfYxUwSCYf9C_t_gwCNcuqvlVZ0V6Yeg';
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
