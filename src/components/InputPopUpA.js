import React, { useRef, useEffect, useState } from 'react';
import "../styles/inputPopUpA.css"
// import usdt from '../images/usdt.png'
// import usdc from '../images/usdc.png'


function App({
    showNewScreenA, setShowNewScreenA, buttonRefA, isVisibleA, setIsVisibleA, 
    isSelectedTokenA, setIsTokenSelectedA, setSelectedTokenA, 
selectedTokenA, setInputAContract, usdt_contract, usdc_contract, availableTokens, 
setAvailableTokens, setUpdatedAvailableTokens, updatedAvailableTokens, userBalanceA, 
setUserBalanceA, usdt_balance, usdc_balance, setTest, setTest2}) {

    const inputPopUpRefA = useRef(null);    
    const tokenRefs = {};

    useEffect(() => { 
        function handleClick(event){
            // closes pop up if click is outside of buttonRefA and inputPopUpA
            if (!inputPopUpRefA.current.contains(event.target) &&
            !buttonRefA.current.contains(event.target))
             {  
                setShowNewScreenA(false)
                setIsVisibleA(false)
            }
           
            if (tokenRefs['usdt'] && tokenRefs['usdt'].contains(event.target)) {
                setIsTokenSelectedA(true)
                setIsVisibleA(false)
                setShowNewScreenA(false)
                setSelectedTokenA('usdt')
                setInputAContract(usdt_contract)
                console.log(usdt_balance)
                setUserBalanceA(usdt_balance)
            } 
            if (tokenRefs['usdc'] && tokenRefs['usdc'].contains(event.target)){

                //if event.target is usdc, then set selected token, 
                //set invisible, hide token list, etc
                setIsTokenSelectedA(true)
                setIsVisibleA(false)
                setShowNewScreenA(false)
                setSelectedTokenA('usdc') 
                setInputAContract(usdc_contract)
                setUserBalanceA(usdc_balance)
            }

        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [tokenRefs])
   
   
    return (
        <div ref={inputPopUpRefA}  
        className='inputPopUpContainerA'>   
            {showNewScreenA && (
                <div className='popupA'>
                    <div className='token-list' name='testing'>
                        <p>Token List</p>
                        {updatedAvailableTokens.map((token, index) => (
                            <div className='token' ref={(ref) => (tokenRefs[token] = ref)}>
                                <div className='image-container'>
                                    <img src={require(`../images/${token}.png`)}></img>
                                </div>
                                <div className='name-container'>
                                    <p style={{textTransform: 'uppercase'}}>{token}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;