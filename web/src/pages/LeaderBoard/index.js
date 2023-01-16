import React, { useEffect } from 'react'
import { IoCaretUpOutline, IoCaretDownOutline } from 'react-icons/io5'
import { AiOutlineMinus } from 'react-icons/ai'

import Footer from '../../components/Footer'


export default function LeaderBoard() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <div className="w-full bg-[#02121d]">
            <div style={{ backgroundImage: `url(https://demo.thetork.com/html/torkgo/assets/images/header/bg.jpg)` }} className="h-[20rem] w-screen flex flex-col items-center justify-center font-body text-white space-y-6">
                <h1 className="text-5xl font-bold">Leader Board</h1>
                <p className="text-lg text-white/80">Home - Leader Board</p>
            </div>
            <div className="xl:container mx-auto xl:px-20 md:px-12 px-4 lg:py-40 py-20">
                <div className="overflow-x-auto no-scrollbar">
                    <table className='table-fixed w-full overflow-x-auto bg-[#28dbd1]' style={{minWidth: 1200}}>
                        <thead>
                            <tr className='font-bold font-body text-left text-lg border-b border-[#02121d]'>
                                <th className="py-3 pl-5 w-10">Status</th>
                                <th className="w-1/12">Rank</th>
                                <th className="w-1/4">Project Name</th>
                                <th className="w-1/4">Public Key</th>
                                <th className="w-1/6">Locked</th>
                                <th className="w-1/6 pr-5">Balance</th>
                            </tr>
                        </thead>
                        <tbody className='font-semibold font-body text-lg'>
                            {[1,2,3].map((item, index) => (
                                <>
                                    <tr className='my-2 text-left bg-[#0a1f2f] text-white/90 border-b border-[#02121d]'>
                                        <td className="py-8 pl-5">
                                            <AiOutlineMinus />
                                        </td>
                                        <td>0{index * 2 + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-4">
                                                <img className="w-12 h-12 rounded border" src="https://demo.thetork.com/html/torkgo/assets/images/igo/author/3.png" />
                                                <p className="text-xl font-bold">Battle Ground</p>
                                            </div>
                                        </td>
                                        <td>0x95e441....ddd953454</td>
                                        <td>135 Days</td>
                                        <td>$39300090</td>
                                    </tr>
                                    <tr className='text-left bg-[#0a1f2f] text-white/90 border-b border-[#02121d]'>
                                        <td className="py-6 pl-5">
                                            <div className="flex items-center space-x-1 text-green-400">
                                                <p>+1</p>
                                                <IoCaretUpOutline />
                                            </div>
                                        </td>
                                        <td>0{index * 2 + 2}</td>
                                        <td>
                                            <div className="flex items-center space-x-4">
                                                <img className="w-12 h-12 rounded border" src="https://demo.thetork.com/html/torkgo/assets/images/igo/author/2.png" />
                                                <p className="text-xl font-bold">Frozen City</p>
                                            </div>
                                        </td>
                                        <td>0x95e441....ddd953454</td>
                                        <td>138 Days</td>
                                        <td className="pr-5">$39300090</td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}
