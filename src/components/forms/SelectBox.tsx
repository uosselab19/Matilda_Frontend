import React from 'react';
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
  options: any[]; // options는 무조건 object[]로만 받음
  keyProperty: string;
  valueProperty: string;
}

export default function SelectBox(props: SelectBoxProps) {
  const { id, label, placeholder, helpText, disabled, size, handleChange, value, options, keyProperty, valueProperty } = props;

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
      {label?<label htmlFor={id} className="form-label">{label}</label>:null}
      <select className={["form-select", 'border-dark', (size)?`form-select-${size}`:""].join(' ')}
        id={id} placeholder={placeholder} disabled={disabled} onChange={handleChange} value={value} name={valueProperty}>
        {list()}
      </select>
      <div className="invalid-feedback">{helpText}</div>
    </div>
  );
}
