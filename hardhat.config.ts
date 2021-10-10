import { config as dotenvConfig } from 'dotenv';
import '@nomiclabs/hardhat-waffle';
import "@nomiclabs/hardhat-ethers";
import "./tasks/index.ts";
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






