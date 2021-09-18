const FamilyFeudPoll = artifacts.require("FamilyFeudPoll");

module.exports = function (deployer) {
  deployer.deploy(FamilyFeudPoll);
};
