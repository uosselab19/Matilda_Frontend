import useForm from "../../hooks/useForm";
import SubmitButton from "../forms/SubmitButton";
import TextBox from "../forms/TextBox";
import useKlaytn from "../../hooks/useKlaytn";
import { caver } from "../../configs/Caver";

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
			className={`col-3 btn btn-${color} btn-lg`}
			onClick={() => { handleFunction() }}>
			{title}
		</button>
	);
}

const callback = async (values: any) => {
	const address1 = values["address1"];
	const address2 = values["address2"];
	console.log(address1);
	console.log(address2);
}

function validate(values: any) {
	return {};
}

export function Test() {
	const { handleChange, handleClick, handleSubmit, values, errors } = useForm(callback, validate);
	const { count1, addWallet, deleteWallet, printWallet, mint, transfer, isMinter } = useKlaytn();
	
	const getTransactionInfo = async () => {
		console.log(await caver.rpc.klay.getTransactionByHash(values["address1"]))
	}
	addWallet(process.env.address, process.env.privateKey)
	
	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 text-center mb-3">address balance: {count1}</div>
				<div className="col-12 w-100 btn-group">
					<TestButton
						color={'primary'}
						disabled={false}
						handleFunction={getTransactionInfo}
						title={"getTransactionInfo"} />
					<TestButton
						color={'secondary'}
						disabled={false}
						handleFunction={() => {addWallet(values['address1'], values['privateKey1'])}}
						title={"addWallet"} />
					<TestButton
						color={'success'}
						disabled={false}
						handleFunction={() => {deleteWallet(values['address1'])}}
						title={"deleteWallet"} />
					<TestButton
						color={'danger'}
						disabled={false}
						handleFunction={() => {printWallet()}}
						title={"printWallet"} />
				</div>
				<div className="col-12 w-100 btn-group">
					<TestButton
						color={'warning'}
						disabled={false}
						handleFunction={() => {mint(values['address1'], values['num'], values['tokenURI'])}}
						title={"mint"} />
					<TestButton
						color={'info'}
						disabled={false}
						handleFunction={() => {isMinter(values['address1'])}}
						title={"isMinter"} />
					<TestButton
						color={'light'}
						disabled={false}
						handleFunction={() => {transfer(values['address1'], values['num'], values['tokenURI'])}}
						title={"transfer"} />
					<TestButton
						color={'dark'}
						disabled={false}
						handleFunction={transfer}
						title={"transfer"} />
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
							name="privateKey1"
							id="privateKey1"
							label="privateKey1"
							type="text"
							placeholder="privateKey1"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['privateKey1']}
							error={errors['privateKey1']} />
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
					<div className="col-6">
						<TextBox
							name="num"
							id="num"
							label="num"
							type="text"
							placeholder="num"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['num']}
							error={errors['num']} />
					</div>
					<div className="col-6">
						<TextBox
							name="tokenURI"
							id="tokenURI"
							label="tokenURI"
							type="text"
							placeholder="tokenURI"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['tokenURI']}
							error={errors['tokenURI']} />
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
