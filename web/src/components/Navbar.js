import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { Link, useLocation } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

import logo from "../assets/images/logo.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { connectMetamask, disconnectMetamask } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

  const [currentUrl, setCurrentUrl] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [copied, setCopied] = useState(false);

  const connectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    connectMetamask(accounts[0]);
    setIsConnect(true);
    onClose();
  };

  const disconnectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.disconnect;

    onProfileClose();
    disconnectMetamask();
  };

  const closeProfileModal = () => {
    setCopied(false);
    onProfileClose();
  };

  useEffect(() => {
    if (Cookie.get("account")) {
      connectMetamask(Cookie.get("account"));
      setIsConnect(true);
    } else {
      setIsConnect(false);
    }
  }, [account]);

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  return (
    <>
      <header
        className={`${
          currentUrl == "/" || currentUrl == "/games/stick-hero/play"
            ? "lg:absolute relative"
            : "relative"
        } h-24 w-screen bg-[#0a1f2f] flex items-center`}
      >
        <div className="xl:container w-full xl:px-20 md:px-12 px-4 mx-auto flex justify-between items-center">
          <Link to="/">
            <img className="h-12" src={logo} alt="img" />
          </Link>
          <div className="hidden md:flex items-center text-white space-x-8 font-semibold font-body text-lg">
            <Link to="/games">GAMES</Link>
            <Link to="/trade">TOURNAMENTS</Link>
            <Link to="/generate">CREATE</Link>
            <Link to="/leader-board">LEADER BOARD</Link>
            {isConnect ? (
              <div
                onClick={onProfileOpen}
                className="cursor-pointer hover:border-gray-600 hover:text-white border border-transparent rounded-xl p-2 bg-[#02121d] text-white/80"
              >
                {account?.slice(0, 10)}...{account?.slice(account?.length - 4)}
              </div>
            ) : (
              <div
                onClick={onOpen}
                className="flex items-center space-x-2 text-[#0a1f2f] px-5 h-11 text-[1rem] bg-[#28dbd1] rounded font-semibold cursor-pointer"
              >
                <p>Connect</p>
                <FaWallet size={20} />
              </div>
            )}
          </div>
          <div className="block md:hidden text-white">
            <GiHamburgerMenu size={25} />
          </div>
        </div>
      </header>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="relative bg-[#0a1f2f] text-white font-body rounded-t">
            <div className="flex justify-center">
              <h3 className="font-bold text-2xl">Connect Your Wallet</h3>
            </div>
            <div
              onClick={onClose}
              className="absolute -right-2 -top-2 bg-[#28dbd1]/50 hover:bg-[#28dbd1]/80 text-black w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer"
            >
              <MdClear size={25} />
            </div>
          </ModalHeader>
          <ModalBody className="bg-[#0a1f2f] text-white font-body rounded-b">
            <div className="space-y-6 pb-6 pt-10">
              <p className="text-center px-10 text-lg text-white/80 font-medium">
                Please select a wallet from below to connect for Launching your
                IGO's
              </p>
              <div className="flex justify-between items-center">
                <div
                  onClick={() => connectToMetamask()}
                  className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]"
                >
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://demo.thetork.com/html/torkgo/assets/images/wallet/metamask.svg"
                  />
                </div>
                <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://demo.thetork.com/html/torkgo/assets/images/wallet/coinbase.svg"
                  />
                </div>
                <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://demo.thetork.com/html/torkgo/assets/images/wallet/bitski.svg"
                  />
                </div>
                <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://demo.thetork.com/html/torkgo/assets/images/wallet/venly.svg"
                  />
                </div>
                <div className="cursor-pointer border-2 border-gray-600 rounded-full hover:border-[#28dbd1]">
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://demo.thetork.com/html/torkgo/assets/images/wallet/wallet-connect.svg"
                  />
                </div>
              </div>
              <div className="text-center text-white/80 text-lg font-semibold">
                By connecting your wallet, you agree to our{" "}
                <span className="text-[#28dbd1]">Terms of Service </span>and our{" "}
                <span className="text-[#28dbd1]">Privacy Policy</span> .
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isProfileOpen}
        onClose={onProfileClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="relative bg-[#0a1f2f] text-white font-body rounded-t">
            <div className="flex justify-center">
              <h3 className="font-bold text-2xl">Account</h3>
            </div>
            <div
              onClick={closeProfileModal}
              className="absolute -right-2 -top-2 bg-[#28dbd1]/50 hover:bg-[#28dbd1]/80 text-black w-8 h-8 rounded-lg flex justify-center items-center cursor-pointer"
            >
              <MdClear size={25} />
            </div>
          </ModalHeader>
          <ModalBody className="bg-[#0a1f2f] text-white font-body rounded-b">
            <div className="border rounded-md p-4 border-gray-700 space-y-4">
              <div className="flex justify-between items-center">
                <p>Connected with Metamask</p>
                <button
                  onClick={disconnectToMetamask}
                  className="text-blue-400 px-2 py-1 border-[1px] border-blue-400/50 hover:border-blue-400 rounded-lg text-sm"
                >
                  Disconnect
                </button>
              </div>
              <h3 className="font-bold text-2xl">
                {account?.slice(0, 10)}...{account?.slice(account.length - 4)}
              </h3>
              <div className="flex items-center space-x-6">
                <CopyToClipboard text={account} onCopy={() => setCopied(true)}>
                  {copied ? (
                    <div className="flex space-x-2 items-center font-medium text-green-400 cursor-pointer">
                      <BsCheck />
                      <p className="text-green-400 font-medium">Copied</p>
                    </div>
                  ) : (
                    <div className="flex space-x-2 items-center font-medium text-blue-400 cursor-pointer hover:text-blue-400/70">
                      <BiCopy />
                      <p>Copy address</p>
                    </div>
                  )}
                </CopyToClipboard>
                <a
                  href={`https://goerli.etherscan.io/address/${account}`}
                  target="_blank"
                  className="flex space-x-2 items-center font-medium text-gray-400 cursor-pointer hover:text-gray-400/70"
                >
                  <FiExternalLink />
                  <p>View on Explorer</p>
                </a>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
