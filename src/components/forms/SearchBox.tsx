import { ChangeEventHandler } from 'react';

interface SearchBoxProps {
  id: string;
  disabled: boolean;
  readonly: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: any;
  error?: string;
}

export default function SearchBox(props: SearchBoxProps) {
  const { id, name, disabled, readonly, handleChange, value, error } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <input
        type='search'
        className={[boxClass, 'border-dark', `input ${error && 'is-danger'}`].join(' ')}
        name={name}
        id={id}
        placeholder="Search"
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        value={value || ''}
      />
    </div>
  );
}
