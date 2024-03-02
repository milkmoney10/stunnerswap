import React, {useState, useEffect} from 'react';
import '../styles/inputA.css'
import usdtImage from '../images/usdt.png'
import usdcImage from '../images/usdc.png'

  

function App({setInputALiq, buttonRefA, isVisibleA, setIsVisibleA, setShowNewScreenA, 
showNewScreenA, isSelectedTokenA, setSelectedTokenA, selectedTokenA,setInputAContract, 
usdt_contract, usdc_contract, setApprovalAmount, approvalAmount, amm,
currentAllowance, setApprovedA, usdc_balance, usdt_balance, inputValueA,
setInputValueA, inputValueB, inputBLiq, inputALiq, setSelectedTokenB, 
set_usdt_balance, set_usdc_balance, userBalanceA, setUserBalanceA, setUserBalanceB, 
userBalanceB, setInputValueB}){

    const [displayBalance, setDisplayBalance] = useState(0)

    useEffect(() => {
    }, [setSelectedTokenA, setInputValueB, setInputValueA, inputValueB,  
    set_usdt_balance, set_usdc_balance, setDisplayBalance, displayBalance, userBalanceA, 
inputValueA, inputValueB])
    

    const handleChange = () => {
        if (!isVisibleA){

            // console.log('isVisible=False, AMM.js')
            setShowNewScreenA(true)
            setIsVisibleA(true) 
        } else {    
            // console.log('isVisible=True, AMM.js')
            setShowNewScreenA(false)
            setIsVisibleA(false)
        }
    }
  
    const handleUsdcChange = async (event) => {
        
        try {   
            setInputValueA(event.target.value)

            setInputValueB(event.target.value)
            if (buttonRefA.current.name == 'usdt') {
                setInputALiq(event.target.value)
                setInputAContract(usdt_contract)
            } else if (buttonRefA.current.name == 'usdc') {
                setInputALiq(event.target.value)
                setInputAContract(usdc_contract)
            } 
            else {
                setInputALiq(event.target.value)  
                console.log('no token selected')
            }
        } catch(error) {
            console.log(error)
        }
    }

    const switch_inputs = () => {
        if (selectedTokenA == 'usdt') {
            setSelectedTokenA('usdc')
            setSelectedTokenB('usdt')
        }
        if (selectedTokenA == 'usdc') {
            setSelectedTokenA('usdt')
            setSelectedTokenB('usdc')
        }
        const placeholder1 = inputValueA
        const placeholder2 = inputValueB
        setInputValueA(placeholder2)
        setInputValueB(placeholder1)
        const balance_placeholder1 = userBalanceA
        const balance_placeholder2 = userBalanceB
        setUserBalanceA(balance_placeholder2)
        setUserBalanceB(balance_placeholder1)
    }

    const inputFullBalance = async (event) => {
        const text = event.target.textContent
        const extractedNumber = text.match(/\d+/)[0];
        console.log(parseInt(extractedNumber))
        setInputValueA(extractedNumber)
    }

    return(
        <div className='container'>
            <div className='inputA-container'>
            {isSelectedTokenA ? 
                (
                    selectedTokenA == 'usdt' ? (
                        <div className='selected-token'>
                            <button ref={buttonRefA} name='usdt' onClick={() => handleChange()} className='token-icon-usdt'>
                                <img src={usdtImage}></img>
                                <p>USDT</p>
                                <span className="icon">&#9660;</span>
                            </button>
                        </div>
                        ) : (
                            <div className='selected-token'>
                                <button ref={buttonRefA} name='usdc' onClick={() => handleChange()} className='token-icon-usdc'>
                                <img src={usdcImage}></img>
                                <p>USDC</p>
                                <span className="icon">&#9660;</span>
                                </button>
                            </div>
                    )
                ) : (
                    <button ref={buttonRefA} onClick={() => handleChange()} className='custom-buttonA'>
                        <p>Select Token</p>
                        <span className="icon">&#9660;</span>
                    </button>
                )
            }
                <div className='input-wrapper'>
                    <input value={inputValueA} type="text" onChange={(event) => handleUsdcChange(event)} placeholder="0"/>
                    <p className='user-balance' onClick={inputFullBalance}>Balance: {userBalanceA}</p>
                </div>
            </div>
            <div className='switch-inputs'>
                <button className='switch-btn' onClick={(event) => switch_inputs(event)}><span>&#8593;</span><span>&#8595;</span></button>
            </div>
        </div> 
    )
}  

export default App;

