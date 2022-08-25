const Count = artifacts.require("Count");
const Caver = require("caver-js");
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function (deployer) {
  await deployer.deploy(Count);
  if (!Count._json) throw new Error("Count json is missed.");
  
  const caver = new Caver(
    new Caver.providers.WebsocketProvider(
      process.env.rpcURL,
      { reconnect: { auto: true } }
    )
  );

  const contract = caver.contract.create(Count._json.abi);
  const myContract = await contract.deploy(
    {
      from: process.env.address,
      gas: 3000000,
    },
    Count._json.deployedBytecode
  )

  //필요한 정보를 local에 남기기 위한 코드
  fs.writeFile(
    "deployedContract",
    JSON.stringify(
      {
        abi: Count._json.abi,
        bytecode: Count._json.deployedBytecode,
        contractAddress: myContract.options.address
      }
    ),
    (err) => { if (err) throw err; }
  );
};
