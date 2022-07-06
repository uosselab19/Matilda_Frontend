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
  error?: string;
}

export default function TextBox(props: TextBoxProps) {
  const { id, name, label, type, placeholder, disabled, readonly, handleChange, value, error } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type || 'text'}
        className={[boxClass, 'border-dark', `input ${error && 'is-danger'}`].join(' ')}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        value={value || ''}
      />
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}
