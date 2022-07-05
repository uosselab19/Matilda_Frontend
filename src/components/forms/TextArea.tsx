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
}

export default function TextArea(props: TextAreaProps) {
  const { id, name, label, rows, placeholder, helpText, disabled, readonly, handleChange, value } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className={[boxClass, 'border-dark'].join(' ')}
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
      <div className="invalid-feedback">{helpText}</div>
    </div>
  );
}
