const Minting = artifacts.require("Minting");

module.exports = function (deployer) {
  deployer.deploy(Minting);
};
