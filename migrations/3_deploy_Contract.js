const Count = artifacts.require("Count");

module.exports = function (deployer) {
  deployer.deploy(TokenSales).then(() => {
    if (TokenSales._json) {
      fs.writeFile(
        "deployedABI_TokenSales",
        JSON.stringify(TokenSales._json.abi),
        (err) => {
          if (err) throw err;
          console.log("파일에 ABI 입력 성공");
        }
      );
    }

    fs.writeFile("deployedAddress_TokenSales", TokenSales.address, (err) => {
      if (err) throw err;
      console.log("파일에 주소 입력 성공");
    });
  });
};