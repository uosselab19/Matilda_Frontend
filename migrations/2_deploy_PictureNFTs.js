const PictureNFT = artifacts.require("./PictureNFT.sol");
const fs = require("fs");

module.exports = function (deployer) {
  var name = "YouTube Thumbnail Token";
  var symbol = "YTT";

  deployer.deploy(PictureNFT, name, symbol).then(() => {
    if (PictureNFT._json) {
      fs.writeFile(
        "deployedABI",
        JSON.stringify(PictureNFT._json.abi),
        (err) => {
          if (err) throw err;
          console.log("파일에 ABI 입력 성공");
        }
      );
    }

    fs.writeFile("deployedAddress", PictureNFT.address, (err) => {
      if (err) throw err;
      console.log("파일에 주소 입력 성공");
    });
  });
};