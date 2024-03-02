import '../styles/navbar.css'
import logo from '../images/stunnerSwap6.png'
import {useState, useEffect} from 'react'
import Web3 from 'web3';
import {MetaMaskProvider} from "@metamask/sdk-react";
import {useSDK} from '@metamask/sdk-react'
import detectEthereumProvider from "@metamask/detect-provider"
import Metamask from './Metamask'

const BigNumber = require('bignumber.js');

function App({setShowLiquidityPage, setShowAMMPage, wallet, usdc_contract, 
    usdt_contract, usdcBalance, usdtBalance, usdcABI, usdcCA, signer}) { 

    useEffect(() => {
    }, [usdcBalance, usdtBalance])

    const handleAddLiquidityClick = () => {
        setShowAMMPage(false)
        setShowLiquidityPage(true)
    }

    const handleShowSwapPageClick = () => {
        setShowLiquidityPage(false)
        setShowAMMPage(true) 
    } 
 
    const x = new BigNumber(50000000000000000000000000)
                   
    const claim_usdc = async () => {
        try {
            const claim = await usdc_contract.mint(signer.address, x.toFixed())
            usdcBalance()
        } catch(error) {
            console.log(error)
        }
    }
    const claim_usdt = async () => { 
        try {
            const claim = await usdt_contract.mint(signer.address, x.toFixed())
            usdtBalance()
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <nav className='navbar'>
            <div className='title'>
                <img src={logo}></img>
            </div>
            <div className='navigation-links'>
                <ul>
                    <li>
                        <a onClick={handleShowSwapPageClick}>Swap</a>
                    </li>
                    <li>
                        <a onClick={handleAddLiquidityClick}>Add Liquidity</a>
                    </li>
                    <li>
                        <a onClick={claim_usdt}>Claim USDT</a>
                    </li>
                    <li>
                        <a onClick={claim_usdc}>Claim USDC</a>
                    </li>
                </ul>
            </div>
            <div className='wallet'>
                <Metamask
                usdc_contract={usdc_contract}
                usdt_contract={usdt_contract}
                usdcABI={usdcABI}
                usdcCA={usdcCA}
                />
            </div>
        </nav>
    ) 

}

export default App; 