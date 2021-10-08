import { config as dotenvConfig } from 'dotenv';
import '@nomiclabs/hardhat-waffle';
import "@nomiclabs/hardhat-ethers";
dotenvConfig();

module.exports = {
    solidity: "0.8.0",
    networks: {
        rinkeby: {
        url: process.env.INFURA_API_KEY,
        accounts: {mnemonic: process.env.MNEMONIC},
        }
    },
};

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

task("TransferFrom", "transferFrom", async (args, hre) => {
    console.log("Begin transferFrom task");
    
    const accounts = await hre.ethers.getSigners();
    const sender = accounts[0].address;
    console.log("Sender address: ", sender);

    const LenarqaCoin = await hre.ethers.getContractFactory("Token");
    let lenarqaCoin = await LenarqaCoin.deploy("MyCoin", "Mcoin", process.env.ADDR_LENARQA_COIN);
    console.log(`Smart contract has been deployed to: ${lenarqaCoin.address}`);

    console.log("transfer from address0 to addres1");
    lenarqaCoin.transfer(accounts[1].address, hre.ethers.utils.parseEther('100'));
    const balacneAddress1 =  await lenarqaCoin.balanceOf(accounts[1].address);
    console.log(`balance address1 =  ${hre.ethers.utils.formatEther(balacneAddress1)}`);
    
    lenarqaCoin.approve(accounts[1].address, hre.ethers.utils.parseEther('1000'));

    console.log("begin transferFrom addres1 to addres2");
    const balacneAddress2 =  await lenarqaCoin.balanceOf(accounts[2].address);
    console.log(`balance address2 =  ${hre.ethers.utils.formatEther(balacneAddress2)}`);
    
    
    lenarqaCoin.transferFrom(accounts[1].address, accounts[2].address, hre.ethers.utils.parseEther('50'));
    const balanceAdress2_1 = await lenarqaCoin.balanceOf(accounts[2].address);
    
    
    console.log(`balance address2 =  ${hre.ethers.utils.formatEther(balanceAdress2_1)}`);
    console.log("End approve task");

});




