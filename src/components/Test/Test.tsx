import useForm from "../../hooks/useForm";
import SubmitButton from "../forms/SubmitButton";
import TextBox from "../forms/TextBox";

function validate(values: any) {
	return {};
}

interface TestButtonProps {
	color: string;
	disabled: boolean;
	handleFunction: Function;
	title: string;
}

const TestButton = (props: TestButtonProps) => {
	const { color, disabled, handleFunction, title } = props;
	return (
		<button
			type="button"
			disabled={disabled}
			className={`btn btn-${color} btn-lg`}
			onClick={() => { handleFunction() }}>
			{title}
		</button>
	);
}

export function Test() {
	const callback = async (values: any) => {
		const address1 = values["address1"];
		const address2 = values["address2"];
		console.log(address1);
		console.log(address2);
	}
	const handleFunc = () => {
		
	}

	const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);
	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 w-100 btn-group">
					<TestButton
						color={'secondary'}
						disabled={true}
						handleFunction={handleFunc}
						title={"ObjURL"} />
					<TestButton
						color={'secondary'}
						disabled={true}
						handleFunction={handleFunc}
						title={"Signin"} />
					<TestButton
						color={'secondary'}
						disabled={true}
						handleFunction={handleFunc}
						title={"URL"} />
				</div>
				<div className="col-12 row">
					<div className="col-6">
						<TextBox
							name="address1"
							id="address1"
							label="address1"
							type="text"
							placeholder="address1"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['address1']}
							error={errors['address1']} />
					</div>
					<div className="col-6">
						<TextBox
							name="address2"
							id="address2"
							label="address2"
							type="text"
							placeholder="address2"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['address2']}
							error={errors['address2']} />
					</div>
					<SubmitButton
						title={"Test"}
						handleSubmit={handleSubmit}
						values={values}
						errors={errors}
						keys={["address1", "address2"]}
						allRequired={false} />
				</div>
			</div>
		</div>
	);
}
