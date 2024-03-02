import React, {useState, useEffect} from 'react'
import { ethers } from "ethers";
const BigNumber = require('bignumber.js');
 
function App({wallet, usdc_contract, usdt_contract, usdc_balance, usdt_balance, 
    usdcBalance, usdtBalance}){
 
    const x = new BigNumber(500000000000000000000000)
                   
    const claim_usdc = async () => {  
        try {
            const claim = await usdc_contract.mint(wallet.address, x.toString())
            usdcBalance()
        } catch(error) {
            console.log(error)
        }
    }
    const claim_usdt = async () => {
        try {
            const claim = await usdt_contract.mint(wallet.address, x.toString())
            usdtBalance()
        } catch(error) {
            console.log(error)
        }
    }
  
    return(
        <div> 
    
            {/* <button onClick={claim_usdc}>Claim USDC</button>
            <button onClick={claim_usdt}>Claim USDT</button>
            <p>USDC Balance: {usdc_balance}</p>
            <p>USDT Balance: {usdt_balance}</p> */}

        </div>
    )
}

export default App;  