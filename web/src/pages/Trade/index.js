import React from 'react'
import { useSelector } from "react-redux"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react'
import { MdClear } from 'react-icons/md'
import { IoCaretDownOutline } from 'react-icons/io5'
import { AiOutlineArrowDown } from 'react-icons/ai'

import Footer from '../../components/Footer'


export default function Trade() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const account = useSelector(state => state.account)
    
    return (
        <div className="w-full bg-[#02121d]">
            <div style={{ backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)` }} className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6">
                <h1 className="text-5xl font-bold">Trade</h1>
                <p className="text-lg text-white/80">Trade - Swap</p>
            </div>
            <div className="xl:container mx-auto xl:px-20 md:px-12 px-4 py-40 text-white">
                <div className="bg-[#0a1f2f] font-body">
                    <div className="flex items-center font-bold text-4xl h-24 px-6 border-b border-[#02121d]">
                        Redeem
                    </div>
                    <div className="p-6 flex flex-col md:flex-row justify-between md:space-y-6">
                        <div className="w-full md:w-6/12 flex flex-col space-y-8">
                            <div className="font-body">
                                <p className="text-white/80 font-semibold text-xl">Total Stack</p>
                                <p className="text-[#28dbd1] font-bold text-2xl">350.70 BUSD</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center rounded bg-[#28dbd1] text-[#02121d] w-24 h-12 font-bold text-xl">7 days</div>
                                <div className="flex items-center justify-center rounded border-[0.1px] border-[#28dbd1] text-[#28dbd1] w-24 h-12 font-bold text-xl">14 days</div>
                                <div className="flex items-center justify-center rounded border-[0.1px] border-[#28dbd1] text-[#28dbd1] w-24 h-12 font-bold text-xl">30 days</div>
                                <div className="flex items-center justify-center rounded border-[0.1px] border-[#28dbd1] text-[#28dbd1] w-24 h-12 font-bold text-xl">60 days</div>
                            </div>
                            <div className="">
                                <div className="flex text-lg space-x-2">
                                    <p className="text-white/80 font-semibold">Lock Period:</p>
                                    <p className="font-bold">7 Days</p>
                                </div>
                                <div className="flex text-lg space-x-2">
                                    <p className="text-white/80 font-semibold">Re-locks on registration:</p>
                                    <p className="font-bold">Yes</p>
                                </div>
                                <div className="flex text-lg space-x-2">
                                    <p className="text-white/80 font-semibold">Early unstake fee:</p>
                                    <p className="font-bold">23%</p>
                                </div>
                                <div className="flex text-lg space-x-2">
                                    <p className="text-white/80 font-semibold">Status:</p>
                                    <p className="font-bold">Unlocked</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-white/80 font-medium text-lg">
                                    <span className="font-bold text-[#28dbd1]">Note: </span> 
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae expedita
                                     error quod! Eaque, laudantium hic.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-5/12">
                            <div className="rounded-lg md:bg-[#061a27] md:p-6 space-y-4">
                                <div className="relative space-y-2">
                                    <div className="bg-[#02121d] p-4 space-y-6 rounded-lg hover:border-gray-600 border-transparent border cursor-default">
                                        <div onClick={onOpen} className="bg-[#061a27] cursor-pointer hover:bg-[#061a27]/80 w-28 rounded-lg px-2 py-1 flex items-center justify-center space-x-2">
                                            <img className="w-7 h-7 rounded-full" src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,fl_sanitize,q_auto,w_48/https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg" alt="img" />
                                            <p>ETH</p>
                                            <IoCaretDownOutline size={20} />
                                        </div>
                                        <div className="text-white/80 flex items-center justify-between">
                                            <div className="">
                                                <input className="bg-transparent text-2xl font-medium focus:outline-none w-40" placeholder="0.00" prefix="$" />
                                                <span>~$1.3903</span>
                                            </div>
                                            <div>Balance: 0</div>
                                        </div>
                                    </div>
                                    <div className="absolute w-8 h-8 flex justify-center hover:border border-gray-600 items-center cursor-pointer rounded-full top-1/2 -translate-y-6 bg-[#061a27] text-white/80 left-1/2 -translate-x-6">
                                        <AiOutlineArrowDown size={20} />
                                    </div>
                                    <div className="bg-[#02121d] p-4 space-y-6 rounded-lg hover:border-gray-600 border-transparent border cursor-default">
                                        <div onClick={onOpen} className="bg-[#061a27] hover:bg-[#061a27]/80 w-28 cursor-pointer rounded-lg px-2 py-1 flex items-center justify-center space-x-2">
                                            <img className="w-7 h-7 rounded-full" src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,fl_sanitize,q_auto,w_48/https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg" alt="img" />
                                            <p>WETH</p>
                                            <IoCaretDownOutline size={20} />
                                        </div>
                                        <div className="text-white/80 flex items-center justify-between">
                                            <div className="">
                                                <input className="bg-transparent text-2xl font-medium focus:outline-none w-40" placeholder="0.00" prefix="$" />
                                                <span>~$1.3903</span>
                                            </div>
                                            <div>Balance: 0</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 rounded-lg cursor-pointer hover:bg-blue-600 font-semibold text-lg text-center bg-blue-500">{account ? 'Redeem' : 'Connect to a wallet'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal isOpen={isOpen} onClose={onClose} size="lg" motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="relative bg-[#0a1f2f] text-white font-body rounded-t space-y-3">
                    <div className="flex items-center justify-between">
                        <h3>Select a token</h3>
                        <MdClear onClick={onClose} className="cursor-pointer" size={25} />
                    </div>
                    <div>
                        <input className="h-12 text-base px-3 bg-[#02121d] w-full rounded-lg" placeholder="Search name or paste address" />
                    </div>
                </ModalHeader>
                <ModalBody className="bg-[#0a1f2f] text-white font-body rounded-b">
                    <div className="rounded-lg pb-10">
                        <div className="bg-[#02121d] hover:bg-[#02121d]/80 cursor-pointer rounded-t-lg flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <img className="w-10 h-10 rounded-full " src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,fl_sanitize,q_auto,w_48/https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg" />
                                <div className="flex flex-col text-sm">
                                    <p className="text-white/60">Ether</p>
                                    <p className='font-medium'>ETH</p>
                                </div>
                            </div>
                            <div className="text-lg font-medium">2.085</div>
                        </div>
                        <div className="bg-[#02121d] hover:bg-[#02121d]/80 cursor-pointer flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <img className="w-10 h-10 rounded-full " src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,fl_sanitize,q_auto,w_48/https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg" />
                                <div className="flex flex-col text-sm">
                                    <p className="text-white/60">Ether</p>
                                    <p className='font-medium'>ETH</p>
                                </div>
                            </div>
                            <div className="text-lg font-medium">2.085</div>
                        </div>
                        <div className="bg-[#02121d] hover:bg-[#02121d]/80 cursor-pointer rounded-b-lg flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <img className="w-10 h-10 rounded-full " src="https://res.cloudinary.com/sushi-cdn/image/fetch/f_auto,fl_sanitize,q_auto,w_48/https://raw.githubusercontent.com/sushiswap/logos/main/token/eth.jpg" />
                                <div className="flex flex-col text-sm">
                                    <p className="text-white/60">Ether</p>
                                    <p className='font-medium'>ETH</p>
                                </div>
                            </div>
                            <div className="text-lg font-medium">2.085</div>
                        </div>
                    </div>
                </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
