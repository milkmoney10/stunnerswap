import './App.css';
import swapABI from './artifacts/contracts/AMM.sol/AMM.json'
import tokenABI from './artifacts/contracts/Token.sol/MyToken.json'
import {ethers} from 'ethers'
import Faucet from './components/Faucet'
import Navbar from './components/Navbar'
import AMM from './components/AMM'
import React, {useState, useEffect, useRef} from 'react'
import './styles/main.css'
import audioFile from './images/stonecoldentrance.mp3'
const BigNumber = require('bignumber.js');

  
function App() { 
 

  const [whatVisible, setWhatVisible] = useState(false)
  const [randomPosition, setRandomPosition] = useState({ top: 0, left: 0 });

  const [showLiquidityPage, setShowLiquidityPage] = useState(false)
  const [showAMMPage, setShowAMMPage] = useState(true)

  const [usdc_balance, set_usdc_balance] = useState(0);
  const [usdt_balance, set_usdt_balance] = useState(0);
 
  const [usdc_contract, set_usdc_contract] = useState(null)
  const [usdt_contract, set_usdt_contract] = useState(null)
  const [swap_contract, set_swap_contract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const provider_test = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/k1nf0oOfrryTLAt7fKP2NUENWS98YNH0")
  // const provider_local = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545")
  // const privateKey_ganache = '0xb796fd969089d681ac8e44ac229fdd263fc517e23fdf0e42a4b18ed672c4c537'
  // const signer = new ethers.Wallet(privateKey_ganache, provider_local)

  const swap_abi = swapABI['abi']
  const swapCA = '0x344841c3cE01A4027386a2372a8462D01D7D6A84'
  // const swap_contract = new ethers.Contract(swapCA, swap_abi, signer)
  
  const usdcABI = tokenABI['abi']
  const usdcCA = '0x0cd527ECD88F19adfb6A471d6450e52743a3F096'
  // const usdc_contract = new ethers.Contract(usdcCA, usdcABI, signer)

  const usdtABI = tokenABI['abi']
  const usdtCA = '0x97258eA3e2F2742141569A83616A8291eA193484'
  // const usdt_contract = new ethers.Contract(usdtCA, usdtABI, signer)
  useEffect(() => {
    //remove these functions calls when not using ganache
      // usdtBalance()
      // usdcBalance()

      async function get_signer() {
        let provider;
        let signer; 
        try {
          if (window.ethereum == null){
            console.log('metamask not installed')
            provider = ethers.getDefaultProvider();
            setProvider(provider)
          } else {
            provider = new ethers.BrowserProvider(window.ethereum)
            setProvider(provider)
            signer = await provider.getSigner()
            setSigner(signer)
          }
        } catch(error){
          console.log(error, 'error')
        }
      }
      get_signer()

      // usdcBalance()
      // usdtBalance()

      const intervalId = setInterval(() => {
        setWhatVisible((prev) => !prev); // Toggle visibility
        
        if (!whatVisible) {
          const parentWidth = window.innerWidth;
          const parentHeight = window.innerHeight;
          const newPosition = {
            top: Math.random() * (parentHeight - 100), // Adjusted to prevent overflow
            left: Math.random() * (parentWidth - 200), // Adjusted to prevent overflow
          };
          setRandomPosition(newPosition);
        }
      }, 1000);
  
      return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [usdc_balance, showLiquidityPage, setShowLiquidityPage, showAMMPage
 ])


 useEffect(() => {
  if (signer){
    async function get_contracts() {
      const swapContract = new ethers.Contract(swapCA, swap_abi, signer)
      const usdcContract = new ethers.Contract(usdcCA, usdcABI, signer)
      const usdtContract = new ethers.Contract(usdtCA, usdtABI, signer)
      set_swap_contract(swapContract)
      set_usdc_contract(usdcContract)
      set_usdt_contract(usdtContract)
    }
    get_contracts()
  }
 }, [signer])

 useEffect(() => {
  //check first if usdc_contract exists
  if (usdc_contract) {
    async function getBalances() {
        try {
            const usdc_balance = await usdcBalance()
            set_usdc_balance(usdc_balance)
            const usdt_balance = await usdtBalance()
            set_usdt_balance(usdt_balance)
            //original code below
            // set_usdt_balance(Number(usdt_balance))
            // set_usdc_balance(Number(usdc_balance))
        } catch(error) {
            console.log('error fetching usd balance')
        }  
    } 
    getBalances()
  }
 }, [signer, usdc_contract])


  const usdcBalance = async () => {
    try {
        // const getBalance = parseInt(await usdc_contract.balanceOf(signer.address)).toFixed()
        // set_usdc_balance(Number(getBalance))
        // return Number(getBalance)

        const getBalance = new BigNumber(await usdc_contract.balanceOf(signer.address)) / 10 ** 18
        set_usdc_balance(getBalance.toFixed())
        return getBalance.toFixed()
      } catch(error){
          console.log(error)
      }
  }
  const usdtBalance = async () => {
    
      try {
          // const getBalance = parseInt(await usdt_contract.balanceOf(signer.address))
          const getBalance = new BigNumber(await usdt_contract.balanceOf(signer.address)) / 10 ** 18
          set_usdt_balance(getBalance.toFixed())
          // set_usdt_balance(Number(getBalance))
          return getBalance.toFixed()
      } catch(error){
        console.log(error) 
      }
  }

  return (
    <section className="main-section">

      {/* <div style={{position: 'absolute', height: '100vh'}}>
        {whatVisible && (
       
          <p style={{
            position: 'absolute', 
            top: randomPosition.top, 
            left: randomPosition.left,
            zIndex: '99',
            fontSize: '75px',
            color: 'black'

          }}>WHAT?</p> 
        
        )}
      </div> */}
    
      <Navbar 
      setShowLiquidityPage={setShowLiquidityPage}
      setShowAMMPage={setShowAMMPage}
      usdcBalance={usdcBalance}
      usdtBalance={usdtBalance}
      usdc_contract={usdc_contract}
      usdt_contract={usdt_contract}
      signer={signer}
      usdcABI={usdcABI}
      usdcCA={usdcCA}
      />
      <audio controls>
        <source src={audioFile} type='audio/mp3'/>
        Your browser does not support the audio element
      </audio>
      <Faucet 
        signer={signer}
        usdc_contract={usdc_contract}
        usdt_contract={usdt_contract}
        usdc_balance={usdc_balance}
        usdt_balance={usdt_balance}
        usdcBalance={usdcBalance}
        usdtBalance={usdtBalance} 
      />
        <div className="app">
      <AMM 
        signer={signer}
        usdc_contract={usdc_contract}
        usdt_contract={usdt_contract}
        amm={swap_contract}
        usdc_balance={usdc_balance}
        usdt_balance={usdt_balance}
        set_usdc_balance={set_usdc_balance}
        set_usdt_balance={set_usdt_balance}
        usdcBalance={usdcBalance}
        usdtBalance={usdtBalance}
        setShowAMMPage={setShowAMMPage}
        setShowLiquidityPage={setShowLiquidityPage}
        showAMMPage={showAMMPage}
        showLiquidityPage={showLiquidityPage}
        usdcCA={usdcCA}
        usdcABI={usdcABI}
      />
    </div>
    </section>
    
  ); 
}

export default App;
