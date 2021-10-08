import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";


task("Hello", "Prints hello", async (args, hre) => {
  console.log("Hello")
});
