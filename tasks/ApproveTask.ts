import { task } from "hardhat/config";
import { Contract } from "ethers";
const fs = require('fs');
const dotenv = require('dotenv');

task("ApproveTask", "Approve task", async (args, hre) => {
    console.log("Begin approve task");
    
    const accounts = await hre.ethers.getSigners();
    const sender = accounts[0].address;
    console.log("Sender address: ", sender);

    const LenarqaCoin = await hre.ethers.getContractFactory("Token");
    let lenarqaCoin = await LenarqaCoin.deploy("MyCoin", "Mcoin", process.env.ADDR_LENARQA_COIN);
    console.log(`Smart contract has been deployed to: ${lenarqaCoin.address}`);

    console.log("approve 100 from addres0 to addres1");
    lenarqaCoin.approve(accounts[1].address, hre.ethers.utils.parseEther('100'));
    const allowanceAddress1 =  await lenarqaCoin.allowance(sender, accounts[1].address);
    console.log(`allowance from adress0 to address1 =  ${hre.ethers.utils.formatEther(allowanceAddress1)}`);
});