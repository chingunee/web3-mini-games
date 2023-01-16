const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrganizerFactory - Functionality Test", function () {
  beforeEach(async function () {
    let accounts = await ethers.getSigners();
    this.chingun = accounts[0];
    this.ireedui = accounts[1];
    this.OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
    this.organizerFactoryContract = await this.OrganizerFactory.deploy();
    await this.organizerFactoryContract.deployed();
  });

  it("checks organizer creation process", async function () {
    let tx = await this.organizerFactoryContract
      .connect(this.chingun)
      .createOrganizer("chingun", "chingundesu@gmail.com", "99310720");

    receipt = await tx.wait();
    expect(receipt.events[1].args.organizerId).to.equal(0);
    expect(receipt.events[1].args.organizerAddress).to.equal(
      this.chingun.address
    );
    expect(await this.organizerFactoryContract.organizerLength()).to.equal(1);

    await expect(
      this.organizerFactoryContract
        .connect(this.chingun)
        .createOrganizer("mnkhzul", "mnkhzul.dev@gmail.com", "99312121")
    ).to.be.revertedWith("ACCOUNT ALREADY HAS NFT");
  });

  it("checks organizer deletion process", async function () {
    await this.organizerFactoryContract
      .connect(this.chingun)
      .createOrganizer("chingun", "chingundesu@gmail.com", "99310720");

    let chingunsId = await this.organizerFactoryContract
      .connect(this.chingun)
      .addressToOrganizerId(this.chingun.address);
    let deletingTx = await this.organizerFactoryContract.deleteOrganizer(
      chingunsId
    );
    let deletingReceipt = await deletingTx.wait();

    expect(deletingReceipt.events[2].args.organizerId).to.equal(0);
    expect(deletingReceipt.events[2].args.organizerAddress).to.equal(
      this.chingun.address
    );
    expect(await this.organizerFactoryContract.organizerLength()).to.equal(0);
    expect(
      await this.organizerFactoryContract.organizerHasNft(this.chingun.address)
    ).to.equal(false);
  });
});
