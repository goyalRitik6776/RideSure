import Image from "next/image";
import avatar from "../temp/avatar.jpg";
import Link from "next/link";
// import avatar from '../assets/avatar.webp'
import { BsPerson } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { UberContext } from "../context/uberContext";
// import {useEditState} from '@sanity/react-hooks'
// import Search from './Search'
import Home from "../pages";
import RideSelector from "./RideSelector";

const style = {
  wrapper: `h-16 w-full bg-black text-white flex md:justify-around items-center px-32 fixed z-20`,
  leftMenu: `flex`,
  logo: `text-3xl text-white flex cursor-pointer mr-16 pb-2`,
  menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer hover:bg-[#333333] px-4 py-1 rounded-full`,
  userName: `text-lg text-white font-medium flex items-center mr-4 cursor-pointer hover:bg-[#333333] px-4 py-1 rounded-full `,
  rightMenu: `flex items-center`,
  userImageContainer: `mr-2`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
  loginText: `ml-2`,
  name: `flex mr-2`,
  nameBox: `flex items-center`,
};

const Navbar = () => {
  let {
    currentAccount,
    setCurrentAccount,
    connectWallet,
    currentUser,
    setDark,
    dark,ride,setRide,
  } = useContext(UberContext);

  const darkMode = () => {
    dark ==='drakosi/ckvcwq3rwdw4314o3i2ho8tph' ?(setDark('goyalritik/cl4mzcklq000h14l8kzg1q06c')):(setDark('drakosi/ckvcwq3rwdw4314o3i2ho8tph'))
  }

  // useEffect(() => {
  //   ()
  // }, [])

  // console.log("Before Clicking", dark);

  return (
    <div className={style.wrapper}>
      <div className={style.leftMenu}>
        <Link href="/">
          <div className={style.logo} >Uber</div>
        </Link>

        <Link href="/ride">
          <div className={style.menuItem} >Ride</div>
        </Link>

        <Link href="/rent">
          <div className={style.menuItem}>Rent</div>
        </Link>
        <div className={style.menuItem}>More</div>
      </div>
      <div className={style.rightMenu}>
        {currentAccount ? (
          <div className={style.menuItem} onClick={() => connectWallet()}>
            Switch Account
          </div>
        ) : (
          ""
        )}

        <div className={style.userName}>
          {/* {currentUser.name?.split(' ')[0]} */}
          {currentAccount ? currentUser.name?.split(" ")[0] : "USER"}
        </div>

        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            alt=""
            src={avatar}
            width={40}
            height={40}
          />
        </div>
        {currentAccount ? (
          <div className={style.nameBox}>
            <div className={style.name}>
              {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
            </div>
          </div>
        ) : (
          <div className={style.loginButton}>
            <BsPerson />

            <Link href="/login">
              <span className={style.loginText}>Log in</span>
            </Link>
          </div>
        )}

        <button className={style.menuItem} onClick={() => darkMode()}>
          {dark ==='drakosi/ckvcwq3rwdw4314o3i2ho8tph' ?("DarkMode"):("LightMode")}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
