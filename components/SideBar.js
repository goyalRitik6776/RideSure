import Link from 'next/link'
import React, { useState,useEffect,useContext } from 'react'
import { UberContext } from "../context/uberContext";

const style = {
    wrapper:`'w-max absolute bg-white dark:bg-black top-0`,
    invisible:`invisible`,
    option:`flex items-center p-2 my-4 border-2 rounded-lg`,
    active:`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-600`,
}
const SideBar = ({sidebar,setr,r}) => {

    const {currentAccount,connectWallet } = useContext(UberContext);

  return (
  
<div className={`${style.wrapper} ${sidebar===false && style.invisible}`}>
    <div className="flex flex-col sm:flex-row sm:justify-start">
        <div className="w-max h-screen">
            <nav className="mt-4 pl-6 pr-8 ">
            <div className=" text-3xl font-medium text-white text-start border-b pb-2 pl-5 pr-4 mb-10 font-serif">
                        RideSure
                    </div>
                {/* <Link href='/ride'> */}
                <div className={style.option} onClick={()=>{setr(!r)}}>
                    <span className="mx-4 text-lg font-normal">
                        Ride
                    </span>

                </div>
                {/* </Link> */}
                <Link href='/rent'>
                <div className={style.option}>
                    <span className="mx-4 text-lg font-normal">
                        Rentals
                    </span>

                </div>
                </Link>
                {currentAccount?(
                      <a className={style.option} href="#" >
                      <span className="mx-4 text-lg font-normal" onClick={() => connectWallet()}>
                           Switch Account
                      </span>
                  </a>
                ):('')}
                <Link href = '/contact'>

                <div className={style.option}>
                    <span className="mx-4 text-lg font-normal">
                        Contact Us
                    </span>
                </div>
                </Link>
            </nav>
        </div>
    </div>
</div>



  )
}

export default SideBar