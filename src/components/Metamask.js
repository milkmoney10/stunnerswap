import React, {useState, useRef, useEffect} from 'react'
import detectEthereumProvider from "@metamask/detect-provider";
import '../styles/metamask.css'
import { useSDK, MetaMaskProvider, useMetaMask } from '@metamask/sdk-react';
import { ethers } from 'ethers'
import Web3 from 'web3';
const BigNumber = require('bignumber.js');

function App({usdcABI, usdcCA}){
    // A Provider is a read-only connection to the blockchain, which allows querying 
    // the blockchain state, such as account, block or transaction details, querying 
    // event logs or evaluating read-only code using call.

    // A Signer wraps all operations that interact with an account. An account generally 
    // has a private key located somewhere, which can be used to sign a variety of 
    // types of payloads.

    // The private key may be located in memory (using a Wallet) or protected via some 
    // IPC layer, such as MetaMask which proxies interaction from a website to a browser 
    // plug-in, which keeps the private key out of the reach of the website and only 
    // permits interaction after requesting permission from the user and receiving 
    // authorization.

    // A Contract is a program that has been deployed to the blockchain, which includes 
    // some code and has allocated storage which it can read from and write to.

    // It may be read from when it is connected to a Provider or state-changing 
    // operations can be called when connected to a Signer.

    // https://docs.ethers.org/v6/getting-started/


    // const [account, setAccount] = useState('')
    // const { sdk, connected, connecting, provider, chainId} = useSDK()

    const [hasProvider, setHasProvider] = useState(null);
    const initialState = { accounts: [], balance: "", chainId: "" };
    const [wallet, setWallet] = useState(initialState);

    const [isConnecting, setIsConnecting] = useState(false);  
    const [error, setError] = useState(false);                
    const [errorMessage, setErrorMessage] = useState("");     

    useEffect(() => {
        const refreshAccounts = (accounts) => {
            if (accounts.length > 0) {
                updateWallet(accounts);
            } else {
                // if length 0, user is disconnected
                setWallet(initialState);
            }
        }; 

        const refreshChain = (chainId) => {
            setWallet((wallet) => ({ ...wallet, chainId }));
        };

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));

            if (provider) {
                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                refreshAccounts(accounts);
                window.ethereum.on("accountsChanged", refreshAccounts);
                window.ethereum.on("chainChanged", refreshChain);
            }
        };

        getProvider();

        return () => {
            window.ethereum?.removeListener("accountsChanged", refreshAccounts);
            window.ethereum?.removeListener("chainChanged", refreshChain);
        };
    }, []);

    const updateWallet = async (accounts) => {
        const balance = formatBalance(
            await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            })
        );
        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        });
        setWallet({ accounts, balance, chainId });
    };

    const handleConnect = async () => {                   
        setIsConnecting(true);                             
        await window.ethereum
            .request({                                     
                method: "eth_requestAccounts",
            })
            .then((accounts) => {                       
                setError(false);                            
                updateWallet(accounts);                     
            })                                              
            .catch((err) => {                          
                setError(true);                             
                setErrorMessage(err.message);               
            });                                             
        setIsConnecting(false);                             
    };
 
    const disableConnect = Boolean(wallet) && isConnecting;

    const formatBalance = (rawBalance) => {
        const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
        return balance;
    };
    
    const formatChainAsNum = (chainIdHex) => {
        const chainIdNum = parseInt(chainIdHex);
        return chainIdNum;
    };

    const disconnectWallet = async (wallet) => {
        await window.ethereum.request({
            method: "wallet_revokePermissions",
            params: [
                {
                    eth_accounts: {wallet}
                }
            ]
        })
    }

    return (
        <div className="metamask">
     
            {/* <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
            </div> */} 

            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && ( 
                <button className='connect' disabled={disableConnect} onClick={handleConnect}>
                    Connect MetaMask
                </button>
            )}

            {wallet.accounts.length > 0 && (
                <>
                    <p></p>
                    {/* <p>Connected {wallet.accounts[0]}</p> */}
                    <button className='disconnect' onClick={() => disconnectWallet(wallet)}>Connected {wallet.accounts[0].substring(0, 4)}...{wallet.accounts[0].substring(wallet.accounts[0].length - 4)}</button>
                    {/* <div>Wallet Balance: {wallet.balance}</div> */}
                    {/* <div>Hex ChainId: {wallet.chainId}</div> */}
                    {/* <div>
                        Numeric ChainId: {formatChainAsNum(wallet.chainId)}
                    </div> */}
                </>
            )}
            {error && (  
                <div onClick={() => setError(false)}>
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}
           
            {/* <button onClick={getEthBalance}>test</button> */}
        </div> 
    )
}

export default App;