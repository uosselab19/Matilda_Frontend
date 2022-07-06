import { ChangeEventHandler } from 'react';

interface TextAreaProps {
  id: string;
  name?: string;
  label: string;
  rows: number;
  placeholder: string;
  helpText?: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: any;
  error?: string;
}

export default function TextArea(props: TextAreaProps) {
  const { id, name, label, rows, placeholder, disabled, readonly, handleChange, value, error } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className={[boxClass, 'border-dark', `input ${error && 'is-danger'}`].join(' ')}
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        value={value}
        style={{ resize: 'none' }}
      />
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}
