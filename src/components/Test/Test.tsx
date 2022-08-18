import { useEffect, useState } from "react";
import { cav } from './Caver.js'

export function Test() {
	const [count, setCount] = useState(0);

	const handlePlus = () => {
		setCount(count + 1);
	}

	const handleMinus = () => {
		setCount(count - 1);
	}

	useEffect(() => {
		(async () => {
				setCount(await cav.klay.getBlockNumber());
		})();
	}, [])

	// const componentWillMount = () => {
	// 	/**
	// 	 * sessionStorage는 브라우저 탭이 닫히기 전까지 데이터를 저장하는 인터넷 브라우저의 기능입니다.
	// 	 */
	// 	const walletFromSession = sessionStorage.getItem('walletInstance')

	// 	// 'walletInstance'에 값이 있으면 caver 지갑에 추가합니다.
	// 	if (walletFromSession) {
	// 		try {
	// 			cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
	// 		} catch (e) {
	// 			// sessionStorage에 있는 값이 유효하지 않은 지갑 인스턴스이면 sessionStorage에서 제거합니다.
	// 			sessionStorage.removeItem('walletInstance')
	// 		}
	// 	}
	// }

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