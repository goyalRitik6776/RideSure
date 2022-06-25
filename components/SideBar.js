import React, { useState,useEffect } from 'react'

const style = {
    wrapper:`'w-max absolute bg-white dark:bg-gray-800 top-0`,
    invisible:`invisible`,
    option:`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg `,
    active:`hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-600`,
}
const SideBar = ({sidebar}) => {

 

    // console.log(sidebar)





  return (
  
<div className={`${style.wrapper} ${sidebar===false && style.invisible}`}>
    <div className="flex flex-col sm:flex-row sm:justify-start">
        <div className="w-56 h-screen">
            <nav className="mt-10 px-6 ">
            <div className=" text-3xl font-bold text-white text-center border-b pb-4">
                        Uber
                    </div>

                <a className={style.option} href="#">
                    <span className="mx-4 text-lg font-normal">
                        Ride
                    </span>

                </a>
                <a className={style.option} href="#">
                    <span className="mx-4 text-lg font-normal">
                        Rentals
                    </span>

                </a>
                <a className={style.option} href="#">
                    <span className="mx-4 text-lg font-normal">
                         DarkMode
                    </span>
                </a>
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