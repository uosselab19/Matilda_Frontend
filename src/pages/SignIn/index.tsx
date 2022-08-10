import { Link, useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';
import useForm from '../../hooks/useForm';
import { SigninMember } from '../../types/Member';
import { isRequired, isID, isPassword } from '../../utils/validator';
import { Buffer } from 'buffer';
import useCookie from '../../hooks/useCookie';
import { useEffect } from 'react';
import { signinMember } from '../../services/securityService';
import SigninBox from '../../components/forms/signinBox';
import SubmitButton from '../../components/forms/SubmitButton';
import Swal from 'sweetalert2';

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
    if (error) {
      console.log(error);
      return Swal.fire({
        icon: 'error',
        title: '에러가 발생했어요!',
        text: error,
      });
    }

    //base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
    const parseToken = (token: string) => {
      const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      result.token = token;
      return result;
    };
    const userInfo = parseToken(data.accessToken);
    setCookie(userInfo);
    navigate('/');
    return;
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
    <main
      className="container form-signin"
      style={{ marginTop: '6%', width: '330px' }}
      onKeyUp={(e)=>{if(e.key=="Enter") handleSubmit(e);}} >
      <div className='row'>
        <div className="text-center my-3">
          <img src={matilda} width="128px" />
        </div>
        <h1 className="h3 mb-3 fw-normal text-center">Sign-in</h1>
        {/* ID 입력란 */}
        <SigninBox
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
        <SigninBox
          name="password"
          id="password"
          label="PW"
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
        <SubmitButton
          title={"Sign in"}
          handleSubmit={handleSubmit}
          values={values}
          errors={errors}
          keys={["id", "password"]}
          allRequired={true} />

        <div className="text-center mt-3">
          <Link to="/signup" className="text-muted">
            회원이 아니세요?
          </Link>
        </div>
      </div>
    </main>
  );
};
