import { useEffect, useState } from "react";
import caver from "../../configs/Caver";
import useKlaytn from "../../hooks/useKlaytn";
import { bytecode, testABI } from './asdf';

export function Test() {
	const [count, setCount] = useState(100);
	const [address, privateKey] = [process.env.address, process.env.privateKey];
	const { getBalance } = useKlaytn();

	let keyring = caver.wallet.getKeyring(address);
	if (!caver.wallet.isExisted(address)) keyring = caver.wallet.newKeyring(address, privateKey);
	else keyring = caver.wallet.updateKeyring(keyring);

	const handleDeploy = async () => {
		console.log(keyring);

		const deployTransaction = caver.transaction.smartContractDeploy.create(
			{
				from: keyring.address,
				input: caver.abi.encodeContractDeploy(testABI, bytecode),
				gas: 3000000,
			}
		);

		await caver.wallet.sign(keyring.address, deployTransaction);

		console.log(await caver.validator.validateTransaction(deployTransaction));

		const rlpEncoded = deployTransaction.getRLPEncoding();
		console.log(`RLP-encoded string: ${rlpEncoded}`);

		const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded);

		console.log(receipt);

		console.log("Deploy is successfully finished");
	}

	const handleExecution = async () => {
		const executionTransaction = caver.transaction.smartContractExecution.create(
			{
				from: keyring.address,
				to: "0x2aef1fbd8c4db2db87540958db97d824678475aa",
				input: caver.abi.encodeContractDeploy(testABI, bytecode),
				gas: 3000000,
			}
		);
		await caver.wallet.sign(keyring.address, executionTransaction);

		console.log(await caver.validator.validateTransaction(executionTransaction));

		const rlpEncoded = executionTransaction.getRLPEncoding();
		console.log(`RLP-encoded string: ${rlpEncoded}`);

		const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded);

		console.log(receipt);

		console.log("Execution is successfully finished");
	}

	useEffect(() => {
		(async () => {
			setCount(await getBalance(address));
		})();
	}, [])

	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 text-center mb-3">카운팅 스타 {count}</div>
				<button
					type="button"
					className="col-6 btn btn-primary btn-lg"
					onClick={() => { handleDeploy(); }}>
					Deploy
				</button>
				<button
					type="button"
					className="col-6 btn btn-danger btn-lg"
					onClick={() => { handleExecution(); }}>
					Execution
				</button>
			</div>
		</div>
	);
}
