import { ChangeEventHandler } from 'react';

interface TextBoxProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  helpText?: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: any;
  errors?: string;
}

export default function TextBox(props: TextBoxProps) {
  const { id, name, label, type, placeholder, disabled, readonly, handleChange, value, errors } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type || 'text'}
        className={[boxClass, 'border-dark', `input ${errors && 'is-danger'}`].join(' ')}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        
        value={value || ""}
      />
      {errors && (<p className="help is-danger">{errors}</p>)}
    </div>
  );
}