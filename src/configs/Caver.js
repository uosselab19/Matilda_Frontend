import Caver from "caver-js";
import fs from "fs";
import MatildaToken from './MatildaToken.json';

// caver로부터 클레이튼을 사용하기 위해 통신을 지원해주는 웹소켓
// rpcURL은 .env에 저장되어있음
const ws = new Caver.providers.WebsocketProvider(
  process.env.rpcURL,
  { reconnect: { auto: true } }
);

// 이건 프론트엔드가 아니라 클레이튼에서 받아와야 함
// 트러플에서부터 sol를 배포하면 얻는 abi와 contractAddress를 json에서부터 받아야 함
// 아마 해당 부분에 json까지 자동으로 뽑아내도록 시스템을 이미 구축해둬서 정상적으로 배포하면 json이 나옴 (configs에 나오는지는 의문. 만약 다른 폴더에서 생성되면 configs로 옮겨줘야 합니다.)
const { abi, contractAddress } = MatildaToken;

//mtn mtt가 무슨 약자인지 까먹었어요. mt은 Matilda인데, n t는 기억안남.
export const caver = new Caver(ws);
export const wallet = caver.wallet;
export const mtn = new caver.kct.kip17(contractAddress); // kip17에 대한 기능 사용할 수 있도록 함
export const mtt = new caver.contract(abi, contractAddress); // 컨트랙트 값을 저장해둠

// 가스비는 적당히 큰 값이면 아무래도 상관 X
// 기억에는 100만 이상이면 상관없는 듯. 100만 이하로 떨어지면 가스비 지출하다가 제한 걸려서 거래가 안 될 수 있음.
// 넉넉하게 1억 근방으로 잡아두면 가스비로부터 문제생길 일은 없고, 그것보다 큰 숫자 집어넣는다고 큰 문제는 없음. (딱히 오버플로우 걱정은 X)
mtt.options.gas=150000000;

// 지갑에 계정이 없으면 넣어주는 코드
if (!wallet.isExisted(process.env.address)) wallet.newKeyring(process.env.address, process.env.privateKey);
