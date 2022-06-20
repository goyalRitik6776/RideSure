import React from 'react'
import img from '../assets/image.svg'
import tick from '../assets/red-cross.png'
import Image from 'next/image'
import Link from "next/link";

const style = {
    container:` w-full flex flex-col justify-center items-center relative overflow-hidden h-screen bg-gray-300 `,
    boundary:`h-[70vh] pb-16 mt-6 border-6 border-slate-200 md:w-[35vw] md:h-[72vh] relative bg-white rounded-full shadow-2xl shadow-purple-500 animate-pulse`,
    upperHalf:`h-[35vh] grid justify-items-center flex-1`,
    tick:`mt-10`,
    heading:`font-mono text-6xl font-extrabold text-center my-2 uppercase`,
    lowerHalf:`h-[35vh] flex-1 grid justify-items-center`,
    details:` px-3 text-xl text-center md:mt-3 md:mb-4 text-cyan-800 md:text-3xl text-bold`,
    // homeButton:`h-[6.5vh] text-center bg-black text-lg text-white px-4 py-2 rounded-2xl cursor-pointer hover:scale-110`,
    homeButton:`w-[15vw] py-2 text-lg font-bold text-white  bg-cyan-500 rounded-full shadow-xl shadow-purple-200  text-center h-[6.5vh] cursor-pointer hover:scale-105`,
}

const paymentFailed = () => {
  return (
   

    <div className={style.container}>
        {/* <Image src={img}
        className="absolute h-full w-full object-cover"
        layout='fill'/> */}
        <div className={style.boundary}>
        
        <div className={style.upperHalf}>
            <div className={style.tick}>
            <Image src={tick}
            alt=""
            className={style.img}
            height={60}
            width={60}/> </div>
            <h1 className={style.heading}>OOPS!</h1>
        </div>
        <div className={style.lowerHalf}>
            <div className={style.details}>Looks like your payment has failed.Please try again!</div>
            <Link href="/Ride">
            <div className={style.homeButton}>Back to Home</div></Link>
        </div>
        </div>
        
    </div>


  )
}

export default paymentFailed
