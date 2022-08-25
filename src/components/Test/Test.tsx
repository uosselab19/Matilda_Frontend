import { useEffect, useState } from "react";
import caver from "../../configs/Caver";
import useKlaytn from "../../hooks/useKlaytn";
import { bytecode, testABI } from './asdf';

export function Test() {
	const [count1, setCount1] = useState(-1);
	const [count2, setCount2] = useState(-1);
	const [count3, setCount3] = useState(-1);
	const [add1, pk1] = [process.env.add1, process.env.pk1];
	const [add2, pk2] = [process.env.add2, process.env.pk2];
	const { getBalance } = useKlaytn();
	const contractAdd = '0xFAEFded1bA5f6b5a092Df08821a95dbA52f8a4f4'

	let keyring1 = caver.wallet.getKeyring(add1);
	if (!caver.wallet.isExisted(add1)) keyring1 = caver.wallet.newKeyring(add1, pk1);
	else keyring1 = caver.wallet.updateKeyring(keyring1);

	let keyring2 = caver.wallet.getKeyring(add2);
	if (!caver.wallet.isExisted(add2)) keyring2 = caver.wallet.newKeyring(add2, pk2);
	else keyring2 = caver.wallet.updateKeyring(keyring2);

	console.log(caver.wallet);
	
	const handleDeploy = async () => {
		const contract = caver.contract.create(testABI)
		
		const myContract = await contract.deploy(
			{
				from: keyring1.address,
				gas: 3000000,
			},
			bytecode
		)

		console.log(`Deployed Smart Contract: ${myContract.options.address}`)

		console.log("Deploy is successfully finished");
	}

	const plus = async () => {
		const contract = new caver.contract(testABI, contractAdd)

		const newContract = await contract.methods.plus().send(
			{
				from: keyring1.address,
				gas: 3000000
			}
		)
		console.log(newContract);

		console.log("Execution is successfully finished");
	}

	const minus = async () => {
		const contract = new caver.contract(testABI, contractAdd)

		const newContract = await contract.methods.minus().send(
			{
				from: keyring1.address,
				gas: 3000000
			}
		)
		console.log(newContract);

		console.log("Execution is successfully finished");
	}

	const check = async () => {
		const contract = new caver.contract(testABI, contractAdd)

		setCount1(await getBalance(add1));
		setCount2(await getBalance(add2));
		setCount3(await contract.methods.getCount().call());

		console.log("Call is successfully finished");
	}

	useEffect(() => {
		(async () => {
			setCount1(await getBalance(add1));
			setCount2(await getBalance(add2));
		})();
	}, [])

	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 text-center mb-3">add1 balance: {count1}</div>
				<div className="col-12 text-center mb-3">add2 balance: {count2}</div>
				<div className="col-12 text-center mb-3">카운팅 스타 {count3}</div>
				<button
					type="button"
					className="col-6 btn btn-primary btn-lg"
					onClick={() => { handleDeploy(); }}>
					Deploy
				</button>
				<button
					type="button"
					className="col-6 btn btn-danger btn-lg"
					onClick={() => { plus(); }}>
					plus
				</button>
				<button
					type="button"
					className="col-6 btn btn-danger btn-lg"
					onClick={() => { minus(); }}>
					minus
				</button>
				<button
					type="button"
					className="col-6 btn btn-danger btn-lg"
					onClick={() => { check(); }}>
					check
				</button>
			</div>
		</div>
	);
}
