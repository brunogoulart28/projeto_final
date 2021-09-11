var ArmazenadorContrato = artifacts.require("./ArmazenadorContrato.sol");

module.exports = function(deployer) {
  deployer.deploy(ArmazenadorContrato);
};
