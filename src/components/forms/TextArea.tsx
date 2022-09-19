import { ChangeEventHandler, MouseEventHandler } from 'react';

interface TextAreaProps {
  id: string;
  name?: string;
  label: string;
  rows: number;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>;
  handleClick?: MouseEventHandler<HTMLTextAreaElement>;
  value: any;
  error: string;
}

export default function TextArea(props: TextAreaProps) {
  const { id, name, label, rows, placeholder, disabled, readonly, handleClick, handleChange, value, error } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        className={[boxClass, `border-${error?"danger":"dark"}`, `input ${error && 'is-danger'}`].join(' ')}
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        onClick={handleClick}
        value={value}
        style={{ resize: 'none' }}
      />
      {error && <span className="help is-danger text-danger">{error}</span>}
    </div>
  );
}
