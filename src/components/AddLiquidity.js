import {useState, useEffect} from 'react'
import '../styles/addLiquidity.css'
// import '../styles/inputA.css'
import usdtImage from '../images/usdt.png'
import usdcImage from '../images/usdc.png'
const Web3 = require('web3')
const BigNumber = require('bignumber.js');


function App({reserve0, setReserve0, reserve1, setReserve1, amm, usdcBalance, usdtBalance,
    liquidityPoolBalance, usdcLiq, usdtLiq, wallet, inputALiq, 
    buttonRefA, usdc_contract, usdt_contract, buttonRefB, setInputBLiq, inputBLiq,
isSelectedTokenA, selectedTokenA, usdc_balance, usdt_balance}) {

    const [isLiquidityAdded, setLiquidityAdded] = useState(false)
    const [isApprovedA, setApprovedA] = useState(false)
    const [isApprovedB, setApprovedB] = useState(false)

    const [inputA, setInputA] = useState(null)
    const [inputB, setInputB] = useState(null)

    const [reserve_0, setReserve_0] = useState(0)
    const [reserve_1, setReserve_1] = useState(0)

    const [usdcValue, setUsdcValue] = useState(null)

     
    useEffect(() => { 
        console.log(usdc_balance)
        const getReserves = async () => {
            const reserve_00 = new BigNumber(await amm.reserve0()).toFixed()
            const reserve_11 = new BigNumber(await amm.reserve1()).toFixed()
            setReserve_0(reserve_00)
            setReserve_1(reserve_11)
        }
        getReserves()
        liquidityPoolBalance()

    }, [isApprovedA, isApprovedB, inputA, inputB, reserve0, reserve1, usdc_balance, 
    usdt_balance])


    //need to fix this function
    const checkAllowance =  async() => {
        const getAllowanceA = await usdc_contract.allowance(wallet.address, amm.target)
        const getAllowanceB = await usdt_contract.allowance(wallet.address, amm.target)

        if (getAllowanceA >= inputA){
        
            setApprovedA(true)
        } else {
            setApprovedA(false)
        }
        if (getAllowanceB >= inputB){
     
            setApprovedB(true)
        } else {
            setApprovedB(false)
        }
   
    }
    const approveA = async () => {
        const converted_input_a = Web3.utils.toWei(inputA, 'ether')
        const approveA = await usdc_contract.approve(amm.target, converted_input_a)
        setApprovedA(true)
    }

    const approveB = async () => {
        const converted_input_b = Web3.utils.toWei(inputB, 'ether')
        const approveB = await usdt_contract.approve(amm.target, converted_input_b)
        setApprovedB(true)
    }

    const getReserves = async () => {
        const reserve0 = await amm.reserve0()
        const reserve1 = await amm.reserve1()
        return [reserve0, reserve1]
    }

    const getRatio = async (x, y) => {
        const dx = new BigNumber(parseInt(inputA) * 10 ** 18).toFixed()
        const dy = new BigNumber((y * dx) / x).toFixed()
        return [dx, dy]
    }

    const addLiquidity1 = async () => {
        const [reserve0, reserve1] = await getReserves()
        const converted_reserve0 = new BigNumber(reserve0).toFixed()
        const converted_reserve1 = new BigNumber(reserve1).toFixed()
        if (reserve0 != 0) {
            const [dx, dy] = await getRatio(converted_reserve0, converted_reserve1)
            const addLiquidity = await amm.addLiquidity(dx, dy)
        } else if (reserve0 == 0){
            //fix isApproved() states on successful deposit
            const converted_a = Web3.utils.toWei(inputA, 'ether')
            const converted_b = Web3.utils.toWei(inputB, 'ether')
            const bigNumberA = new BigNumber(converted_a)
            const bigNumberB = new BigNumber(converted_b)
            const addLiquidity = await amm.addLiquidity(bigNumberA.toFixed(), bigNumberB.toFixed())
        }
    }

    const getAllowanceA = async () => {
        const getAllowanceA = await usdt_contract.allowance(wallet.address, amm.target)
        return getAllowanceA
    }

    const getAllowanceB = async () => {
        const getAllowanceB = await usdc_contract.allowance(wallet.address, amm.target)
        return getAllowanceB
    }

    const setUsdc = async (inputValueA) => {
        const [reserve0, reserve1] = await getReserves()
        const convert_reserve0 = new BigNumber(reserve0).toFixed()
        const convert_reserve1 = new BigNumber(reserve1).toFixed()
        const ratio = convert_reserve1 / convert_reserve0
        console.log(convert_reserve0)
        if (convert_reserve0 != 0){
            setUsdcValue(inputValueA * ratio)
            setInputB(inputValueA * ratio)

            const inputValueB = new BigNumber(Web3.utils.toWei(inputValueA * ratio, 'ether'))
            const allowanceB = new BigNumber(await getAllowanceB())
     
            if (inputValueB.isGreaterThan(allowanceB)){
                setApprovedB(false)
            } else if (inputValueB.isLessThanOrEqualTo(allowanceB)) {
                setApprovedB(true)
            }
        } 
        
    }

    const handleUsdtChange = async (event) => {
        setInputA(event.target.value)
        const inputValueA = new BigNumber(Web3.utils.toWei(event.target.value, 'ether'))
        const allowanceA = new BigNumber(await getAllowanceA())
        if (inputValueA.isGreaterThan(allowanceA)) {
            setApprovedA(false)
        } 
        else if (inputValueA.isLessThanOrEqualTo(allowanceA)){
            setApprovedA(true)
        }

        setUsdc(event.target.value)

    }

    

    const handleUsdcChange = async (event) => {
        setInputB(event.target.value)
        const inputValueB = new BigNumber(Web3.utils.toWei(event.target.value, 'ether'))
        const allowanceB = new BigNumber(await getAllowanceB())
        if (inputValueB.isGreaterThan(allowanceB)){
            setApprovedB(false)
        } else if (inputValueB.isLessThanOrEqualTo(allowanceB)) {
            setApprovedB(true)
        }
    }

    const resetAllowances = async () => {
        const resetA = await usdc_contract.approve(amm.target, '0')
        console.log(resetA)
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 0.5 seconds
        const resetB = await usdt_contract.approve(amm.target, '0')
        console.log(resetB)
        setApprovedA(false)
        setApprovedB(false)
    }

    const addLiquidity = async () => {
        try {   
            console.log('add liquidity hit')
            let contractA;
            let contractB;
            
            // if (buttonRefA.current.name == 'usdt') {
            //     contractA = usdt_contract
            // } else if (buttonRefA.current.name == 'usdc'){
            //     contractA = usdc_contract
            // } else {
            //     return null
            // }
            // if (buttonRefB.current.name == 'usdt') {
            //     contractB = usdt_contract
            // } else if (buttonRefB.current.name == 'usdc'){
            //     contractB = usdc_contract
            // } else {
            //     return null
            // }
            
            const reserve0 = await amm.reserve0()
            const reserve1 = await amm.reserve1()
            const ratio = 1 / (Number(reserve0) / Number(reserve1))
            console.log('hit')
            if (isNaN(ratio)){

                console.log('no existing liquidity, your entry will set ratio')
                console.log(inputALiq)
                console.log(inputBLiq)
                const converted_a = Web3.utils.toWei(inputALiq, 'ether')
                const converted_b = Web3.utils.toWei(inputBLiq, 'ether')
                console.log(converted_a)
                const bigNumberA = new BigNumber(converted_a)
                const bigNumberB = new BigNumber(converted_b)
                const addLiquidity = await amm.addLiquidity(bigNumberA.toString(), bigNumberB.toString())
                console.log('liquidity added')
                const get_reserve0 = await amm.reserve0()
                const get_reserve1 = await amm.reserve1()
                const totalSupply = await amm.totalSupply()
                setReserve0(Number(get_reserve0)) 
                setReserve1(Number(get_reserve1))
 
                 
            } else {
                console.log('add liq else hit')
                const x = BigNumber(await amm.reserve0()).toNumber()
                const y = BigNumber(await amm.reserve1()).toNumber()
                console.log(x, y)
                const dx = BigNumber(parseInt(inputALiq) * 10 ** 18).toString()
                console.log(inputALiq)
                const dy = BigNumber((y * dx) / x).toString()
                console.log(dx, dy)
                const addLiquidity = await amm.addLiquidity(dx, dy)
                
                // //grab reserve values here and then add them to the state
                const get_reserve0 = await amm.reserve0()
                const get_reserve1 = await amm.reserve1()
                setReserve0(Number(get_reserve0))
                setReserve1(Number(get_reserve1))
                // const totalShares = await amm.balanceOf(wallet.address)
                // console.log(totalShares)
            }
            usdcBalance()
            usdtBalance()
            liquidityPoolBalance()
        } catch(error) {     
            console.log(error)
        } 
    } 
        
    return (
        <div className='add-liquidity'>
            <p>{reserve_0}</p>
            <p>{reserve_1}</p>
            <div className='selected-token-a'>
                <div className='btn-div'>
                    <button>
                        <img src={usdtImage}></img>
                        <p>USDT</p>
                        {/* <span className="icon">&#9660;</span> */}
                    </button>
                </div> 
                <div className='selected-token-a-input'>
                    <input onChange={(event) => handleUsdtChange(event)} placeholder='0'/>
                    <p>Balance: {usdt_balance}</p>
                </div>
            </div>
            <div className='selected-token-b'>
                <div className='btn-div'>
                    <button>
                        <img src={usdcImage}></img>
                        <p>USDC</p>
                        {/* <span className="icon">&#9660;</span> */}
                    </button>
                </div>
                <div className='selected-token-b-input'>
                    <input value={usdcValue} onChange={(event) => handleUsdcChange(event)} placeholder='0'/>
                    <p>Balance: {usdc_balance}</p>
                </div> 
            </div>
            <div>
                <button onClick={resetAllowances}>reset allowances</button>
            </div>

            <div className='add-liquidity-approval-buttons'>
                {isApprovedA ? (
                    null
                ) : (
                    <button onClick={approveA}>Approve USDT</button>
                )}

                {isApprovedB ? (
                    null
                ) : (
                    <button onClick={approveB}>Approve USDC</button>
                )}
                {isApprovedA && isApprovedB && (
                    <button onClick={addLiquidity1}>Add Liquidity</button>
                )}
            </div>
       
            {/* <button onClick={resetAllowances}>reset allowances</button> */}
            {/* <button onClick={checkAllowance}>check allowance</button> */}
     
        </div>
    )

} 

export default App;