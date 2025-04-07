import React from 'react'
import tick from '../assets/red-cross.png'
import Image from 'next/image'
import { useRouter } from 'next/router';
const style = {
    container:` w-full flex flex-col justify-center items-center relative overflow-hidden h-screen md:bg-gray-300 `,
    boundary:`h-[520px] w-[520px] pb-16 mt-6 border-6 border-slate-200  relative bg-white md:rounded-full md:shadow-2xl md:shadow-purple-500 md:scale-105`,
    upperHalf:`h-1/2 grid justify-items-center flex-1`,
    tick:`mt-10`,
    heading:`font-mono text-6xl font-extrabold text-center my-2 uppercase`,
    lowerHalf:`h-1/2 flex-1 grid justify-items-center`,
    details:`h-1/2 font-mono px-3 text-2xl text-center md:mt-3 md:mb-4 text-cyan-800 md:text-3xl text-bold`,
 
    homeButton:`h-1/2 pt-2 px-4 md:py-2 text-lg font-bold text-white  bg-cyan-500 rounded-full shadow-xl shadow-purple-200  text-center cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 `,
}

const PaymentFailed = () => {

  const router = useRouter();
  return (
   

    <div className={style.container}>
   
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
            {/* <Link href="/Ride" as="/ride" replace> */}
            <div className={style.homeButton} onClick={() => router.back()}>Back to Home</div>
            {/* </Link> */}
        </div>
        </div>
        
    </div>


  )
}

export default PaymentFailed
