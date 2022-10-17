import { caver, mtt, wallet } from '../configs/Caver';

const _peb2Klay = async (peb: string) => {
    return caver.utils.convertFromPeb(peb, 'KLAY');
};

const _klay2Peb = async (klay: string) => {
	return caver.utils.convertToPeb(klay, "KLAY");
}

export const createAccount = () => {
	const [address]=caver.wallet.generate(1, caver.utils.randomHex(32));
	const keyring=caver.wallet.getKeyring(address)
	const privateKey=Object.entries(keyring)[1][1].privateKey;
	updateKeyring(address, privateKey);
	return {address, privateKey};
}

export const removeKeyring = (address: string) => {
	if (wallet.isExisted(address)) wallet.remove(address);
}

export const updateKeyring = (address: string, privateKey: string) => {
	removeKeyring(address);
	return wallet.newKeyring(address, privateKey);
}

export const getBalance = async (address: string) => {
	return _peb2Klay(await caver.rpc.klay.getBalance(address));
}

export const mint = async (minter: string, tokenURI:string) => {
	return await mtt.methods.mintNFT(minter, tokenURI).send({ from: process.env.address });;
};

export const setForSale = async (address: string, tokenID: Number, price: Number) => {
	const value = await _klay2Peb(price.toString());
	return await mtt.methods.setForSale(tokenID, value).send({ from: address });
};

export const unsetForSale = async (address: string, tokenID: Number) => {
	return await mtt.methods.unsetForSale(tokenID).send({ from: address });
};

export const buyNFT = async (address: string, tokenID: Number, price: Number) => {
	const _price = await _klay2Peb(price.toString());
	return await mtt.methods.buyNFT(tokenID).send({ from: address, value: _price });
};

export const getOnSale = async () => {
	return await mtt.methods.getOnSale().call({ from: process.env.address });
};

export const getOnSaleInfo = async (tokenID: Number) => {
	return await mtt.methods.getOnSaleInfo(tokenID).call({ from: process.env.address });
};