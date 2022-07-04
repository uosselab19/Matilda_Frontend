import { ChangeEventHandler } from "react"

interface SelectBoxProps {
	id: string
	label: string
	type?: string
	placeholder: string
	helpText?: string
	disabled: boolean
	handleChange: ChangeEventHandler<HTMLInputElement>
	value: any
	optionList: Array<any>
}

export default function SelectBox(props: SelectBoxProps) {
	const { id, label, type, placeholder, helpText, disabled, handleChange, value, optionList } = props
	const list = () => {
		return optionList.map((e) => {
			return <option value={e} />
		});
	}

	return (
		<div>
			<label htmlFor={id} className="form-label">{label}</label>
			<input type={type || "text"} id={id} placeholder={placeholder} disabled={disabled}
				onChange={handleChange} value={value} list="datalistOptions">
			</input>
			<datalist id="datalistOptions">
				{list()}
			</datalist>
			<div className="invalid-feedback">{helpText}</div>
		</div>
	);
}

/*
<SelectBox
	id="test"
	label="test"
	placeholder="nice21"
	helpText="Please enter a valid TEST"
	disabled={false}
	handleChange={handleInputTEST}
	value={inputTEST}
	optionList={optionList}
	/>
*/