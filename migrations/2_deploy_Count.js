const Count = artifacts.require("Count");
const Caver = require("caver-js");
const fs = require('fs');

module.exports = async function (deployer) {
  await deployer.deploy(Count);
  if (!Count._json) throw new Error("Count json is missed.");
  
  const caver = new Caver(
    new Caver.providers.WebsocketProvider(
      process.env.rpcURL,
      { reconnect: { auto: true } }
    )
  );

  const keyring = caver.wallet.newKeyring(process.env.address, process.env.privateKey);
	caver.wallet.updateKeyring(keyring);

  const contract = new caver.contract(Count._json.abi);
  const myContract = await contract.deploy(
    {
      from: keyring.address,
      gas: 8500000,
    },
    Count._json.bytecode
  )

  //필요한 정보를 local에 남기기 위한 코드
  fs.writeFile(
    "./src/configs/deployedContract.json",
    JSON.stringify(
      {
        abi: Count._json.abi,
        bytecode: Count._json.bytecode,
        contractAddress: myContract.options.address
      }
    ),
    (err) => { if (err) throw err; }
  );
};
