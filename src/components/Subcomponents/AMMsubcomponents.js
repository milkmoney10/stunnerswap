// use this in case anything breaks in AMM.js. this is the original js


// const [reserve0, setReserve0] = useState(0);
//     const [reserve1, setReserve1] = useState(0);
//     const [usdcLiq, setUsdcLiq] = useState(0)
//     const [usdtLiq, setUsdtLiq] = useState(0)

//     const x = new BigNumber(999999999999999900000)

//     useEffect(() => {

//         async function getLiquidityBalance() {
//             try{
//                 liquidityPoolBalance()
//             } catch(error) {
//                 console.log('get liquidity balance error hit')
//             }
//         }
//         getLiquidityBalance()
//         getReserves()
//     }, [])

//     const getReserves = async () => {
//         try {
//             const get_reserve0 = await amm.reserve0()
//             const get_reserve1 = await amm.reserve1()
//             setReserve0(Number(get_reserve0))
//             setReserve1(Number(get_reserve1))
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     const approve_usdc = async () => {
//         try {   
          
//             const USDCallowance = await usdc_contract.approve(amm.target, x.toString())
//             console.log(USDCallowance)
//         } catch(error) {    
//             console.log(error)
//         }
//     }
//     const approve_usdt = async () => {
//         try {   

//             const USDTallowance = await usdt_contract.approve(amm.target, x.toString())
//             console.log(USDTallowance)
//         } catch(error) {    
//             console.log(error)
//         }
//     }
//     const addLiquidity = async () => {
//         try {   
//             const reserve0 = await amm.reserve0()
//             const reserve1 = await amm.reserve1()
//             const ratio = 1 / (Number(reserve0) / Number(reserve1))
//             if (isNaN(ratio)){
//                 console.log('no existing liquidity, your entry will set ratio')
//                 const converted_usdc = Web3.utils.toWei(usdcLiq, 'ether')
//                 const converted_usdt = Web3.utils.toWei(usdtLiq, 'ether')
//                 const BNusdc = new BigNumber(converted_usdc)
//                 const BNusdt = new BigNumber(converted_usdt)

//                 const addLiquidity = await amm.addLiquidity(BNusdc.toString(), BNusdt.toString())
                
//                 const get_reserve0 = await amm.reserve0()
//                 const get_reserve1 = await amm.reserve1()
//                 const totalSupply = await amm.totalSupply()
//                 setReserve0(Number(get_reserve0))
//                 setReserve1(Number(get_reserve1))
      
//             } else {
//                 const x = BigNumber(await amm.reserve0()).toNumber()
//                 const y = BigNumber(await amm.reserve1()).toNumber()
 
//                 const dx = BigNumber(parseInt(usdcLiq) * 10 ** 18).toString()
//                 const dy = BigNumber((y * dx) / x).toString()
//                 const addLiquidity = await amm.addLiquidity(dx, dy)
//                 //grab reserve values here and then add them to the state
//                 const get_reserve0 = await amm.reserve0()
//                 const get_reserve1 = await amm.reserve1()
//                 setReserve0(Number(get_reserve0))
//                 setReserve1(Number(get_reserve1))
//                 const totalShares = await amm.balanceOf(wallet.address)
//                 console.log(totalShares)
//             }
        
//             usdcBalance()
//             usdtBalance()
//             liquidityPoolBalance()
//         } catch(error) {    
//             console.log(error)
//         }
//     }
    // const liquidityPoolBalance = async () => {
    //     try {   
    //         const reserve0 = await amm.reserve0()
    //         const reserve1 = await amm.reserve1()
    //         setReserve0(Number(reserve0))
    //         setReserve1(Number(reserve1))
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }
//     const swap_usdc = async () => {
//         try {
//             const swap = await amm.swap(usdc_contract.target, 100000000)
//             usdcBalance()
//             usdtBalance()
//             liquidityPoolBalance()
//         } catch(error) {
//             console.log(error)
//         }
//     }
//     const swap_usdt = async () => {
//         try {
//             const swap = await amm.swap(usdt_contract.target, 100000000)
//             usdcBalance()
//             usdtBalance()
//             liquidityPoolBalance()
//         } catch(error) {
//             console.log(error)
//         }
//     }
//     const removeLiquidity = async () => {
//         try {
//             const totalShares = BigNumber(await amm.balanceOf(wallet.address)).toString()
//             console.log(totalShares)
//             const removeLiquidity = await amm.removeLiquidity(totalShares)
//             liquidityPoolBalance()
//             usdcBalance()
//             usdtBalance()
//         } catch(error) {
//             console.log(error)
//         }
//     }
//     const handleUsdcChange = (event) => {
//         try {   
//             setUsdcLiq(event.target.value)
//         } catch(error) {
//             console.log(error)
//         }
//     }
//     const handleUsdtChange = (event) => {
//         try {   
//             setUsdtLiq(event.target.value)
//         } catch(error) {
//             console.log(error)
//         }
//     }