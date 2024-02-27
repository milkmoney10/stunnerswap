import {useState, useEffect} from 'react'
import '../../styles/swapApproval.css'
const BigNumber = require('bignumber.js');

 
function App({reserve0, setReserve0, reserve1, setReserve1, amm, usdcBalance, usdtBalance,
    liquidityPoolBalance, usdcLiq, usdtLiq, wallet, inputALiq, 
    buttonRefA, usdc_contract, usdt_contract, buttonRefB, setInputBLiq, inputBLiq, 
isApprovedA, approvalAmount, setApprovalAmount, setCurrentAllowance, 
inputValueA, setSelectedTokenA, selectedTokenA, swapApprovalAmount, setSwapApprovalAmount, 
isApproved, setApprovedA}) {

    useEffect(() => {
    }, [selectedTokenA])

    const approve = async () => {
        const approvalAmountBigNumber = new BigNumber(inputValueA * 10 ** 18)
        console.log(approvalAmountBigNumber)
        const approvalAmount = inputValueA
        let contract = (selectedTokenA == 'usdt') ? usdt_contract : (selectedTokenA == 'usdc') ? usdc_contract : null;
        if (contract !== null) {
         
            const approve = await contract.approve(amm.target, approvalAmountBigNumber.toFixed())
            const allowanceAmount = await contract.allowance(wallet.address, amm.target)
            const allowanceAmountBigNumber = new BigNumber(allowanceAmount).toFixed()
            const allowanceConverted = allowanceAmountBigNumber / 10 ** 18
            console.log(`approved ${allowanceConverted} of ${selectedTokenA}`)
            setApprovedA(true)
        } if (contract == null){
            return null
        }
 
}

    // const getAllSwapApprovals = async () => {
    //     if (selectedTokenA == 'usdt') {
    //         const usdt_approval = await usdt_contract.allowance(wallet.address, amm.target)
    //         const usdt_approval_converted = new BigNumber(usdt_approval).toString() / 10 ** 18
    //         setSwapApprovalAmount(usdt_approval_converted)
    //     } else if (selectedTokenA == 'usdc') {
    //         const usdc_approval = await usdc_contract.allowance(wallet.address, amm.target)
    //         const usdc_approval_converted = new BigNumber(usdc_approval).toString() / 10 ** 18
    //         setSwapApprovalAmount(usdc_approval_converted)
    //     }
    // }

    const resetAllowances = async () => {
        const resetA = await usdc_contract.approve(amm.target, '0')
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 0.5 seconds
        const resetB = await usdt_contract.approve(amm.target, '0')
    }
    return(
        <div className='swap-approval-container'> 
            <button onClick={approve}>Approve</button>
            <button onClick={resetAllowances}>Reset Allowances</button>
            <p>Input A approved: {swapApprovalAmount}</p>
            </div>
    )
}

export default App; 