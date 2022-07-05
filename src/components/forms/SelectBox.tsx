import React from 'react';
import { ChangeEventHandler } from 'react';

interface SelectBoxProps {
  id: string;
  label: string;
  placeholder: string;
  helpText?: string;
  disabled: boolean;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  value: any;
  options: any[]; // options는 무조건 object[]로만 받음
  keyProperty: string;
  valueProperty: string;
}

export default function SelectBox(props: SelectBoxProps) {
  const { id, label, placeholder, helpText, disabled, handleChange, value, options, keyProperty, valueProperty } = props;

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
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select className='form-select'
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        value={value}
      >{list()}
      </select>
      <div className="invalid-feedback">{helpText}</div>
    </div>
  );
}
