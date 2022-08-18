/**
 * caver-js 라이브러리는 Klaytn 노드에 연결하게 해줍니다.
 * 'rpcURL' 값을 변경하여 특정 Klaytn 노드에 연결할 수 있습니다.
 * Klaytn 풀노드를 운용 중이라면 rpcURL을 운용 중인 풀노드의 URL로 설정하세요.
 * ex) rpcURL: 'http://localhost:7551'
 */
 import Caver from 'caver-js';

 export const config = {
   rpcURL: 'https://127.0.0.1:8545/'
 };
 
 export const cav = new Caver(config.rpcURL);
 
 export default cav;