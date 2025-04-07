import React from 'react'
import { useRouter } from 'next/router';
import img from '../assets/metamask2.webp'
import Image from 'next/image';
import { UberContext } from "../context/uberContext";
import { useContext,useEffect } from 'react';


const style = {
  wrapper1: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-xl md:text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
  loginContent2: `text-2xl md:text-3xl font-bold text-center mt-14`,
}
const Metamask = () => {
  const {isThere,connectWallet,currentAccount} = useContext(UberContext);

  const router = useRouter();
  
  {currentAccount ? (
      router.push('/')
   ):("")}

  return (
    <div className={style.wrapper1}>
        {isThere?(
           <div className={style.loginContainer}>
           <Image src={img} alt="logo" width={200} height={200} />
           <div
             className={style.walletConnectButton}
             onClick={() => connectWallet()}
           >
             Connect Wallet
           </div>
           <div className={style.loginContent}>Connect to Metamask.</div>
         </div>
        ):(
          <div className={style.loginContainer}>
          <Image src={img} alt="logo" width={200} height={200} />
          {/* <div className={style.loginContent}> */}
            <div
            className={style.loginContent2}
             
            >
              You must install Metamask, a <br /> virtual Ethereum wallet, in your
              browser.
            </div>
            <a className={style.walletConnectButton}
              target='_blank'
              rel='noreferrer'
              href={`https://metamask.io/download.html`}
            >
              Click here to download
            </a>
        </div>
        )}
    </div>
  )
}

export default Metamask