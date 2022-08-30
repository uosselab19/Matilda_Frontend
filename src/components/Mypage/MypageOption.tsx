import TextBox from '../../components/forms/TextBox';
import useForm from '../../hooks/useForm';
import { putMember } from '../../services/memberService';
import { SelectMember, UpdateMember } from '../../types/Member';
import { isEmail, isPassword, notMaxLength, notMinLength } from '../../utils/validatorUtil';
import ImageBox from '../forms/ImageBox';
import SubmitButton from '../forms/SubmitButton';
import TextArea from '../forms/TextArea';

const validate = (values: UpdateMember) => {
  const errors = {
    password: isPassword(values?.password),
    nickname:
      notMinLength(values?.nickname, 2, '닉네임을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.nickname, 10, '닉네임을 10글자 이하로 입력해 주세요.'),
    email: isEmail(values?.email),
    description:
      notMinLength(values?.description, 2, '설명을 2글자 이상 입력해 주세요.') ||
      notMaxLength(values?.description, 300, '설명을 300글자 이하로 입력해 주세요.')
  };

  return errors;
};

interface MypageOptionProps {
  userInfo: SelectMember;
  setUserInfo: React.Dispatch<React.SetStateAction<SelectMember>>;
}

export const MypageOption = (props: MypageOptionProps) => {
  const { userInfo, setUserInfo } = props;

  const callback = (values: {}) => {
    console.log(values);
    putMember({ memberNum: userInfo.memberNum, ...values } as UpdateMember);
    setUserInfo({} as SelectMember);
  };

  const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);

  return (
    <div>
      <div className="my-5">
        <h1>회원정보 수정</h1>
        <p>
          회원정보를 수정하는 부분입니다!
        </p>
      </div>

      <form id="memberEditForm" className="" noValidate>
        <div className="row g-3 mb-4">
          {/* 비밀번호 */}
          <TextBox
            name="password"
            id="password"
            label="Password"
            type="password"
            placeholder={""}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            handleClick={handleClick}
            value={values['password']}
            error={errors['password']} />

          {/* 닉네임 */}
          <TextBox
            name="nickname"
            id="nickname"
            label="Nickname"
            type="text"
            placeholder={errors['nickname'] ? "" : userInfo.nickname || ""}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            value={values['nickname']}
            error={errors['nickname']} />

          {/* 이메일 */}
          <TextBox
            name="email"
            id="email"
            label="Email"
            type="email"
            placeholder={errors['email'] ? "" : userInfo.email || ""}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            value={values['email']}
            error={errors['email']} />

          {/* 프사*/}
          <ImageBox
            name="profileImg"
            id="profileImg"
            label="Profile Image"
            placeholder={userInfo.profileImg || ""}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            value={values['profileImg']}
            error={errors['profileImg']}
          />

          {/* 설명 */}
          <TextArea
            name="description"
            id="description"
            label="Description"
            rows={5}
            placeholder={errors['description'] ? "" : userInfo.description || ""}
            disabled={false}
            readonly={false}
            handleChange={handleChange}
            value={values['description']}
            error={errors['description']} />
        </div>

        <SubmitButton
          title={"Edit info"}
          handleSubmit={handleSubmit}
          values={values}
          errors={errors}
          keys={["password", "nickname", "email", "profileImg", "description"]}
          allRequired={false} />
      </form>
    </div>
  );
};
