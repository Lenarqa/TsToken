import { Contract } from "ethers";
import hre, { ethers } from "hardhat";
const network = hre.network.name;
const fs = require('fs');
const dotenv = require('dotenv');
// const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`))

// for (const k in envConfig) {
//     process.env[k] = envConfig[k]
// }

async function main() {
    const accounts = await ethers.getSigners();
    const sender = accounts[0].address;
    console.log("Sender address: ", sender);

    const LenarqaCoin = await ethers.getContractFactory("Token");
    //let lenarqaCoin = await LenarqaCoin.deploy(process.env.DAO_ADDR_CHAIRPERSON, process.env.TBO_TOKEN_ADDRESS, process.env.DAO_MINIMUM_QUORUM, process.env.DAO_DEBATING_PERIOD_DURATION);
    let lenarqaCoin = await LenarqaCoin.deploy("LeeCoin", "LL", process.env.ADDR_LENARQA_COIN);

    console.log(`Smart contract has been deployed to: ${lenarqaCoin.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });