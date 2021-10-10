import { task } from "hardhat/config";
import { Contract } from "ethers";
const fs = require('fs');
const dotenv = require('dotenv');

task("TransferTask", "Transfer task", async (args, hre) => {
  console.log("Begin transfer task");
  
  const accounts = await hre.ethers.getSigners();
  const sender = accounts[0].address;
  console.log("Sender address: ", sender);

  const LenarqaCoin = await hre.ethers.getContractFactory("Token");
  let lenarqaCoin = await LenarqaCoin.deploy("MyCoin", "Mcoin", process.env.ADDR_LENARQA_COIN);
  console.log(`Smart contract has been deployed to: ${lenarqaCoin.address}`);
  
  lenarqaCoin.transfer(accounts[1].address, hre.ethers.utils.parseEther('10'));
  const balacneAddress1 =  await lenarqaCoin.balanceOf(accounts[1].address);
  console.log(`balance address1 =  ${hre.ethers.utils.formatEther(balacneAddress1)}`);

  console.log("End transfer task");
});