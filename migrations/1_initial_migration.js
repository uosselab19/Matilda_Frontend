const Migrations = artifacts.require("./Migrations.sol");

module.exports = function (deployer) {
  console.log(artifacts);
  deployer.deploy(Migrations);
};