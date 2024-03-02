import {useEffect, useState} from 'react'
import '../styles/inputB.css'
import usdtImage from '../images/usdt.png'
import usdcImage from '../images/usdc.png'


function App({setUsdtLiq, buttonRefB, isVisibleB, setShowNewScreenB, setIsVisibleB, 
isSelectedTokenB, setSelectedTokenB, selectedTokenB, setInputBLiq, usdc_contract, 
setInputBContract, usdt_contract, usdc_balance, usdt_balance, inputValueA,
setInputValueA, inputValueB, setInputValueB, inputBLiq, 
set_usdt_balance, set_usdc_balance, userBalanceB, setUserBalanceB}){

    const [displayBalance, setDisplayBalance] = useState(0)

    useEffect(() => {

    }, [inputBLiq, setInputBLiq, setInputValueB, setInputValueA, inputValueB, inputValueA])

    const handleChange = () => {

        if (!isVisibleB){
    
            // console.log('isVisibleB=False, inputB.js')
            setShowNewScreenB(true)
            setIsVisibleB(true) 
        } else {    
            // console.log('isVisibleB=True, inputB.js')
            setShowNewScreenB(false)
            setIsVisibleB(false)
        }
    }

    const handleUsdtChange = (event) => {
        try {   
            setInputBLiq(event.target.value)
            setInputValueB(event.target.value)
            
            setInputValueA(event.target.value) 
        
            if (buttonRefB.current.name == 'usdt') {
                setInputBLiq(event.target.value)
                // setInputBContract(usdt_contract)
                
            } else if (buttonRefB.current.name == 'usdc') {
                setInputBLiq(event.target.value)
            } 
            else {
                setInputBLiq(event.target.value)
                console.log('no token selected')
                //no token selected
            }
        } catch(error) {
            console.log(error)
        }
    }

    const inputFullBalance = async (event) => {
        const text = event.target.textContent
        const extractedNumber = text.match(/\d+/)[0];
        console.log(parseInt(extractedNumber))
        setInputValueB(extractedNumber)
    }

    return(
        <div className='container'>
            <div className='inputB-container'>
    
            {isSelectedTokenB ? 
                (
                    selectedTokenB == 'usdt' ? (
                        <div className='selected-token'>
                            <button ref={buttonRefB} name='usdt' onClick={() => handleChange()} className='token-icon-usdt'>
                                <img src={usdtImage}></img>
                                <p>USDT</p>
                                <span className="icon">&#9660;</span>
                            </button>

                        </div>                    
                        ) : (
                            <div className='selected-token'>
                                <button ref={buttonRefB} name='usdc' onClick={() => handleChange()} className='token-icon-usdc'>
                                <img src={usdcImage}></img>
                                <p>USDC</p>
                                <span className="icon">&#9660;</span>
                                </button>
                            </div>                    
                        )
                ) : (
                    <button ref={buttonRefB} onClick={() => handleChange()} className='custom-buttonB'>
                        <p>Select Token</p>
                        <span className="icon">&#9660;</span>
                    </button>
                )
            }
                <div className='input-wrapper'>
                    <input value={inputValueB} type="text" onChange={(event) => handleUsdtChange(event)} placeholder="0"/>
                    <p className='user-balance' onClick={inputFullBalance}>Balance: {userBalanceB}</p>
                </div>               
                
            </div>
        </div>
    )
}

export default App;