import Link from 'next/link'
import React, { useState,useEffect,useContext } from 'react'
import { UberContext } from "../context/uberContext";

const style = {
    wrapper:`'w-max absolute bg-white dark:bg-black top-0`,
    invisible:`invisible`,
    option:`hover:text-gray-200 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-200 dark:text-gray-200 rounded-lg `,
    active:`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-600`,
}
const SideBar = ({sidebar}) => {

    const {currentAccount,connectWallet } = useContext(UberContext);

  return (
  
<div className={`${style.wrapper} ${sidebar===false && style.invisible}`}>
    <div className="flex flex-col sm:flex-row sm:justify-start">
        <div className="w-56 h-screen">
            <nav className="mt-4 px-6 ">
            <div className=" text-3xl  text-white text-center border-b pb-3">
                        Uber
                    </div>
                <Link href='/ride'>
                <a className={style.option} href="#">
                    <span className="mx-4 text-lg font-normal">
                        Ride
                    </span>

                </a>
                </Link>
                <Link href='/rent'>
                <a className={style.option} href="#">
                    <span className="mx-4 text-lg font-normal">
                        Rentals
                    </span>

                </a>
                </Link>
                {currentAccount?(
                      <a className={style.option} href="#" >
                      <span className="mx-4 text-lg font-normal" onClick={() => connectWallet()}>
                           Switch Account
                      </span>
                  </a>
                ):('')}
              
                <a className={style.option} href="#">
                    <span className="mx-4 text-lg font-normal">
                        Contact Us
                    </span>
                </a>
            </nav>
        </div>
    </div>
</div>



  )
}

export default SideBar