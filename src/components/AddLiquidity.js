import {useState, useEffect} from 'react'
import '../styles/addLiquidity.css'
// import '../styles/inputA.css'
import usdtImage from '../images/usdt.png'
import usdcImage from '../images/usdc.png'
const Web3 = require('web3')
const BigNumber = require('bignumber.js');


function App({reserve0, setReserve0, reserve1, setReserve1, amm, usdcBalance, usdtBalance,
    liquidityPoolBalance, usdcLiq, usdtLiq, signer, inputALiq, 
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

    const [usdtApproval, setUsdtApproval] = useState(0)
    const [usdcApproval, setUsdcApproval] = useState(0)

    const [allowanceA, setAllowanceA] = useState(0)
    const [allowanceB, setAllowanceB] = useState(0)

    useEffect(() => {  
        const getReserves = async () => {
            const reserve_00 = new BigNumber(await amm.reserve0()).toFixed()
            const reserve_11 = new BigNumber(await amm.reserve1()).toFixed()
            setReserve_0(reserve_00)
            setReserve_1(reserve_11)
        }
        getReserves()
        liquidityPoolBalance()
        getAllowanceA()
        getAllowanceB()
    }, [isApprovedA, isApprovedB, inputA, inputB, reserve0, reserve1, usdc_balance, 
    usdt_balance, allowanceA, allowanceB])

    const checkAllowance =  async() => {
        const getAllowanceA = await usdc_contract.allowance(signer.address, amm.target)
        const getAllowanceB = await usdt_contract.allowance(signer.address, amm.target)

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
        // const bigSpend = new BigNumber(5000000000000000000)
        // console.log(bigSpend.toFixed())
        const approveA = await usdt_contract.approve(amm.target, converted_input_a)
        await approveA.wait()
        setApprovedA(true)
     
    }

    const approveB = async () => {
        const converted_input_b = Web3.utils.toWei(inputB, 'ether')
        // const bigSpend = new BigNumber(7000000000000000000)
        // console.log(bigSpend.toFixed())
        const approveB = await usdc_contract.approve(amm.target, converted_input_b)   
        await approveB.wait() 
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
        const check_allowance_a = parseInt(await getAllowanceA())
        const check_allowance_b = parseInt(await getAllowanceB())
        const testA = new BigNumber(check_allowance_a).toFixed()
        const testB = new BigNumber(check_allowance_b).toFixed()

        if (reserve0 != 0) {
            const [dx, dy] = await getRatio(converted_reserve0, converted_reserve1)
            const addLiquidity = await amm.addLiquidity(dx, dy)
        } else if (reserve0 == 0){
            const converted_a = Web3.utils.toWei(inputA, 'ether')
            const converted_b = Web3.utils.toWei(inputB, 'ether')
            const bigNumberA = new BigNumber(converted_a)
            const bigNumberB = new BigNumber(converted_b)
            const addLiquidity = await amm.addLiquidity(bigNumberA.toFixed(), bigNumberB.toFixed())
        }
        usdtBalance()
        usdcBalance()
    }

    const getAllowanceA = async () => {
        const getAllowanceA = await usdt_contract.allowance(signer.address, amm.target)
        const converted_a = new BigNumber(getAllowanceA).toFixed() / 10 ** 18
        setUsdtApproval(converted_a)
        setAllowanceA(converted_a)
        return getAllowanceA
    }

    const getAllowanceB = async () => {
        const getAllowanceB = await usdc_contract.allowance(signer.address, amm.target)
        const converted_b = new BigNumber(getAllowanceB).toFixed() / 10 ** 18
        setUsdcApproval(converted_b)
        setAllowanceB(converted_b)
        return getAllowanceB
    }

    const setUsdc = async (inputValueA) => {
        const [reserve0, reserve1] = await getReserves()
        const convert_reserve0 = new BigNumber(reserve0).toFixed()
        const convert_reserve1 = new BigNumber(reserve1).toFixed()
        const ratio = convert_reserve1 / convert_reserve0
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
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 0.5 seconds
        const resetB = await usdt_contract.approve(amm.target, '0')
        setApprovedA(false)
        setApprovedB(false)
    }
        
    const approve_a = async () => {
        console.log(usdt_contract, 'usdt contract in approve_a')
        const a_converted = new BigNumber(2000000000000000000)
        console.log(a_converted.toFixed(), 'a_converted')
        const approveA = await usdt_contract.approve(amm.target, a_converted.toFixed())

    }
    const approve_b = async () => {
        console.log(usdc_contract, 'usdc_contract in approve_b')
        const b_converted = new BigNumber(7000000000000000000)
        console.log(b_converted.toFixed(), 'b_converted')
        const approveB = await usdc_contract.approve(amm.target, b_converted.toFixed())

    }  
    const add = async () => {
        console.log(usdt_contract, 'usdt_contract in add')
        console.log(usdc_contract, 'usdc_contract in add')
        const a_converted = new BigNumber(2000000000000000000)
        const b_converted = new BigNumber(7000000000000000000)
        // const a_test = new BigNumber(Web3.utils.toWei(10, 'ether'))
        // const b_test = new BigNumber(Web3.utils.toWei(18, 'ether'))
        // console.log(a_test.toString())
        // console.log(b_test.toString())
        //try deploying the contract with flipping around the usdc/usdt arguments
        //yea that's probably it, see the constructor code
        // constructor(address _token0, address _token1) {
        //     token0 = IERC20(_token0);
        //     token1 = IERC20(_token1);
        // }
        //token 0 == usdc token 1 == usdt
        //have to either flip around deployment or flip around the html input
        const addLiquidity = await amm.addLiquidity(a_converted.toFixed(), b_converted.toFixed(), 
        )
        console.log(addLiquidity)
    }

    return (
        <div className='add-liquidity'>
            {/* <p>reserve 0: {reserve_0 / 10 ** 18}</p>
            <p>reserve 1: {reserve_1 / 10 ** 18}</p> */}
            <div className='selected-token-a'>
                <div className='btn-div'>
                    <button>
                        <img src={usdtImage}></img>
                        <p>USDT</p>
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
                    </button>
                </div>
                <div className='selected-token-b-input'>
                    <input value={usdcValue} onChange={(event) => handleUsdcChange(event)} placeholder='0'/>
                    <p>Balance: {usdc_balance}</p>
                </div> 
            </div>
            <div>
                {/* <button onClick={resetAllowances}>reset allowances</button>
                <p>allowance A: {allowanceA}</p>
                <p>allowance B: {allowanceB}</p> */}
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
            {/* <button onClick={approve_a}>approve_a</button>
            <button onClick={approve_b}>approve_b</button>
            <button onClick={add}>add liq</button> */}

        </div>
    )
} 

export default App;