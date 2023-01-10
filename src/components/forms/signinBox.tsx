import { ChangeEventHandler, MouseEventHandler } from 'react';

interface SigninBoxProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleClick: MouseEventHandler<HTMLInputElement>;
  name: string;
  value: any;
  error?: string;
}

//로그인을 위해 따로 디자인한 함수
//실제로는 TextBox 컴포넌트와 기능적인 면에서는 차이가 없음
export default function SigninBox(props: SigninBoxProps) {
  const { id, name, label, type, placeholder, disabled, readonly, handleClick, handleChange, value } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div className="input-group row g-4" style={{ padding: '0px', margin: '0px' }}>
      <span className="col-2 input-group-text border-dark">{label}</span>
      <input
        type={type || 'text'}
        className={['col-10', boxClass, `border-dark input`].join(' ')}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onClick={handleClick}
        onChange={handleChange}
        value={value || ''}
      />
    </div>
  );
}
