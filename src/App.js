import logo from './logo.svg';
import './App.css';
import swapABI from './artifacts/contracts/AMM.sol/AMM.json'
import tokenABI from './artifacts/contracts/Token.sol/MyToken.json'
import {ethers} from 'ethers'
import Faucet from './components/Faucet'
import Navbar from './components/Navbar'
import AMM from './components/AMM'
import AddLiquidity from './components/AddLiquidity'
import React, {useState, useEffect} from 'react'
import './styles/main.css'
  
function App() {
  const [whatVisible, setWhatVisible] = useState(false)
  const [randomPosition, setRandomPosition] = useState({ top: 0, left: 0 });

  const [showLiquidityPage, setShowLiquidityPage] = useState(true)
  const [showAMMPage, setShowAMMPage] = useState(true)

  const [usdc_balance, set_usdc_balance] = useState(0);
  const [usdt_balance, set_usdt_balance] = useState(0);

  const provider = new ethers.JsonRpcProvider("http://localhost:7545")
  const privateKey = '0xdae4f2fdcbc955ad735495380d1777bf853a65820441d043d7d7daf5c00bd981'
  const wallet = new ethers.Wallet(privateKey, provider)

  const swap_abi = swapABI['abi']
  const swapCA = '0xFeF1AC07483C9414FFf5E172514a22b62f19Bb32'
  const swap_contract = new ethers.Contract(swapCA, swap_abi, wallet)
  
  const usdcABI = tokenABI['abi']
  const usdcCA = '0xff9BD1A7BB6c762DdB8d4C93784Ee2BB780D8c9b'
  const usdc_contract = new ethers.Contract(usdcCA, usdcABI, wallet)

  const usdtABI = tokenABI['abi']
  const usdtCA = '0x2b1ceDE0912C7A72973f2d2152AdBeB28eB2a159'
  const usdt_contract = new ethers.Contract(usdtCA, usdtABI, wallet)

 
  useEffect(() => {
      async function getBalances() {
          try {
              const usdc_balance = await usdcBalance()
              set_usdc_balance(Number(usdc_balance))
              const usdt_balance = await usdtBalance()
              set_usdt_balance(Number(usdt_balance))
              console.log(usdc_balance)
          } catch(error) {
              console.log('error fetching usd balance')
          }
      }
      getBalances()


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

      
  }, [usdc_balance, showLiquidityPage, setShowLiquidityPage, showAMMPage])

  const usdcBalance = async () => {
      try {
          const getBalance = parseInt(await usdc_contract.balanceOf(wallet.address)) / 10 ** 18

          set_usdc_balance(Number(getBalance))
          return Number(getBalance)
      } catch(error){
          console.log(error)
      }
  }
  const usdtBalance = async () => {
      try {
          const getBalance = parseInt(await usdt_contract.balanceOf(wallet.address)) / 10 ** 18
          set_usdt_balance(Number(getBalance))
          return Number(getBalance)
      } catch(error){
          console.log(error)
      }
  }
  return (
    <section className="main-section">

      {/* <div style={{position: 'relative', height: '100vh'}}>
        {whatVisible && (
          <p style={{
            position: 'absolute', 
            top: randomPosition.top, 
            left: randomPosition.left,
            zIndex: '99',
            fontSize: '45px',
          }}>WHAT?</p>
        )}
      </div>
     */}
      <Navbar 
      setShowLiquidityPage={setShowLiquidityPage}
      setShowAMMPage={setShowAMMPage}
      />
     
      <Faucet 
        wallet={wallet}
        usdc_contract={usdc_contract}
        usdt_contract={usdt_contract}
        usdc_balance={usdc_balance}
        usdt_balance={usdt_balance}
        usdcBalance={usdcBalance}
        usdtBalance={usdtBalance} 
      />
      
        <div className="app">
      
      <AMM 
        wallet={wallet}
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
      />
    </div>
  
      
    </section>
    
  ); 
}

export default App;
