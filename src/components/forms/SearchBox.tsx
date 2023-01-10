import { ChangeEventHandler } from 'react';

interface SearchBoxProps {
  id: string;
  name: string;
  disabled: boolean;
  readonly: boolean;
  size?: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  value: any;
  error?: string;
}

//검색을 위한 박스
//디자인에 문제가 있어서 고쳐야 하는데 안 고침
//코드 기능에는 문제가 없으니 구조만 참고하세요
export default function SearchBox(props: SearchBoxProps) {
  const { id, name, disabled, readonly, size, handleChange, value, error } = props;

  const boxClass = readonly ? 'form-control-plaintext' : 'form-control';

  return (
    <div>
      <input
        type="search"
        className={[boxClass, 'border-dark', size ? `form-control-${size}` : '', `input ${error && 'is-danger'}`].join(' ')}
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
