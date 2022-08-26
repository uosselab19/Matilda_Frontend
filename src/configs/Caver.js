import Caver from "caver-js";
import fs from "fs";

const ws = new Caver.providers.WebsocketProvider(
  process.env.rpcURL,
  { reconnect: { auto: true } }
);


export const caver = new Caver(ws);
// export const contract = new caver.contract(ABI, contractAddress);