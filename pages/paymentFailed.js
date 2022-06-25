import React from 'react'
import tick from '../assets/red-cross.png'
import Image from 'next/image'
import { useRouter } from 'next/router';
const style = {
    container:` w-full flex flex-col justify-center items-center relative overflow-hidden h-screen bg-gray-300 `,
    boundary:`h-[70vh] pb-16 mt-6 border-6 border-slate-200 md:w-[35vw] md:h-[72vh] relative bg-white rounded-full shadow-2xl shadow-purple-500 `,
    upperHalf:`h-[35vh] grid justify-items-center flex-1`,
    tick:`mt-10`,
    heading:`font-mono text-6xl font-extrabold text-center my-2 uppercase`,
    lowerHalf:`h-[35vh] flex-1 grid justify-items-center`,
    details:`font-mono px-3 text-xl text-center md:mt-3 md:mb-4 text-cyan-800 md:text-3xl text-bold`,
 
    homeButton:`w-[25vw] md:w-[12vw] md:py-2 text-lg font-bold text-white  bg-cyan-500 rounded-full shadow-xl shadow-purple-200  text-center h-[6.5vh] cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 `,
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
