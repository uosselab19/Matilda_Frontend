import { useEffect, useState } from "react";
import useKlaytn from "../../hooks/useKlaytn";

export function Test() {
	const [count, setCount] = useState(0);
	const [address, privateKey] = [process.env.address,process.env.privateKey];
	const { getBalance, getWallet, mintNFT } = useKlaytn();

	const handlePlus = () => {
		console.log(getWallet(privateKey));
	}

	const handleMinus = () => {
		console.log(mintNFT([],address, privateKey, "민둘맨둘한NFT", "민둘맨둘", "DR", "크르릉..."));
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
					onClick={() => { handlePlus(); }}>
					PLUS
				</button>
				<button
					type="button"
					className="col-6 btn btn-danger btn-lg"
					onClick={() => { handleMinus(); }}>
					MINUS
				</button>
			</div>
		</div>
	);
}
