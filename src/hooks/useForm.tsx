import { useState, useEffect, ChangeEvent } from 'react';

export default function useForm(callback: Function, validate: Function) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.values(errors).filter((e)=>{return e;}).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event: ChangeEvent<any>) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();

    const { name, value } = event.target

    // setValues((oldValues) => {
    //   const newValues = { ...oldValues, [name]: value };
    //   setErrors((errors) => ({ ...errors, [name]: validate(newValues)[name]}));
    //   return newValues;
    // });

    const newValues={ ...values, [name]: value };
    setValues(newValues);
    setErrors((errors) => ({ ...errors, [name]: validate(newValues)[name]}));
  };

  return { handleChange, handleSubmit, values, errors };
}
