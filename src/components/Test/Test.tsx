import { useEffect, useState } from "react";
import { caver } from "../../configs/Caver";

export function Test() {
	const [count] = useState(-1);
	const [address, privateKey] = [process.env.address, process.env.privateKey];

	let keyring = caver.wallet.getKeyring(address);
	if (!caver.wallet.isExisted(address)) keyring = caver.wallet.newKeyring(address, privateKey);
	else keyring = caver.wallet.updateKeyring(keyring);

	console.log(caver.wallet);

	// const plus = async () => {
	// 	const newContract = await contract.methods.plus().send(
	// 		{
	// 			from: keyring.address,
	// 			gas: 3000000
	// 		}
	// 	)
	// 	console.log(newContract);

	// 	console.log("Execution is successfully finished");
	// }

	// const minus = async () => {
	// 	const newContract = await contract.methods.minus().send(
	// 		{
	// 			from: keyring.address,
	// 			gas: 3000000
	// 		}
	// 	)
	// 	console.log(newContract);

	// 	console.log("Execution is successfully finished");
	// }

	// const check = async () => {
	// 	setCount(await contract.methods.getCount().call());

	// 	console.log("Call is successfully finished");
	// }

	useEffect(() => {
		(async () => {
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
					className="col-4 btn btn-primary btn-lg"
					onClick={() => { ; }}>
					plus
				</button>
				<button
					type="button"
					className="col-4 btn btn-success btn-lg"
					onClick={() => { ; }}>
					minus
				</button>
				<button
					type="button"
					className="col=4 btn btn-danger btn-lg"
					onClick={() => { ; }}>
					check
				</button>
			</div>
		</div>
	);
}
