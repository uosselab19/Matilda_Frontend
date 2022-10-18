import { ChangeEventHandler, MouseEventHandler } from 'react';

interface TextBoxProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleClick?: MouseEventHandler<HTMLInputElement>;
  name: string;
  value: any;
  error?: string;
}

export default function TextBox(props: TextBoxProps) {
  const { id, name, label, type, placeholder, disabled, readonly, handleClick, handleChange, value, error } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type || 'text'}
        className={[boxClass, `border-${error ? 'danger' : 'dark'}`, `input ${error && 'is-danger'}`, ``].join(' ')}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onClick={handleClick}
        onChange={handleChange}
        value={value || ''}
      />
      {error && <span className="help is-danger text-danger">{error}</span>}
    </div>
  );
}
