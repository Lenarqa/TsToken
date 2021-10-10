import { task } from "hardhat/config";
import { Contract } from "ethers";
const fs = require('fs');
const dotenv = require('dotenv');

task("TransferFromTask", "transferFrom", async (args, hre) => {
    console.log("Begin transferFrom task");
    const accounts = await hre.ethers.getSigners();
    const LenarqaCoin = await hre.ethers.getContractFactory("Token");
    let lenarqaCoin = await LenarqaCoin.deploy("MyCoin", "Mcoin", process.env.ADDR_LENARQA_COIN);
    
    lenarqaCoin.approve(accounts[1].address, hre.ethers.utils.parseEther('1000'));
    const approveBalance =  await lenarqaCoin.allowance(accounts[0].address, accounts[1].address);
    console.log("Approve balance" + hre.ethers.utils.formatEther(approveBalance));
    
    const balacneAddress2 =  await lenarqaCoin.balanceOf(accounts[2].address);
    console.log(`balance address2 =  ${hre.ethers.utils.formatEther(balacneAddress2)}`);
    
    console.log("begin transferFrom addres1 to addres2");
    lenarqaCoin.connect(accounts[1]).transferFrom(accounts[0].address, accounts[2].address, hre.ethers.utils.parseEther('50'));
    const balanceAdress2AfterTransferFrom = await lenarqaCoin.balanceOf(accounts[2].address);
    console.log(`balance address2 =  ${hre.ethers.utils.formatEther(balanceAdress2AfterTransferFrom)}`);
    console.log("End Transfer task");
});