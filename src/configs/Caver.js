import Caver from "caver-js";

const ws = new Caver.providers.WebsocketProvider(
  process.env.rpcURL,
  { reconnect: { auto: true } }
);

export const caver = new Caver(ws);
// export const contract = new caver.contract(ABI, contractAddress);