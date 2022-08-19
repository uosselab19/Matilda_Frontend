const Migrations = artifacts.require("Migrations");
const Count = artifacts.require("Count");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Count);
};
