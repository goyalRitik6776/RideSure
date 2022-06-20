import Image from 'next/image'
import avatar from '../temp/avatar.jpg'
import Link from 'next/link'
import { BsPerson } from 'react-icons/bs'
import { useContext } from 'react'
import { UberContext } from '../context/uberContext'
// import {useEditState} from '@sanity/react-hooks'
// import Search from './Search'
import Home from '../pages'
import RideSelector from './RideSelector'


const style = {
  wrapper: `h-16 w-[100vw] bg-black text-white flex justify-between items-center px-60 fixed z-20`,
  leftMenu: `flex  sm-[bg-red-600] w-[50vw]`,
  logo: `text-3xl text-white flex cursor-pointer mr-16`,
  menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer hover:bg-[#333333] px-4 py-1 rounded-full`,
  rightMenu: `flex items-center w-[50vw]`,
  userImageContainer: `mr-2`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] hover:px-4 py-1`,
  loginText: `ml-2`,
  name:`flex mr-2`,
  nameBox:`flex items-center`,
}

// let uName = {
//   prompt("Please Tell Us Your Name !"),
// }

const Navbar = () => {


  let { currentAccount,setCurrentAccount, connectWallet, currentUser,requestToGetCurrentUsersInfo} = useContext(UberContext)
console.log("currentAccount",currentAccount)

// const update = async address => {
//   // if (!window.ethereum) return
//   try {
//     await fetch('/api/db/updateUser', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userWalletAddress: address,
//         name: currentUser.name,
//       }),
//     })
//     console.log("WORKING")
//   } catch (error) {
//     console.error(error)
//   }
// }

  
  return (
    <div className={style.wrapper}>
      <div className={style.leftMenu}>
        <Link href="/"><div className={style.logo}>Uber</div></Link>
        
        <Link href="/Ride"><div className={style.menuItem}>Ride</div></Link>
        
        <Link href="/Rent"><div className={style.menuItem}>Rent</div></Link>
        <div className={style.menuItem}>More</div>
      </div>
      <div className={style.rightMenu}>
        {currentAccount ? (
          <div className={style.menuItem} onClick={() => (connectWallet())}>Switch Account</div>
        ):("")}
        
        <div className={style.menuItem} >
          {currentUser.name?.split(' ')[0]}
          {/* {currentAccount ? (currentUser.name?.split(' ')[0]):("USER")} */}
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

            {/* <div className={style.logoutButton} onClick={() => (window.ethereum = null)}>
               <span className={style.logoutText}>Log Out</span>
          </div> */}
          </div>
          // console.log(currentAccount);
        ) : (
          // <div className={style.loginButton} onClick={() => connectWallet()}>
          // {Comp()}
          <div className={style.loginButton}>
            <BsPerson />
            <Link href = "/Login">
                 <span className={style.loginText}>Log in</span>
            </Link>
          </div>
        )}

        {/* if(currentAccount){
          <div className={style.loginButton} onClick={() => currentAccount=null}>
               <span className={style.loginText}>Log Out</span>
        </div>
        } */}

    
        
      </div>

      {/* <SearchBox accessToken={} /> */}
      {/* <Search /> */}
    </div>
  )
}

export default Navbar