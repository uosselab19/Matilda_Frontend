import { EventHandler } from 'react';

interface SubmitButtonProps {
  title: string;
  handleSubmit: EventHandler<any>;
  values: any;
  errors: any;
  keys: string[];
  allRequired: boolean;
}

// forms의 제출 버튼 컴포넌트
export default function SubmitButton(props: SubmitButtonProps) {
  const { title, handleSubmit, values, errors, keys, allRequired } = props;

  const disabled = !(
    keys.every((e) => { // 에러 체크
      return errors[e] == undefined;
    }) &&
    keys.some((e) => { // 키가 하나라도 존재하는지 체크
      return values[e] != undefined;
    }) &&
    (!allRequired ||
      keys.every((e) => { // 유효성 검사 시 키가 전부 있는지 체크
        return values[e] != undefined;
      }))
  );

  return (
    <button type="submit" className={`w-100 btn btn-lg btn-dark`} onClick={handleSubmit} disabled={disabled}>
      {title}
    </button>
  );
}
