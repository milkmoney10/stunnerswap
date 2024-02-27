import {useState, useEffect} from 'react'
import '../styles/addLiquidity.css'
const Web3 = require('web3')
const BigNumber = require('bignumber.js');

function App({reserve0, setReserve0, reserve1, setReserve1, amm, usdcBalance, usdtBalance,
    liquidityPoolBalance, usdcLiq, usdtLiq, wallet, inputALiq, 
    buttonRefA, usdc_contract, usdt_contract, buttonRefB, setInputBLiq, inputBLiq, 
isApprovedA, setApprovedA, approvalAmount, setApprovalAmount, setCurrentAllowance, 
currentAllowance }) {
 
    useEffect(() => {

    }, [setApprovalAmount])

    // const [isApprovedA, setApprovedA] = useState(false)
    const [isApprovedB, setApprovedB] = useState(false)

    const approvalInput = new BigNumber(100000000000000000000)
    const checkAllowance =  async() => {
        const getAllowanceA = await usdc_contract.allowance(wallet.address, amm.target)
        const getAllowanceB = await usdt_contract.allowance(wallet.address, amm.target)
        console.log(getAllowanceA)
        console.log(getAllowanceB)
        if (getAllowanceA >= approvalInput){
        
            setApprovedA(true)
        } else {
            setApprovedA(false)
        }
        if (getAllowanceB >= approvalInput){
     
            setApprovedB(true)
        } else {
            setApprovedB(false)
        }
   
    }
    const approveA = async () => {
        const approvalAmountBigNumber = new BigNumber(approvalAmount * 10 ** 18)
        const approveA = await usdc_contract.approve(amm.target, approvalAmount.toString())
        setApprovedA(true)
        await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 0.5 seconds
        const allowanceAmount = await usdc_contract.allowance(wallet.address, amm.target)
        const convertAllowanceAmount = new BigNumber(allowanceAmount).toString()
        setCurrentAllowance(convertAllowanceAmount)
        setApprovalAmount(convertAllowanceAmount)
 
}

    const approveB = async () => {
        const approveB = await usdt_contract.approve(amm.target, approvalInput.toString())
        console.log(approveB)
        setApprovedB(true)
    }
    const resetAllowances = async () => {
        const resetA = await usdc_contract.approve(amm.target, '0')
        console.log(resetA)
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 0.5 seconds
        const resetB = await usdt_contract.approve(amm.target, '0')
        console.log(resetB)
        setApprovedA(false)
        setApprovedB(false)
    }

    
    return (
        <div> 
     
        </div>
    )
}

export default App;