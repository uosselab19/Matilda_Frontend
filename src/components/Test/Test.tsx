import { useEffect, useState } from "react";
import { apiClient } from "../../configs/apiClient";
import { caver } from "../../configs/Caver";
import { interceptorHandledError } from "../../configs/Interceptor";
import { getS3ImgUrl } from "../../configs/S3";
import { UserInfo } from "../../types/Member";
import { alertError, alertModal, alertSuccess } from "../../utils/alertUtil";
import { getUserInfo } from "../../utils/cookieUtil";

export function Test() {
	const [count] = useState(-1);
	const [address, privateKey] = [process.env.address, process.env.privateKey];
	const [address2, privateKey2] = [process.env.address2 as string, process.env.privateKey2 as string];
	const contractAddress = "0x0aae7b18f64b0eeaf9b7a0d5fd9612d655569526";

	const wallet = caver.wallet;
	const keyring = wallet.newKeyring(address, privateKey);
	const keyring2 = wallet.newKeyring(address2, privateKey2);

	wallet.updateKeyring(keyring);
	wallet.updateKeyring(keyring2);

	useEffect(() => {
		(async () => {
		})();
	}, []);

	const handleObjURL = async () => {
		const getItem = async (itemNum: number) => {
			let [data, error] = [undefined, undefined] as any;

			try {
				const result = await apiClient.get(`/objects/auth/objUrl/${itemNum}`);
				data = result?.data;
			} catch (err) {
				error = err?.response || err?.message;
			}

			return { data, error };
		}
		const { data, error } = await getItem(43);
		if (error) {
			console.log(error);
			alertError("error", "objURL error");
		}

		console.log(data);
	}

	const handleSignin = async () => {
		const validateToken = async (cookie: UserInfo) => {
			let [data, error] = [undefined, undefined] as any;

			try {
				const result = await apiClient.post('/security/validCheck', { headers: { "X-AUTH-TOKEN": cookie.accessToken } })
				data = result?.data;
			} catch (err) {
				error = err;
				console.log(error);
				if (error === interceptorHandledError) console.log("This error is already handled by interceptor");
			}

			return { data, error };
		}

		const { data, error } = await validateToken(getUserInfo());
		if (!error) alertSuccess("validateToken Success", data);
	}

	const handleURL = async () => {
		const imgUrl = getS3ImgUrl("items/img/TOP/1662095517_KakaoTalk_20220802_131803767.jpg");
		console.log(imgUrl);
		alertModal('변환 성공', '변환이 이뤄진 모습을 확인해보세요!', imgUrl, 'Completely Converted Image');
	}

	const handleMint = async () => {
		const mtd = new caver.kct.kip17(contractAddress);
		mtd.options.from=address;
		mtd.options.gas=8500000;
		mtd.setWallet(wallet);
		console.log(mtd);
		console.log(await mtd.isMinter(address));
		console.log(await mtd.detectInterface());
		console.log(await mtd.mintWithTokenURI(address, 50, "mindul test"));
		console.log("asdf");
	}

	return (
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{ height: "600px" }}>
			<div className="row">
				<div className="col-12 text-center mb-3">카운팅 스타 {count}</div>
				<button
					type="button"
					className="col-6 btn btn-primary btn-lg"
					onClick={() => { handleObjURL(); }}>
					ObjURL
				</button>
				<button
					type="button"
					className="col-6 btn btn-danger btn-lg"
					onClick={() => { handleSignin(); }}>
					Signin
				</button>
				<button
					type="button"
					className="col-6 btn btn-success btn-lg"
					onClick={() => { handleURL(); }}>
					URL
				</button>
				<button
					type="button"
					className="col-6 btn btn-secondary btn-lg"
					onClick={() => { handleMint(); }}>
					Mint
				</button>
			</div>
		</div>
	);
}
