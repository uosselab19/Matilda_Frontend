import { useNavigate } from 'react-router-dom';
import matilda from '../../assets/images/matilda.png';
import SubmitButton from '../../components/forms/SubmitButton';
import TextBox from '../../components/forms/TextBox';
import useForm from '../../hooks/useForm';
import { insertMember } from '../../services/memberService';
import { InsertMember } from '../../types/Member';
import { alertError, alertSuccess } from '../../utils/alertUtil';
import { encrypt } from '../../utils/cryptoUtil';
import { isRequired, isID, isPassword, isEmail, notMaxLength, notMinLength } from '../../utils/validatorUtil';

// 회원가입 유효성 검사
const validate = (values: InsertMember) => {
  const errors = {
    id: isRequired(values?.id) || isID(values?.id),
    password: isRequired(values?.password) || isPassword(values?.password),
    nickname:
      isRequired(values?.nickname) ||
      notMinLength(values?.nickname, 2, '닉네임을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.nickname, 50, '닉네임을 50글자 이하로 입력해 주세요.'),
    email: isRequired(values?.email) || isEmail(values?.email)
  };

  return errors;
};

// 회원가입 페이지 컴포넌트
export const Signup = () => {
  const navigate = useNavigate();
  const callback = async (values: InsertMember) => {
    if (!values.password) {
      alertError('에러가 발생했어요!', '패스워드가 들어가지 않았어요.');
      console.log('data with no password is trying to pass my db');
      return;
    }

    // 회원가입 시 비밀번호를 프론트엔드에서부터 백엔드로 갈 때 암호화해서 보내야 함
    const encryptedValues = { ...values, ['password']: encrypt(values.password) };
    const { error } = await insertMember(encryptedValues); // 백엔드에 정보 집어넣음

    // 에러 발생 시 나오는 함수
    if (error) {
      console.log(error);
      alertError('에러가 발생했어요!', '');
      return;
    }

    // 에러 없으면 로그인 페이지로 넘어감
    alertSuccess('회원가입이 완료되었습니다!', '로그인을 하셔야 회원 서비스를 이용할 수 있습니다.');
    navigate('/signin', { replace: false });
    return;
  };

  // 폼 사용을 위함
  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

  return (
    <main
      className="container mb-5"
      onKeyUp={(e) => {
        if (e.key == 'Enter') handleSubmit(e);
      }}
    >
      <div className="py-5 col-lg-6 text-center mx-auto">
        <img className="d-block mx-auto my-5" src={matilda} width="128"></img>
        <h2>Sign Up Form</h2>
        <p className="lead">
          MATILDA을 사용하기 위해 필요한 회원가입 페이지입니다. <br />
          ID, Password, Nickname, Email을 모두 기입해주셔야 합니다.
        </p>
      </div>

      <div className="col-md-12 col-lg-9 col-xl-7 mx-auto">
        <form id="signupForm" className="needs-validation" noValidate>
          <div className="row g-3">
            {/*아이디*/}
            <TextBox
              name="id"
              id="id"
              label="ID"
              type="id"
              placeholder="mindul486"
              disabled={false}
              readonly={false}
              handleChange={handleChange}
              handleClick={handleClick}
              value={values['id']}
              error={errors['id']}
            />

            {/*비밀번호*/}
            <TextBox
              name="password"
              id="password"
              label="Password"
              type="password"
              placeholder="password"
              disabled={false}
              readonly={false}
              handleChange={handleChange}
              handleClick={handleClick}
              value={values['password']}
              error={errors['password']}
            />

            {/*별명*/}
            <TextBox
              name="nickname"
              id="nickname"
              label="Nickname"
              type="text"
              placeholder="Mindul"
              disabled={false}
              readonly={false}
              handleChange={handleChange}
              handleClick={handleClick}
              value={values['nickname']}
              error={errors['nickname']}
            />

            {/*이메일*/}
            <TextBox
              name="email"
              id="email"
              label="Email"
              type="email"
              placeholder="mindul@example.com"
              disabled={false}
              readonly={false}
              handleChange={handleChange}
              handleClick={handleClick}
              value={values['email']}
              error={errors['email']}
            />
          </div>

          <div className="col-12 my-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input border-dark" id="save-info" />
              <label className="form-check-label" htmlFor="save-info">
                약관 동의를 위한 체크버튼
              </label>
            </div>
          </div>

          <SubmitButton
            title={'Continue to Sign-up'}
            handleSubmit={handleSubmit}
            values={values}
            errors={errors}
            keys={['id', 'password', 'nickname', 'email']}
            allRequired={true}
          />
        </form>
      </div>
    </main>
  );
};
