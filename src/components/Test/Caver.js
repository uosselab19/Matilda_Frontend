/**
 * caver-js 라이브러리는 Klaytn 노드에 연결하게 해줍니다.
 * 'rpcURL' 값을 변경하여 특정 Klaytn 노드에 연결할 수 있습니다.
 * Klaytn 풀노드를 운용 중이라면 rpcURL을 운용 중인 풀노드의 URL로 설정하세요.
 * ex) rpcURL: 'http://localhost:7551'
 */

 // @ts-ignore
 import Caver from "caver-js";
 
 const BAOBAB_TESTNET_RPC_URL = "wss://api.baobab.klaytn.net:8652";
 
// const rpcURL = BAOBAB_TESTNET_RPC_URL;
 
 const ws = new Caver.providers.WebsocketProvider(
   "wss://api.baobab.klaytn.net:8652/",
   { reconnect: { auto: true } }
 );
 
 const caver = new Caver(ws);
 
 /* const caverContract = new Caver(rpcURL).klay.Contract(
   DEPLOYED_ABI,
   DEPLOYED_ADDRESS
 ); */
 
 export default caver;