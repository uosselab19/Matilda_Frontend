import { useState, useEffect } from 'react';
import { caver, wallet } from '../configs/Caver';
import MatildaToken from './MatildaToken.json';
import { AbiItem } from 'caver-js'; 

export default function useKlaytn() {
    const { abi, contractAddress } = MatildaToken;
    const [count1, setCount1] = useState('-1');

    const admin = process.env.address;

    const mtn = new caver.kct.kip17(contractAddress);
    const mtt = new caver.contract(abi as AbiItem[], contractAddress);

    useEffect(() => {
        (async () => {
        check();
        })();
    }, []);

    const _peb2Klay = async (peb: string) => {
        return caver.utils.convertFromPeb(peb, 'KLAY');
    };

    const _klay2Peb = async (klay: string) => {
        return caver.utils.convertToPeb(klay, "KLAY")
    }

    const _getBalance = async (address: string) => {
        return _peb2Klay(await caver.rpc.klay.getBalance(address));
    };

    const check = async () => {
<<<<<<< HEAD
        setCount1(await getBalance(process.env.address));
=======
        setCount1(await _getBalance(process.env.address));
        setCount2(await _getBalance(process.env.address2));
        setCount3(await _getBalance(process.env.address3));
>>>>>>> 369f113b133be4218961a983a191c3b8c5c688f2
        console.log('잔액을 갱신하였습니다.');
    };

    const addWallet = async (address: string, privateKey: string) => {
        if (!wallet.isExisted(address)) {
        wallet.newKeyring(address, privateKey);
        console.log('wallet에 keyRing을 추가하였습니다.');
        printWallet();
        } else console.log('이미 존재하는 keyRing입니다.');
    };

    const deleteWallet = async (address: string) => {
        if (wallet.isExisted(address)) {
        wallet.remove(address);
        console.log('wallet에서 keyRing을 제거하였습니다.');
        printWallet();
        } else console.log('존재하지 않는 address입니다.');
    };

    const printWallet = async () => {
        console.log(wallet);
    };

    const mint = async (minter: string, tokenID: string, tokenURI: string) => {
        // const result = await mtn.mintWithTokenURI(minter, tokenID, tokenURI, { from: process.env.address });
        const result = await mtt.methods.mintNFT(minter, tokenURI).send({from: admin, gas: 150000000});
        console.log('mint에 성공하였습니다.');
        console.log(result);
    };

    const isMinter = async (address: string) => {
        const res = await mtn.isMinter(address);
        console.log(res);
    };

    const checkInterface = async (address: string, option: boolean) => {
        if (option) {
            const result = await mtn.detectInterface();
            console.log(result);
        }
        else {
            const result = await caver.kct.kip17.detectInterface(address);
            console.log(result);
        }
    };

    const setForSale = async (address: string, tokenID: Number, price: Number) => {
        const value = await _klay2Peb(price.toString());
        const res = await mtt.methods.setForSale(tokenID, value).send({from: address, gas: 150000000});
        console.log(res);
    };

    const unsetForSale = async (address: string, tokenID: Number) => {
        const res = await mtt.methods.unsetForSale(tokenID).send({from: address, gas: 150000000});
        console.log(res);
    };

    const buyNFT = async (address: string, tokenID: Number, _price: Number) => {
        const price = await _klay2Peb(_price.toString())
        const res = await mtt.methods.buyNFT(tokenID).send({from: address, gas: 150000000, value: price});
        console.log(res);
    };

    const test = async () => {
        const role = '0x00'
        const res = await mtt.methods.getRoleAdmin(role).call({from: admin, gas: 150000000})
        console.log(res);
    };

    const getOnSale = async () => {
        const res = await mtt.methods.getOnSale().call({from: admin, gas: 150000000})
        console.log(res);
    };

    const getOnSaleInfo = async (tokenID: Number) => {
        const res = await mtt.methods.getOnSaleInfo(tokenID).call({from: admin, gas: 150000000})
        console.log(res);
    };

    const addMinter = async (address: string) => {
        // const role = '0x00'
        // const res = await mtt.methods.getRoleMember(role, 0).call({from: admin, gas: 150000000})
        const res = await mtn.addMinter(admin, {from: admin, gas: 150000000})
        console.log(res)
    }

    return {
        count1,
        check,
        addWallet,
        deleteWallet,
        printWallet,
        mint,
        checkInterface,
        isMinter,
        setForSale,
        unsetForSale,
        buyNFT,
        test,
        getOnSale,
		getOnSaleInfo,
        addMinter
    };
}
