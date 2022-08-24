import { Contract } from "caver-js";
import caver from "../configs/Caver";

export default function useKlaytn() {
	const createPrivateKey = () => {
		return caver.klay.accounts.create();
	}

	const pkToAddress = (pk: string) => {
		return caver.klay.accounts.privateKeyToAccount(pk);
	}

	const getBalance = async (address: string) => {
		return Number(await caver.klay.getBalance(address)) / 10 ** 18
	}

	const clearWallet = () => {
		caver.klay.accounts.wallet.clear();
	}

	const getWallet = (pk: string) => {
		caver.klay.accounts.wallet.clear();
		const walletInstance = caver.klay.accounts.privateKeyToAccount(pk);
		caver.klay.accounts.wallet.add(walletInstance);

		return walletInstance;
	}

	const mintNFT = (
    abi:any,
		address:any,
		pk: any,
    title: any,
    author: any,
    category: any,
    description: any
  ) => {
		const contract = new Contract(abi, address);
    const sender = getWallet(pk); //로그인한 계정

    caver.klay.accounts
      .signTransaction(
        {
          type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
          from: sender.address,
          data: contract.methods
            .mintNFT(
              title,
              author,
              category,
              description
            )
            .encodeABI(),
          gas: "200000000",
          value: caver.utils.toPeb("0", "KLAY"),
        },
        sender.privateKey
      ).then((data) => {
        if (!data) {
          alert("블록체인 등록 실패");
          return;
        }
      }).catch((error) => {
        console.log("useKlaytn : error1 : " + error);
        alert("useKlaytn : error1 : " + error);
        return;
      });
  }

	return {
		createPrivateKey,
		pkToAddress, 
		getBalance,
		getWallet,
		clearWallet,
		mintNFT,
	};
}