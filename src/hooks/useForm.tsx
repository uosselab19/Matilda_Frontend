import { useState, useEffect, ChangeEvent } from 'react';

// form을 구현하기 위해 사용하는 훅
// 유효성 검사 등을 위해 따로 훅을 만들었지만, 해당 기능을 지원하는 다른 프로그램을 사용하면 그거 사용 가능
export default function useForm(callback: Function, validate: Function) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // submit 시에 form 갱신을 위함
  useEffect(() => {
    const hasErrors =
      Object.values(errors).filter((e) => {
        return e;
      }).length > 0;
    if (!hasErrors && isSubmitting) {
      callback(values);
    }
  }, [errors, isSubmitting]);

  // 유효성 검사를 위해 사용되는 함수
  const validObject = (obj: {}) => {
    return Object.fromEntries(
      Object.entries(obj).filter((e) => {
        return e[1];
      })
    );
  };

  // submit할 때 데이터 처리해주는 함수
  const handleSubmit = (event: ChangeEvent<any>) => {
    if (event) event.preventDefault();

    const { name, value } = event.target;

    setValues((oldValues) => {
      const newValues = validObject({ ...oldValues, [name]: value });

      return newValues;
    });

    setIsSubmitting(true);
  };

  // form에 값이 변경되면 호출되는 핸들러 함수
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();

    const { name, value } = event.target;

    setValues((oldValues) => {
      const newValues = { ...oldValues, [name]: value };
      setErrors((errors) => ({ ...errors, [name]: validate(newValues)[name] }));
      setIsSubmitting(false);
      return validObject(newValues);
    });
  };

  // form을 클릭하면 호출되는 핸들러 함수
  // 위에 있는 핸들러와 모양은 같으나, 입력값이 달라서 따로 함수를 만들어 둠
  const handleClick = (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();

    const { name, value } = event.currentTarget;

    setValues((oldValues) => {
      const newValues = { ...oldValues, [name]: value };
      setErrors((errors) => ({ ...errors, [name]: validate(newValues)[name] }));
      setIsSubmitting(false);
      return validObject(newValues);
    });
  };

  return { handleChange, handleClick, handleSubmit, values, errors };
}
