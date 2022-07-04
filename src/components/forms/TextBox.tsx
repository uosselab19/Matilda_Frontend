import { ChangeEventHandler } from "react"

interface TextBoxProps {
	id: string
	label: string
	type?: string
	placeholder: string
	helpText?: string
	disabled: boolean
	readonly: boolean
	handleChange: ChangeEventHandler<HTMLInputElement>
	value: any
}

export default function TextBox(props: TextBoxProps) {

	const { id, label, type, placeholder, helpText, disabled, readonly, handleChange, value } = props

	const boxClass = readonly ? "form-control-plaintext" : "form-control"

	return (
		<div className="mb-3">
			<label htmlFor={id} className="form-label">{label}</label>
			<input type={type || "text"} className={[boxClass, "border-dark"].join(" ")} id={id} placeholder={placeholder} disabled={disabled} readOnly={readonly}
				onChange={handleChange} value={value} />
			<div className="invalid-feedback">{helpText}</div>
		</div>
	);
}

/*
<TextBox
	id="id"
	label="ID"
	type="text"
	placeholder="nice"
	helpText="Please enter a valid ID"
	disabled={false}
	readonly={false}
	handleChange={handleInputID}
	value={inputID}/>
*/