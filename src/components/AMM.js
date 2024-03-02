import React, {useState, useRef, useEffect} from 'react'
import '../styles/amm.css'
import InputA from './InputA'
import InputB from './InputB'
import SwapButton from './SwapButton' 
import InputPopUpA from './InputPopUpA'
import InputPopUpB from './InputPopUpB'
import AddLiquidity from './AddLiquidity' 
import Approvals from './Approvals'
import Metamask from './Metamask'
 
function App({wallet, amm, 
    usdcBalance, usdtBalance, usdt_contract, usdc_contract,
usdc_balance, usdt_balance, set_usdc_balance, set_usdt_balance, setShowAMMPage, 
setShowLiquidityPage, showAMMPage, showLiquidityPage, usdcCA, usdcABI, signer}){

    useEffect(() => {
    }, [showAMMPage, showLiquidityPage])

    const buttonRefA = useRef(null);
    const buttonRefB = useRef(null);   

    const [usdcLiq, setUsdcLiq] = useState(0)
    const [usdtLiq, setUsdtLiq] = useState(0)
    const [reserve0, setReserve0] = useState(0);
    const [reserve1, setReserve1] = useState(0);
    const [isVisibleA, setIsVisibleA] = useState(false);
    const [showNewScreenA, setShowNewScreenA] = useState(false);
    const [isVisibleB, setIsVisibleB] = useState(false);
    const [showNewScreenB, setShowNewScreenB] = useState(false);
    const [isSelectedTokenA, setIsTokenSelectedA] = useState(false);
    const [selectedTokenA, setSelectedTokenA] = useState('');

    const [isSelectedTokenB, setIsTokenSelectedB] = useState(false);
    const [selectedTokenB, setSelectedTokenB] = useState('')
    const [inputALiq, setInputALiq] = useState(0)
    const [inputAContract, setInputAContract] = useState('')
    const [inputBLiq, setInputBLiq] = useState(0)
    const [inputBContract, setInputBContract] = useState('')
    const [availableTokens, setAvailableTokens] = useState(['usdt', 'usdc'])

    const [updatedAvailableTokens, setUpdatedAvailableTokens] = useState(availableTokens)
    const [isApprovedA, setApprovedA] = useState(false)
    const [approvalAmount, setApprovalAmount] = useState('')
    const [currentAllowance, setCurrentAllowance] = useState(0)
    const [inputValueB, setInputValueB] = useState(null)
    const [inputValueA, setInputValueA] = useState(null)

    const [userBalanceA, setUserBalanceA] = useState(0)
    const [userBalanceB, setUserBalanceB] = useState(0)
    const [swapApprovalAmount, setSwapApprovalAmount] = useState(0)
    const [test, setTest] = useState('false')
    const [test2, setTest2] = useState(0)


    //will move this somewhere else later, might not even need in UI
    const liquidityPoolBalance = async () => {
        try {    
            const reserve0 = await amm.reserve0()
            const reserve1 = await amm.reserve1()
            setReserve0(Number(reserve0)) 
            setReserve1(Number(reserve1))
        } catch(error) {
            console.log(error)
        }
    }
    
    return( 
        <div class="main-container">
            {showAMMPage && (
                <div className='app'>
                     <div class='input-container'>
                        <InputA
                        setIsVisibleA={setIsVisibleA}
                        isVisibleA={isVisibleA}
                        buttonRefA={buttonRefA}
                        setShowNewScreenA={setShowNewScreenA}
                        setInputALiq={setInputALiq}
                        inputALiq={inputALiq}
                        setIsTokenSelectedA={setIsTokenSelectedA}
                        setSelectedTokenA={setSelectedTokenA}
                        isSelectedTokenA={isSelectedTokenA}
                        selectedTokenA={selectedTokenA}
                        inputAContract={inputAContract}
                        setInputAContract={setInputAContract}
                        usdc_contract={usdc_contract}
                        usdt_contract={usdt_contract}
                        approvalAmount={approvalAmount}
                        setApprovalAmount={setApprovalAmount}
                        currentAllowance={currentAllowance}
                        setApprovedA={setApprovedA}
                        usdc_balance={usdc_balance}
                        usdt_balance={usdt_balance}
                        inputValueA={inputValueA}
                        inputValueB={inputValueB}
                        setInputValueA={setInputValueA} 
                        setInputValueB={setInputValueB}
                        inputBLiq={inputBLiq}
                        setSelectedTokenB={setSelectedTokenB}
                        set_usdt_balance={set_usdt_balance}
                        set_usdc_balance={set_usdc_balance}
                        userBalanceA={userBalanceA}
                        setUserBalanceB={setUserBalanceB}
                        userBalanceB={userBalanceB}
                        setUserBalanceA={setUserBalanceA}
                        signer={signer}
                        />
                        <InputB 
                        isSelectedTokenB={isSelectedTokenB}
                        setIsTokenSelectedB={setIsTokenSelectedB}
                        selectedTokenB={selectedTokenB}
                        setSelectedTokenB={setSelectedTokenB}
                        setIsVisibleB={setIsVisibleB}
                        isVisibleB={isVisibleB}
                        buttonRefB={buttonRefB}
                        setShowNewScreenB={setShowNewScreenB}
                        setUsdtLiq={setUsdtLiq}
                        usdtLiq={usdtLiq}
                        setInputBLiq={setInputBLiq}
                        setInputBContract={setInputBContract}
                        usdt_contract={usdt_contract}
                        usdc_contract={usdc_contract}
                        usdc_balance={usdc_balance}
                        usdt_balance={usdt_balance}
                        inputValueA={inputValueA}
                        inputValueB={inputValueB}
                        setInputValueA={setInputValueA}
                        setInputValueB={setInputValueB}
                        userBalanceB={userBalanceB}
                        signer={signer}
                    
                        />
                        <SwapButton
                        reserve0={reserve0}
                        reserve1={reserve1}
                        setReserve0={setReserve0}
                        setReserve1={setReserve1}
                        amm={amm}
                        usdcBalance={usdcBalance}
                        usdtBalance={usdtBalance}
                        liquidityPoolBalance={liquidityPoolBalance}
                        setUsdtLiq={setUsdtLiq}
                        usdtLiq={usdtLiq}
                        inputALiq={inputALiq}
                        inputAContract={inputAContract}


                        buttonRefA={buttonRefA}
                        usdc_contract={usdc_contract}
                        usdt_contract={usdt_contract}
                        buttonRefB={buttonRefB}
                        inputBLiq={inputBLiq}
                        inputBContract={inputBContract}
                        setInputBContract={setInputBContract}
                        wallet={wallet}
                        isApprovedA={isApprovedA}
                        setApprovedA={setApprovedA}
                        approvalAmount={approvalAmount}
                        setApprovalAmount={setApprovalAmount}
                        currentAllowance={currentAllowance} 
                        setCurrentAllowance={setCurrentAllowance}
                        inputValueA={inputValueA}
                        setSelectedTokenA={setSelectedTokenA}
                        selectedTokenA={selectedTokenA}
                        setSwapApprovalAmount={setSwapApprovalAmount}
                        swapApprovalAmount={swapApprovalAmount}
                        setInputValueA={setInputValueA}
                        setInputValueB={setInputValueB}
                        set_usdt_balance={set_usdt_balance}
                        set_usdc_balance={set_usdc_balance}
                        usdt_balance={usdt_balance}
                        setUserBalanceA={setUserBalanceA}
                        setUserBalanceB={setUserBalanceB}
                        selectedTokenB={selectedTokenB}
                        signer={signer}
                        />
                        <Approvals 
                        reserve0={reserve0}
                        reserve1={reserve1}
                        setReserve0={setReserve0}
                        setReserve1={setReserve1}
                        amm={amm}
                        usdcBalance={usdcBalance}
                        usdtBalance={usdtBalance}
                        liquidityPoolBalance={liquidityPoolBalance}
                        setUsdtLiq={setUsdtLiq}
                        usdtLiq={usdtLiq}
                        inputALiq={inputALiq}
                        inputAContract={inputAContract}
                        buttonRefA={buttonRefA}
                        usdc_contract={usdc_contract}
                        usdt_contract={usdt_contract}
                        buttonRefB={buttonRefB}
                        inputBLiq={inputBLiq}
                        wallet={wallet}
                        setApprovedA={setApprovedA}
                        isApprovedA={isApprovedA}
                        approvalAmount={approvalAmount}
                        setApprovalAmount={setApprovalAmount}
                        setCurrentAllowance={setCurrentAllowance}
                        signer={signer}
                        />
                         {/* <Metamask
                         usdcCA={usdcCA}
                         usdcABI={usdcABI}
                         signer={signer}
                         /> */}
                    </div>
                    <div class='inputPopUpA-container'>
                        <InputPopUpA
                        showNewScreenA={showNewScreenA}
                        isVisibleA={isVisibleA}
                        setIsVisibleA={setIsVisibleA}
                        setShowNewScreenA={setShowNewScreenA}
                        buttonRefA={buttonRefA}
                        setIsTokenSelectedA={setIsTokenSelectedA}
                        selectedTokenA={selectedTokenA}
                        setSelectedTokenA={setSelectedTokenA}
                        setInputAContract={setInputAContract}
                        usdt_contract={usdt_contract}
                        usdc_contract={usdc_contract}
                        availableTokens={availableTokens}
                        setAvailableTokens={setAvailableTokens}
                        updatedAvailableTokens={updatedAvailableTokens}
                        setUpdatedAvailableTokens={setUpdatedAvailableTokens}
                        usdc_balance={usdc_balance}
                        usdt_balance={usdt_balance}
                        setUserBalanceA={setUserBalanceA}
                        setTest={setTest}
                        test2={test2}
                        setTest2={setTest2}
                        setSwapApprovalAmount={setSwapApprovalAmount}
                        signer={signer}
                        />
                        
                    </div>
                    <div class='inputPopUpB-container'>
                        <InputPopUpB
                        isSelectedTokenB={isSelectedTokenB}
                        setIsTokenSelectedB={setIsTokenSelectedB}
                        selectedTokenB={selectedTokenB}
                        setSelectedTokenB={setSelectedTokenB}
                        setIsVisibleA={setIsVisibleA}
                        isVisibleA={isVisibleA}
                        showNewScreenB={showNewScreenB}
                        isVisibleB={isVisibleB}
                        setIsVisibleB={setIsVisibleB}
                        setShowNewScreenB={setShowNewScreenB}
                        buttonRefB={buttonRefB}
                        setInputBContract={setInputBContract}
                        usdt_contract={usdt_contract}
                        usdc_contract={usdc_contract}
                        availableTokens={availableTokens}
                        updatedAvailableTokens={updatedAvailableTokens}
                        setUpdatedAvailableTokens={setUpdatedAvailableTokens}
                        usdc_balance={usdc_balance}
                        usdt_balance={usdt_balance}
                        setUserBalanceB={setUserBalanceB}
                        signer={signer}
                        />
                    </div> 
                </div> 
            )}

            {showLiquidityPage && (
                <div className=''>
                    <AddLiquidity 
                    reserve0={reserve0}
                    reserve1={reserve1}
                    setReserve0={setReserve0}
                    setReserve1={setReserve1}
                    amm={amm}
                    usdcBalance={usdcBalance}
                    usdtBalance={usdtBalance}
                    liquidityPoolBalance={liquidityPoolBalance}
                    setUsdtLiq={setUsdtLiq}
                    usdtLiq={usdtLiq}
                    inputALiq={inputALiq}
                    inputAContract={inputAContract}
                    buttonRefA={buttonRefA}
                    usdc_contract={usdc_contract}
                    usdt_contract={usdt_contract}
                    buttonRefB={buttonRefB}
                    inputBLiq={inputBLiq}
                    wallet={wallet}
                    isSelectedTokenA={isSelectedTokenA}
                    selectedTokenA={selectedTokenA}
                    usdc_balance={usdc_balance}
                    usdt_balance={usdt_balance}
                    signer={signer}
                    />
              </div>
            )}
  
        </div>
    )
}

export default App; 