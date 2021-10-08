import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Contract', () => {
    let Token: ContractFactory;
    let token: Contract;  
    let owner: SignerWithAddress; 
    let addr1: SignerWithAddress; 
    let addr2: SignerWithAddress;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('Token');
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await Token.deploy("LeeCoin", "LL", owner.address);
    });

    describe('Deployment', () => { 
        it("Should set the right owher", async () => {
            expect(await token.owner()).to.equals(owner.address);
            
        });
        
        it('Should assign the total supply of tokens to the owner', async () => {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        })
    });

    describe('Transactions', () => {
        it('Should transfer LenarqaCoin between accounts', async () => {
            //addr1 test
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            //addr2 test
            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it('Should fail if sender doesnt have enough AsuCoin', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith('Not enough AsuCoin');
            expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });
        
        it('Should update balance after transfers', async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await token.transfer(addr1.address, ethers.utils.parseEther('100'));
            await token.transfer(addr2.address, ethers.utils.parseEther('50'));

            const finalOwnerBalance = await token.balanceOf(owner.address);
            expect(ethers.utils.parseEther('150').add(finalOwnerBalance)).to.equal(initialOwnerBalance);

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(ethers.utils.parseEther('100'));
            
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(ethers.utils.parseEther('50'));
        });
    })
    
    describe('Approve', () => {
        it("Approve", async () => {
            await token.approve(addr1.address, ethers.utils.parseEther('100'));
            expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseEther('100'));
        });
    });

    describe('totalSupply', () => {
        it("mint", async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            await token.mint(addr1.address, ethers.utils.parseEther('100'));
            expect(await token.totalSupply()).to.equal(ethers.utils.parseEther('100').add(initialOwnerBalance));
        });
        
        it("burn", async () => {
            const initialOwnerBalance = await token.balanceOf(owner.address);
            token.transfer(addr1.address, ethers.utils.parseEther('100'));
            await token.burn(addr1.address, ethers.utils.parseEther('100'));
            expect(await token.totalSupply()).to.equal(initialOwnerBalance.sub(ethers.utils.parseEther('100')));
        });
    });

    describe('Increase/Decrease allowance', () => {
        it("increase", async () => {
            await token.increaseAllowance(addr1.address, ethers.utils.parseEther('300'));
            expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseEther('300'));
        });
        
        it("decrease", async () => {
            token.approve(addr1.address, ethers.utils.parseEther('400'))
            token.decreaseAllowance(addr1.address, ethers.utils.parseEther('100'));
            expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseEther('300'));
        });
    });
});