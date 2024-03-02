import React, { useState, useRef, useEffect } from 'react';
import "../styles/inputPopUpB.css"
import usdtPng from '../images/usdt.png'
import usdcPng from '../images/usdc.png'

function App({
    showNewScreenB, setShowNewScreenB, buttonRefB, isVisibleB, setIsVisibleB, 
setIsVisibleA, isVisibleA, setIsTokenSelectedB, setSelectedTokenB, 
setInputBContract, usdt_contract, usdc_contract, availableTokens, setAvailableTokens, 
setUpdatedAvailableTokens, updatedAvailableTokens, userBalanceB, setUserBalanceB, usdt_balance, 
usdc_balance, signer}) {

    const inputPopUpRefB = useRef(null);
    const tokenRefs = {};
    // console.log(availableTokens)
    useEffect(() => {

        function handleClick(event){
            // console.log(tokenRefs)
            // closes pop up if click is outside of buttonRefA and inputPopUpA
            if (!inputPopUpRefB.current.contains(event.target) &&
            !buttonRefB.current.contains(event.target))
             {  

                setShowNewScreenB(false)
                setIsVisibleB(false)
            }
           
             
            
            if (tokenRefs['usdt'] && tokenRefs['usdt'].contains(event.target)) {
                //if event.target is usdt, then set selected token, 
                //set invisible, hide token list, etc
                setIsTokenSelectedB(true)
                setIsVisibleB(false)
                setShowNewScreenB(false)
                setSelectedTokenB('usdt')
                setInputBContract(usdt_contract)
                
                setUserBalanceB(usdt_balance)
                //updates which tokens are displayed in the inputA popup
                // const newTokensList = availableTokens.filter(token => token !== 'usdt')
                // setUpdatedAvailableTokens(newTokensList)

                // setAvailableTokens(updatedAvailableTokens)
            } 
            if (tokenRefs['usdc'] && tokenRefs['usdc'].contains(event.target)){
                //if event.target is usdc, then set selected token,  
                //set invisible, hide token list, etc
                setIsTokenSelectedB(true)
                setIsVisibleB(false) 
                setShowNewScreenB(false)
                setSelectedTokenB('usdc')
                setInputBContract(usdc_contract)
                setUserBalanceB(usdc_balance)
                //updates which tokens are displayed in the inputA popup
                // const newTokensList = availableTokens.filter(token=> token !== 'usdc')
                // setUpdatedAvailableTokens(newTokensList)
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [tokenRefs])
   
    return (
        <div ref={inputPopUpRefB} 
        class='inputPopUpContainerB'>
            {showNewScreenB && (
                <div className='popupA'>
                    <div className='token-list'>
                        <p>Token List</p>
                        {updatedAvailableTokens.map((token, index) => (
                            <div className='token'
                            ref={(ref) => (tokenRefs[token] = ref)}>
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