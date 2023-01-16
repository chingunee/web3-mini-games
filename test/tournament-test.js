const { expect } = require("chai");
const { ethers } = require("hardhat");
const moment = require("moment");
const { parse, parse18, format, format18 } = require("./helpers.js");

describe("EventFactory - Functionality Test", function () {
  beforeEach(async function () {
    let accounts = await ethers.getSigners();
    this.odko = accounts[0];
    this.ireedui = accounts[1];

    this.OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
    this.organizerFactoryContract = await this.OrganizerFactory.deploy();
    await this.organizerFactoryContract.deployed();
    this.organizerNftAddress = await this.organizerFactoryContract.nft();

    this.EventFactory = await ethers.getContractFactory("EventFactory");
    this.eventFactoryContract = await this.EventFactory.deploy(
      this.organizerNftAddress
    );
    await this.eventFactoryContract.deployed();

    let tx = await this.organizerFactoryContract
      .connect(this.odko)
      .createOrganizer(
        "mnkhod",
        "https://www.linkedin.com/in/mnkhod/",
        "mnkhod.dev@gmail.com"
      );
    await tx.wait();
  });

  it("checks event creation process Success/Failure", async function () {
    let blockNumber = await ethers.provider.getBlockNumber();
    let block = await ethers.provider.getBlock(blockNumber);
    let currentTimestamp = block.timestamp;
    const eventName = "Diversified Events";
    const eventProfileUrl = "https://www.ipfs.com/in/url/";
    const eventDescription =
      "Diversified Events is a platform for creating and managing events.";
    const eventLocation = "map.google.com/123456";
    const eventDate = moment.unix(currentTimestamp).add(10, "d").unix();
    const eventSocialLinks = "fb.com/diversifiedevents";
    const eventAdmins = [this.ireedui.address, this.odko.address];

    const normalNftAllowed = true;
    const normalNftPrice = parse18(0.1);
    const normalNftDeadline = moment.unix(currentTimestamp).add(10, "d").unix();
    const normalNftLimit = 10;

    const referrableNftAllowed = true;
    const referrableNftPrice = parse18(0.1);
    const referrableNftDeadline = moment
      .unix(currentTimestamp)
      .add(10, "d")
      .unix();
    const referrableNftLimit = 10;
    const referrableNftReferralLimit = 10;

    const eventDetails = [
      eventName,
      eventProfileUrl,
      eventDescription,
      eventLocation,
      eventDate,
      eventSocialLinks,
      eventAdmins,
    ];

    const normalNftDetails = [
      normalNftAllowed,
      normalNftPrice,
      normalNftDeadline,
      normalNftLimit,
    ];

    const referrableNftDetails = [
      referrableNftAllowed,
      referrableNftPrice,
      referrableNftDeadline,
      referrableNftLimit,
      referrableNftReferralLimit,
    ];

    await expect(
      this.eventFactoryContract
        .connect(this.odko)
        .createReferrableEvent(
          eventDetails,
          normalNftDetails,
          referrableNftDetails
        )
    )
      .to.emit(this.eventFactoryContract, "EventCreated")
      .withArgs(0, this.odko.address, true);

    await expect(
      this.eventFactoryContract
        .connect(this.odko)
        .createNormalEvent(eventDetails, normalNftDetails)
    )
      .to.emit(this.eventFactoryContract, "EventCreated")
      .withArgs(1, this.odko.address, false);

    await expect(
      this.eventFactoryContract.connect(this.ireedui).createNormalEvent(
        // event details
        [
          eventName,
          eventProfileUrl,
          eventDescription,
          eventLocation,
          eventDate,
          eventSocialLinks,
          eventAdmins,
        ],
        // normal nft details
        [normalNftAllowed, normalNftPrice, normalNftDeadline, normalNftLimit]
      )
    ).to.be.revertedWith("USER ISN'T ORGANIZER");
  });
});
