import '../styles/navbar.css'
import logo from '../images/stunnerSwap6.png'

function App({setShowLiquidityPage, setShowAMMPage}) { 
    
    const handleAddLiquidityClick = () => {
        console.log('click hit')
        setShowAMMPage(false)
        setShowLiquidityPage(true)
         
    }

    const handleShowSwapPageClick = () => {
        setShowLiquidityPage(false)
        setShowAMMPage(true)
        //
    }

    return (
        <nav className='navbar'>
            <div className='title'>
                <img src={logo}></img>
            </div>
            <div className='navigation-links'>
                <ul>
                    <li>
                        <a onClick={handleShowSwapPageClick}>Swap</a>
                    </li>
                    <li>
                        <a onClick={handleAddLiquidityClick}>Add Liquidity</a>
                    </li>
                    <li>
                        <a>Claim USDT</a>
                    </li>
                    <li>
                        <a>Claim USDC</a>
                    </li>
                </ul>
            </div>
            <div className='wallet'>
                <p>metamask wallet</p>
            </div>
        </nav>
    )

}

export default App; 