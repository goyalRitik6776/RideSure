import Image from "next/image";
import avatar from "../temp/avatar.jpg";
// import avatar from "../assets/aaa.webp"
import Link from "next/link";
import gif from "../assets/blink.gif";
import { FaBars } from "react-icons/fa";
import { BsPerson,BsSunFill,BsMoonStarsFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { UberContext } from "../context/uberContext";
import SideBar from "./SideBar";
import { ethers } from "ethers";
const style = {
  wrapper: `h-16 w-full bg-black text-white flex justify-between items-center md:px-32 fixed z-20 invisible lg:visible`,

  leftMenu: `flex `,
  logo: `text-3xl text-white flex cursor-pointer mr-16 mb-1 font-serif`,
  menuItem: `w-max text-lg text-white font-medium flex items-center mx-4 cursor-pointer hover:bg-[#333333] px-4 py-1 rounded-full text-center`,
  userName: `w-max text-lg text-white font-medium flex items-center mr-4 cursor-pointer hover:bg-[#333333] px-4 py-1 rounded-full `,

  rightMenu: `flex items-center `,
  userImageContainer: `mr-2 overflow-auto`,
  userImage: `h-10 w-10 mr-4 rounded-full object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-2 ml-1 w-max`,
  loginText: `ml-2 font-medium`,
  name: `flex mr-2`,
  nameBox: `flex items-center`,
  dropDown: `dropdown relative flex justify-center `,
  suggestionWrapper: `dropdown-menu absolute text-white cursor-pointer z-20 w-max mt-3 ml-2`,
  invisible: `invisible`,
  suggestion: `bg-black  hover:bg-[#333333] py-1 px-4 border-b border-white`,
  drop: `border-none rounded-b`,

  smallLeft: `flex w-[45vw] justify-start items-center`,
  smallRight: ` flex w-[55vw] justify-end items-center`,
  smallUserName: `text-lg text-white font-medium mr-2 cursor-pointer hover:bg-[#333333] px-4 py-1 rounded-full`,
  more: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer px-4 py-1 flex-col mt-1`,
  bg:`w-16 h-7 rounded-full flex justify-between items-center relative mr-3`,
  light:`bg-white`,
  dark:`bg-orange-400`
};

const Navbar = ({ setr, r }) => {
  const [sidebar, setSidebar] = useState(false);
  const[darkB,setDarkB] = useState(false);

  let {
    currentAccount,
    wc,
    setCurrentAccount,
    connectWallet,
    currentUser,
    setDark,
    dark,
    ride,
    setRide,
  } = useContext(UberContext);
  const [drop, setDrop] = useState(false);

  const darkMode = () => {
    dark === "drakosi/ckvcwq3rwdw4314o3i2ho8tph"
      ? setDark("goyalritik/cl4mzcklq000h14l8kzg1q06c")
      : setDark("drakosi/ckvcwq3rwdw4314o3i2ho8tph");
  };

  return (
    <div>
      <div className="h-16 w-full bg-black text-white flex fixed justify-end z-20 lg:invisible">
        <div className={style.smallLeft}>
          {/* <button onClick={() => toggle()}> */}
          <button
            onClick={() => {
              setSidebar(!sidebar);
            }}
          >
           
            <FaBars className="scale-150 mx-4" />
            <SideBar sidebar={sidebar} setr={setr} r={r} />
          </button>
          <Link href="/">
            <div className="text-3xl font-serif text-white flex cursor-pointer ml-1 ">
              RideSure
            </div>
          </Link>
        </div>
        <div className={style.smallRight}>
          {currentAccount ? (
            <div
              className="mr-2 cursor-pointer"
              onClick={() => {
                setDrop(!drop);
              }}
            >
              <Image
                // className={style.userImage}
                alt=""
                src={avatar}
                width={40}
                height={40}
              />
              <div className={style.dropDown}>
                <div
                  className={`dropdown-menu absolute text-white cursor-pointer z-20 w-max mt-2 ml-2 ${
                    drop === false && style.invisible
                  }`}
                >
                  {/* <div className={style.suggestion}>About Us</div> */}
                  <div
                    className={`${
                      currentUser.name &&
                      style.smallUserName &&
                      style.suggestion
                    }`}
                  >
                    {currentAccount ? currentUser.name?.split(" ")[0] : ""}
                  </div>

                  <div className={`${style.suggestion}`}>
                    {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" cursor-pointer hover:scale-105">
              <Link href="/login">
                <Image
                  // className={style.userImage}
                  alt=""
                  src={avatar}
                  width={35}
                  height={35}
                />
              </Link>
            </div>
          )}

<div className="w-max text-lg text-white  font-medium flex items-center cursor-pointer  px-4 py-1 rounded-full text-center ">
          <div className={`${style.bg} ${
            darkB === true && style.dark
          } ${
            darkB === false && style.light
          }`} >
        {/* {console.log(darkB)} */}
        <input
                type="checkbox"
                name="toggle"
                className="checked:bg-white outline-none focus:outline-none right-9 checked:right-0 duration-200 ease-in absolute block w-7 h-7 rounded-full bg-black border border-white appearance-none cursor-pointer "
                onChange={(e) => {
                      e.target.checked
                    ? setDark("goyalritik/cl4mzcklq000h14l8kzg1q06c")
                    : setDark("drakosi/ckvcwq3rwdw4314o3i2ho8tph") 
                }}
                onClick = {() => setDarkB(!darkB)}
                />
        <BsSunFill
        className='pl-2 text-2xl text-white'
        />
        <BsMoonStarsFill
        className='pr-2 text-2xl text-black'
        />
    </div>

              {/* <label
                htmlFor="darkMode"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label> */}
            {/* <span className="text-white font-medium">DarkMode</span> */}
          </div>
        </div>
      </div>

      <div className={style.wrapper}>
        <div className={style.leftMenu}>
          <Link href="/">
            <div className={style.logo} onClick={() => {setr(false)}}>RideSure</div>
          </Link>

          {/* <Link href="/ride"> */}
          <div
            className={style.menuItem}
            onClick={() => {
              setr(!r);
            }}
          >
            Ride
          </div>
          {/* </Link> */}

          <Link href="/rent">
            <div className={style.menuItem}>Rentals</div>
          </Link>
          <div
            className={style.more}
            onClick={() => {
              setDrop(!drop);
            }}
          >
            More
            <div className={style.dropDown}>
              <div
                className={`${style.suggestionWrapper}
      ${drop === false && style.invisible}`}
              >
                <Link href="/contact">
                  <div className={style.suggestion}>Contact Us</div>
                </Link>

                <div className={style.suggestion}>About Us</div>
                <Link href="/contact">
                  <div className={`${style.suggestion} ${style.drop}`}>
                    Help
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={style.rightMenu}>
          {currentAccount ? (
            <div className={style.menuItem} onClick={() => connectWallet()}>
              Switch Account
            </div>
          ) : (
            ""
          )}

          <div className={`${currentUser.name && style.userName}`}>
            {/* {currentUser.name?.split(' ')[0]} */}
            {currentAccount ? currentUser.name?.split(" ")[0] : ""}
          </div>

          <div className={style.userImageContainer}>
            <Image
              // className={style.userImage}
              alt=""
              src={avatar}
              width={40}
              height={40}
            />
          </div>

          {currentAccount ? (
            <div className={style.nameBox}>
              <div className={style.name}>
                {currentAccount.slice(0, 5)}...{currentAccount.slice(38)}
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
          <div className="w-max text-lg text-white  font-medium flex items-center cursor-pointer  px-4 py-1 rounded-full text-center ">
          <div className={`${style.bg} ${
            darkB === true && style.dark
          } ${
            darkB === false && style.light
          }`} >
        {/* {console.log(darkB)} */}
        <input
                type="checkbox"
                name="toggle"
                className="checked:bg-white outline-none focus:outline-none right-9 checked:right-0 duration-150 ease-in absolute block w-7 h-7 rounded-full bg-black border border-white appearance-none cursor-pointer "
                onChange={(e) => {
                      e.target.checked
                    ? setDark("goyalritik/cl4mzcklq000h14l8kzg1q06c")
                    : setDark("drakosi/ckvcwq3rwdw4314o3i2ho8tph") 
                }}
                onClick = {() => setDarkB(!darkB)}
                />
        <BsSunFill
        className='pl-2 text-2xl text-white'
        />
        <BsMoonStarsFill
        className='pr-2 text-2xl text-black'
        />
    </div>

              {/* <label
                htmlFor="darkMode"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label> */}
            {/* <span className="text-white font-medium">DarkMode</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
