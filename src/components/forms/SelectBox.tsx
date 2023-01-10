import { ChangeEventHandler } from 'react';

interface SelectBoxProps {
  id: string;
  label?: string;
  placeholder: string;
  helpText?: string;
  disabled: boolean;
  size?: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  value: any;
  defaultValue?: any;
  options: any[]; // options는 무조건 object[]로만 받음
  keyProperty: string;
  valueProperty: string;
}

// 목록을 선택할 수 있는 박스
export default function SelectBox(props: SelectBoxProps) {
  const { id, label, placeholder, helpText, disabled, size, handleChange, value, defaultValue, options, keyProperty, valueProperty } =
    props;

  //props의 key value property 값을 박스에 맞도록 수정하는 함수
  //이름 짓기 귀찮아서 list로 대충 해놨는데 정작 list가 아니라 함수임을 참고
  //물론 출력값은 list가 맞기 때문에 큰 문제는 X
  const list = () => {
    return options.map((option, index) => {
      return (
        <option key={`${id}_${index}`} value={option[valueProperty]}>
          {option[keyProperty]}
        </option>
      );
    });
  };

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      ) : null}
      <select
        className={['form-select', 'border-dark', size ? `form-select-${size}` : ''].join(' ')}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        name={valueProperty}
      >
        {list()}
      </select>
      <div className="invalid-feedback">{helpText}</div>
    </div>
  );
}
