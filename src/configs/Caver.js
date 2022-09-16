import Caver from "caver-js";
import fs from "fs";

const ws = new Caver.providers.WebsocketProvider(
  process.env.rpcURL,
  { reconnect: { auto: true } }
);

export const caver = new Caver(ws);
export const wallet = caver.wallet;

if(!wallet.isExisted(process.env.address)) wallet.newKeyring(process.env.address, process.env.privateKey);
