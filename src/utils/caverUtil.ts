import { caver, mtt, wallet } from '../configs/Caver';

// peb to Klay 단위변환 함수
const _peb2Klay = async (peb: string) => {
  return caver.utils.convertFromPeb(peb, 'KLAY');
};

// Klay to peb 단위변환 함수
const _klay2Peb = async (klay: string) => {
  return caver.utils.convertToPeb(klay, 'KLAY');
};

// 클레이튼 지갑 생성을 위한 함수
export const createAccount = () => {
  const [address] = caver.wallet.generate(1, caver.utils.randomHex(32));
  const keyring = caver.wallet.getKeyring(address);
  const privateKey = Object.entries(keyring)[1][1].privateKey;
  updateKeyring(address, privateKey);
  return { address, privateKey };
};

// 프론트엔드에서 지갑 정보를 갱신하기 위해 사용하는 함수
export const removeKeyring =async (address: string) => {
  if (wallet.isExisted(address)) wallet.remove(address);
};

// 프론트엔드에서 지갑 정보를 추가하기 사용하는 함수
export const updateKeyring = async (address: string, privateKey: string) => {
  await removeKeyring(address);
  return wallet.newKeyring(address, privateKey);
};

// 클레이튼 지갑 안에 잔액이 얼마나 있는지 확인하는 함수
export const getBalance = async (address: string) => {
  return _peb2Klay(await caver.rpc.klay.getBalance(address));
};

/////////////////////////////////////////////////////////////////////////////

/*
아래  함수들은 모두 mtt의 method로부터 구현됨
이는 migration되어 deploy된 solidity 파일에 구현된 method들을 호출하는데,
이때 모든 함수들의 원형은 MatildaToken.sol 파일에 구현되어 있음. (2291줄 부터 2338줄까지)
*/

// NFT를 민팅하기 위한 함수
export const mint = async (minter: string, tokenURI: string) => {
  return await mtt.methods.mintNFT(minter, tokenURI).send({ from: process.env.address });
};

// NFT를 판매하기 위해 사용하는 함수
export const setForSale = async (address: string, tokenID: Number, price: Number) => {
  const value = await _klay2Peb(price.toString());
  return await mtt.methods.setForSale(tokenID, value).send({ from: address });
};

// NFT 판매를 철회하기 위해 사용하는 함수
export const unsetForSale = async (address: string, tokenID: Number) => {
  return await mtt.methods.unsetForSale(tokenID).send({ from: address });
};

// NFT를 구매하기 위해 사용하는 함수
export const buyNFT = async (address: string, tokenID: Number, price: Number) => {
  const _price = await _klay2Peb(price.toString());
  return await mtt.methods.buyNFT(tokenID).send({ from: address, value: _price });
};

// 판매 등록된 토큰 목록 확인
export const getOnSale = async () => {
  return await mtt.methods.getOnSale().call({ from: process.env.address });
};

// 판매 상태인 토큰의 소유자, 가격 확인
export const getOnSaleInfo = async (tokenID: Number) => {
  return await mtt.methods.getOnSaleInfo(tokenID).call({ from: process.env.address });
};
