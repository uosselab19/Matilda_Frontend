// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// 스마트 컨트랙트 주소 입력
const contractAddress = '0x64469e021f23353a3e0757bc4d211a6f9756d37a'
caver.klay.getCode(contractAddress).then(console.log);

const KlaytnGreeter = require('./build/contracts/KlaytnGreeter.json');
// 스마트 컨트랙트 주소 입력
const klaytnGreeter = new caver.klay.Contract(KlaytnGreeter.abi, contractAddress);
klaytnGreeter.methods.greet().call().then(console.log);