import Caver from "caver-js";
import fs from "fs";
import MatildaToken from '../configs/MatildaToken.json';

const ws = new Caver.providers.WebsocketProvider(
  process.env.rpcURL,
  { reconnect: { auto: true } }
);

const { abi, contractAddress } = MatildaToken;

export const caver = new Caver(ws);
export const wallet = caver.wallet;
export const mtn = new caver.kct.kip17(contractAddress);
export const mtt = new caver.contract(abi, contractAddress);
mtt.options.gas=150000000;

if (!wallet.isExisted(process.env.address)) wallet.newKeyring(process.env.address, process.env.privateKey);
