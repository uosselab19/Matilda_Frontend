import { useEffect, useState } from "react";
import { caver } from "../../configs/Caver";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Test() {
	const [count] = useState(-1);
	const [address, privateKey] = [process.env.address, process.env.privateKey];

	const keyring = caver.wallet.newKeyring(address, privateKey);
	caver.wallet.updateKeyring(keyring);

	useEffect(() => {
		(async () => {
		})();
	}, [])

	const handleBlob = async () => {
		const url = "./assets/model/matilda/scene.gltf";
		const loader = new GLTFLoader();
		loader.load(
			url,
			// called when the resource is loaded
			async (gltf) => {
				const buffer = await gltf.parser.loadBuffer(0);
				const blob = new Blob([buffer]);
				console.log(blob);
			}
		);
	}

	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 text-center mb-3">카운팅 스타 {count}</div>
				<button
					type="button"
					className="col-4 btn btn-primary btn-lg"
					onClick={() => { handleBlob(); }}>
					blob
				</button>
				<button
					type="button"
					className="col-4 btn btn-success btn-lg"
					onClick={() => { ; }}>
					minus
				</button>
				<button
					type="button"
					className="col-4 btn btn-danger btn-lg"
					onClick={() => { ; }}>
					check
				</button>
			</div>
		</div>
	);
}
