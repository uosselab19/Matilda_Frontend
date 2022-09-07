import { useState, useEffect } from 'react';
import { caver, wallet } from '../configs/Caver';
// import { getCID } from '../services/imageService';
// import { alertError } from '../utils/alertUtil';

export default function useKlaytn() {
  const [count1, setCount1] = useState('-1');

  const mtn = new caver.kct.kip17('0x6249368B27D8245D0Ba58A7fc7B7989166dD5eCa');

  useEffect(() => {
    (async () => {
      check();
    })();
  }, []);

  const peb2Klay = async (peb: string) => {
    return caver.utils.convertFromPeb(peb, 'KLAY');
  };

  const getBalance = async (address: string) => {
    return peb2Klay(await caver.rpc.klay.getBalance(address));
  };

  const check = async () => {
    setCount1(await getBalance(process.env.address));
  };
/*
  const deployKIP17 = async () => {
    caver.kct.kip17
      .deploy(
        {
          name: 'Matilda Test NFT',
          symbol: 'MTN'
        },
        address
      )
      .then(console.log);
  };

  const getList = async () => {
    const mtn = new caver.kct.kip17('0x6249368B27D8245D0Ba58A7fc7B7989166dD5eCa');
    mtn.options.from = address;
    const res = await mtn.safeTransferFrom(address, '0x64469e021f23353a3e0757bc4d211a6f9756d37a', 44, 0x753);
    console.log(res);
  };

  const mintNFTfunc = async () => {
    const mtn = new caver.kct.kip17('0x6249368B27D8245D0Ba58A7fc7B7989166dD5eCa');
    mtn.options.from = address;
    const res = await mtn.mintWithTokenURI(address, 44, 'im not fine');
    console.log(res);
  };

  const mintNFT = async () => {
    // WAS로부터 cid 생성 요청 및 불러옴
    const { data, error } = await getCID({ num: 48 });

    if (error) {
      alertError('error', 'getCID Error');
      console.log(error);
    }

    const cid = data;

    // 초기 발행자(운영자)에 의해 mint 실행
    const totalNum = await mtn.totalSupply();
    mtn.mintWithTokenURI(address, totalNum.plus(1), cid);

    // 사용자에게 NFT 소유권 전달
    mtn.safeTransferFrom(address, user, totalNum.plus(1));
  };

  const payment = async (from_: string, to_: string, value_: string) => {
    return await caver.transaction.valueTransfer.create({
      from: from_,
      to: to_,
      value: value_,
      gas: 1000000000
    });
  };
*/
  const addWallet = async (address: string, privateKey: string) => {
      if(!wallet.isExisted(address)) {
        wallet.newKeyring(address, privateKey)
        console.log("wallet에 keyRing을 추가하였습니다.")
        printWallet()
      }
      else console.log("이미 존재하는 keyRing입니다.")
    }
  
  const deleteWallet = async (address: string) => {
    if(wallet.isExisted(address)) {
      wallet.remove(address)
      console.log("wallet에서 keyRing을 제거하였습니다.")
      printWallet()
    }
    else console.log("존재하지 않는 address입니다.")
  }
  
  const printWallet = async () => {
    console.log(wallet)
  }
  
  const mint = async (minter: string, tokenID: string, tokenURI: string) => {
    const result = await mtn.mintWithTokenURI(minter, tokenID, tokenURI, {from: process.env.address})
    console.log("mint에 성공하였습니다.")
    console.log(result)
  }
  
  const transfer = async (minter: string, tokenID: string, tokenURI: string) => {
    
  }

  const isMinter = async (address: string) => {
    const res = await mtn.isMinter(address)
    console.log(res)
  }

  return { count1, addWallet, deleteWallet, printWallet, mint, transfer, isMinter };
}
