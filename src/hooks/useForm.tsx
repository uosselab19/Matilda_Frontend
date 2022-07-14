import { useState, useEffect, ChangeEvent } from 'react';

export default function useForm(callback: Function, validate: Function) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasErrors = (Object.values(errors).filter((e) => {return e;}).length > 0);
    if (!hasErrors && isSubmitting) {
      callback();
    }
  }, [errors, isSubmitting]);

  const handleSubmit = (event: ChangeEvent<any>) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();

    const { name, value } = event.target;

    setValues((oldValues) => {
      const newValues = { ...oldValues, [name]: value };
      setErrors((errors) => ({ ...errors, [name]: validate(newValues)[name] }));
      setIsSubmitting(false);
      return newValues;
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.persist();

    const { name, value } = event.currentTarget;

    setValues((oldValues) => {
      const newValues = { ...oldValues, [name]: value };
      setErrors((errors) => ({ ...errors, [name]: validate(newValues)[name] }));
      setIsSubmitting(false);
      return newValues;
    });
  };

  return { handleChange, handleClick, handleSubmit, values, errors };
}
