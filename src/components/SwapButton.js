import {useState, useEffect} from 'react'
import '../styles/swapButton.css'
import skull from '../images/skull.png'
import SwapApproval from './Subcomponents/SwapApproval'
const Web3 = require('web3')
const BigNumber = require('bignumber.js');

 
function App({reserve0, setReserve0, reserve1, setReserve1, amm, usdcBalance, usdtBalance,
liquidityPoolBalance, usdcLiq, usdtLiq, wallet, inputALiq, 
buttonRefA, usdc_contract, usdt_contract, buttonRefB, setInputBLiq, inputBLiq, 
inputAContract, inputBContract, setApprovedA, isApprovedA, approvalAmount, setApprovalAmount, 
currentAllowance, setCurrentAllowance, inputValueA, selectedTokenA, swapApprovalAmount, 
setSwapApprovalAmount, setSelectedTokenA, setInputValueA, setInputValueB, 
setUserBalanceA, setUserBalanceB, usdt_balance, selectedTokenB, setSelectedTokenB}){



    useEffect(() => {


        const checkAllowance =  async () => {
            let contract = (selectedTokenA == 'usdt') ? usdt_contract : (selectedTokenA == 'usdc') ? usdc_contract : null;
            if (contract !== null) {
                const getAllowanceA = await contract.allowance(wallet.address, amm.target)
                const convertAllowanceA = new BigNumber(getAllowanceA)
                setCurrentAllowance(convertAllowanceA)
                const current_input = new BigNumber(inputValueA * 10 ** 18)
                const isLessThanOrEqual = current_input.isLessThanOrEqualTo(convertAllowanceA)
                const isGreaterThan = current_input.isGreaterThan(convertAllowanceA)
                if (isLessThanOrEqual){
                    setApprovedA(true)
                } else if (isGreaterThan) {
                    setApprovedA(false)
                }
            } else if (contract == null){
                return null
            }
            }
        checkAllowance()
    }, [setApprovedA, setCurrentAllowance, setSelectedTokenA, inputValueA, 
        setInputValueA, isApprovedA, usdt_balance, selectedTokenB, setSelectedTokenB]) 

    //probably will put approvals in swap instead of in addLiquidity
    const swap = async () => {
        try {
   
            if (inputAContract != '' && inputBContract != ''){
                console.log('successfully found contracts to swap')
   
                const input = BigNumber(parseInt(inputValueA) * 10 ** 18).toString()
                
                const swap = await amm.swap(inputAContract.target, input)
                usdcBalance()
                usdtBalance()
                liquidityPoolBalance()
                setInputValueA('')
                setInputValueB('')

                const getUsdtBalance = parseInt(await usdt_contract.balanceOf(wallet.address)) / 10 ** 18
                const getUsdcBalance = parseInt(await usdc_contract.balanceOf(wallet.address)) / 10 ** 18
                console.log(getUsdtBalance)
                console.log(getUsdcBalance)
                if (selectedTokenA == 'usdt'){
                    setUserBalanceA(getUsdtBalance)
                    setUserBalanceB(getUsdcBalance)
                } else if (selectedTokenA == 'usdc') {
                    setUserBalanceA(getUsdcBalance)
                    setUserBalanceB(getUsdtBalance)
                }
                
            } else {
                console.log('missing a contract for swapping')
            }
        } catch (error) {
            console.log(error)
        }

        
    }

//     const approveA = async () => {
//         const approvalAmountBigNumber = new BigNumber(approvalAmount * 10 ** 18)
//         const approveA = await usdc_contract.approve(amm.target, approvalAmount.toString())
//         setApprovedA(true)
//         await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 0.5 seconds
//         const allowanceAmount = await usdc_contract.allowance(wallet.address, amm.target)
//         const convertAllowanceAmount = new BigNumber(allowanceAmount).toString()
//         setCurrentAllowance(convertAllowanceAmount)
//         setApprovalAmount(convertAllowanceAmount)
// }

    return(
        <div className='swap-button-container'>
            {!isApprovedA && (
                    <SwapApproval 
                    inputValueA={inputValueA}
                    selectedTokenA={selectedTokenA}
                    setSelectedTokenA={setSelectedTokenA}
                    usdc_contract={usdc_contract}
                    usdt_contract={usdt_contract}
                    amm={amm}
                    wallet={wallet}
                    setCurrentAllowance={setCurrentAllowance}
                    setApprovalAmount={setApprovalAmount}
                    swapApprovalAmount={swapApprovalAmount}
                    setSwapApprovalAmount={setSwapApprovalAmount}
                    setApprovedA={setApprovedA}
                    />
               
            )}
            {isApprovedA && (
                    <button type="text" onClick={swap} className='swap-btn'>Swap</button>
          
            )}
            
        </div>
    )
}

export default App;