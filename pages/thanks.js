import React from 'react'
import Image from 'next/image'
import gif from '../assets/blink.gif'
import { UberContext } from "../context/uberContext";
import { useContext,useEffect } from 'react';

const style = {
    container:` w-full flex flex-col justify-center items-center relative overflow-hidden h-screen bg-gray-300 `,
    boundary:`h-[70vh] pb-16 mt-6 border-6 border-slate-200 md:w-[35vw] md:h-[72vh] relative bg-white rounded-2xl shadow-2xl shadow-purple-500`,
    upperHalf:`h-[40vh] grid justify-items-center flex-1 `,
    tick:`mt-6`,
    heading:`font-mono text-6xl font-extrabold text-center my-2 uppercase`,
    lowerHalf:`h-[35vh] flex-1 grid justify-items-center`,
    details:`font-mono px-3 text-xl text-center md:mb-4 text-cyan-800 md:text-3xl text-bold`,

    homeButton:`sm:w-[30vw] md:py-2 text-lg font-bold text-white  bg-cyan-500 rounded-full shadow-xl shadow-purple-200  text-center h-[6.5vh] cursor-pointer transition ease-in-out delay-150 bg-cyan-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300 px-4 pt-3`,
}

const Thanks = () => {

  const {orderStatus} = useContext(UberContext);

  console.log(orderStatus)



  return (

   

    <div className={style.container}>
   
        <div className={style.boundary}>
        
        <div className={style.upperHalf}>
           
            <Image src={gif}
            alt=""
            className={style.gif}
           height={250}
           width={395}/> 
        </div>
        <div className={style.lowerHalf}>
            <div className={style.details}>Thanks for being awesome,we hope you enjoy your ride!</div>
           
            <a className={style.homeButton}
              target='_blank'
              rel='noreferrer'
              href={`https://rinkeby.etherscan.io/tx/${orderStatus}`}
            >View Transactions details on Etherscan</a>
        </div>
        </div>
        
    </div>


  )
}

export default Thanks