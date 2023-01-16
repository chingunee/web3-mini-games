const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrganizerNft - Functionality Test", function () {
  beforeEach(async function () {
    let accounts = await ethers.getSigners();
    this.odko = accounts[0];
    this.ireedui = accounts[1];
    this.OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
    this.organizerFactoryContract = await this.OrganizerFactory.deploy();
    await this.organizerFactoryContract.deployed();
    await this.organizerFactoryContract
      .connect(this.odko)
      .createOrganizer("mnkhod", "mnkhod.dev@gmail.com", "99310720");
  });

  it("checks nft's details", async function () {
    let nftId = await this.organizerFactoryContract.addressToOrganizerId(
      this.odko.address
    );
    let nftAddress = await this.organizerFactoryContract.nft();
    const nft = await ethers.getContractAt("OrganizerNFT", nftAddress);
    const nftDetail = await nft.getOrganizerDetail(nftId);

    expect(nftDetail.username).to.equal("mnkhod");
    expect(nftDetail.email).to.equal("mnkhod.dev@gmail.com");
    expect(nftDetail.phone_number).to.equal("99310720");
    expect(nftDetail.tournamentIds.length).to.equal(0);

    expect(
      await this.organizerFactoryContract.idToOrganizerAddress(nftId)
    ).to.equal(this.odko.address);
    expect(
      await this.organizerFactoryContract.organizerHasNft(this.odko.address)
    ).to.equal(true);
    expect(
      await this.organizerFactoryContract.addressToOrganizerId(
        this.odko.address
      )
    ).to.equal(0);
  });
});
