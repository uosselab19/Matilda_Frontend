import useForm from "../../hooks/useForm";
import TextBox from "../forms/TextBox";
import useKlaytn from "../../hooks/useKlaytn";
import { caver } from "../../configs/Caver";
import { useEffect } from "react";

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
	const { handleChange, handleClick, values, errors } = useForm(callback, validate);
	const { count1, check, addWallet, deleteWallet, printWallet, mint, checkInterface, isMinter, setForSale, removeTokenOnSale, buyNFT, test } = useKlaytn();
	useEffect(() => {
		(async () => {
			addWallet(process.env.address, process.env.privateKey)
			console.log(" hello world!")
		})()
	},[]);

	const getTransactionInfo = async () => {
		console.log(await caver.rpc.klay.getTransactionByHash(values["address1"]))
	}
	
	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 text-center mb-3">address1 balance: {count1}</div>
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
						handleFunction={() => {mint(values['address1'], values['tokenID'], values['tokenURI'])}}
						title={"mint"} />
					<TestButton
						color={'info'}
						disabled={false}
						handleFunction={() => {isMinter(values['address1'])}}
						title={"isMinter"} />
					<TestButton
						color={'light'}
						disabled={false}
						handleFunction={() => {
							if(values['address1'])
								checkInterface(values['address1'], false);
							else checkInterface("", true);
						}}
						title={"checkInterface"} />
					<TestButton
						color={'dark'}
						disabled={false}
						handleFunction={check}
						title={"renewBalance"} />
				</div>
				<div className="col-12 w-100 btn-group">
					<TestButton
						color={'primary'}
						disabled={false}
						handleFunction={() => {setForSale(values['address1'], values['tokenID'], values['price'])}}
						title={"setForSale"} />
					<TestButton
						color={'secondary'}
						disabled={false}
						handleFunction={() => {removeTokenOnSale(values['address1'], values['tokenID'])}}
						title={"removeTokenOnSale"} />
					<TestButton
						color={'success'}
						disabled={false}
						handleFunction={() => {buyNFT(values['address1'], values['tokenID'], values['price'])}}
						title={"buyNFT"} />
					<TestButton
						color={'danger'}
						disabled={false}
						handleFunction={() => {test()}}
						title={"test"} />
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
							name="tokenID"
							id="tokenID"
							label="tokenID"
							type="text"
							placeholder="tokenID"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['tokenID']}
							error={errors['tokenID']} />
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
					<div className="col-6">
						<TextBox
							name="price"
							id="price"
							label="price"
							type="text"
							placeholder="price"
							disabled={false}
							readonly={false}
							handleChange={handleChange}
							handleClick={handleClick}
							value={values['price']}
							error={errors['price']} />
					</div>
				</div>
			</div>
		</div>
	);
}
