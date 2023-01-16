import React, { useState, useEffect } from 'react'

export default function Metamask() {

    const [selectedAddress, setSelectedAddress] = useState(null)

    const connectToMetamask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);

        setSelectedAddress(accounts[0])
    }
    
    return (
        <div>
            
        </div>
    )
}
