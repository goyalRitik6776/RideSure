import React from "react";
import Image from "next/image";
import ethLogo from "../assets/metmask.png";
import walletLogo from "../assets/walletconnect.png";
import arrow from "../assets/arrow.png";
import cb from "../assets/coinbase.png";
import bg from "../assets/image.svg";
import { UberContext } from "../context/uberContext";
import { useContext } from "react";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { BsFullscreen } from "react-icons/bs";
const style = {
  // bg-[#e5e7eb]
  // back:`absolute h-screen w-screen object-cover`,
  // back:`absolute h-screen w-screen object-cover`,
  // body:`relative overflow-hidden h-screen"`,
  body: `h-screen w-screen flex justify-center bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-100`,
  login: `w-[370px] md:w-[450px] flex justify-center items-center my-10 flex-col rounded-2xl bg-[#eeeeee]`,
  // login:`flex justify-center items-center`,
  heading: `font-mono font-extrabold text-4xl bg-white h-[130px] w-full flex  justify-center items-center rounded-t-2xl`,
  options: `bg-white w-full h-[400px] flex flex-col justify-center items-center cursor-pointer`,
  metaMask: `w-full flex flex-1 content-between border-b-2 border flex flex-row justify-between items-center self-stretch`,
  walletConnect: `w-full flex flex-1 justify-between items-center border-b-2 border`,
  coinBase: `w-full flex flex-1 justify-between items-center mb-10 border`,
  image: `p-3 ml-4 flex justify-center `,
  img: ``,
  type: ` p-3  h-full flex flex-col justify-center font-bold text-lg`,
  typeAbout:`text-sm text-slate-400`,
  arrow: `p-2 mr-4 flex h-full items-center place-content-end`,
  // footer: `bg-white text-lg w-full h-[100px] flex flex-row justify-center items-center border-t-4 border font-bold text-lg rounded-b-2xl`,
  footer:`mt-1 h-[80px] bg-white md:flex w-full text-center flex-row justify-center border-t-4 border font-bold rounded-b-2xl pt-4 md:pt-6`,
  static: `mr-2`,
  download: `text-[#854ce6] hover:underline cursor-pointer`,
  empty:`bg-white w-[5vw] underline`,
  optionsContainer:`flex flex-row w-full`,
};

const Login = () => {
  
  const { currentAccount, connectWallet, currentUser } =
  useContext(UberContext);

   const router = useRouter();
   {currentAccount ? (
    router.push('/')
   ):("")}

  return (
    <div className={style.body} >

      <div className={style.login}>
        <div className={style.heading}>Login</div>
        <div className={style.optionsContainer}>
          <div className={style.empty}></div>
        <div className={style.options}>
          {/* {currentAccount ? (
                  <Link href = "/">
                       <a> </a>
                  </Link>
        ) : (
        
         
        )} */}
          <div className={style.metaMask} onClick={() => connectWallet()}>
          {/* <div className={style.metaMask}> */}
        
         <div className={style.image}>
              <Image
                src={ethLogo}
                alt=""
                className={style.img}
                height={60}
                width={60}
              />{" "}
            </div>
            <div className={style.type}>
            <div className={style.typeName}>Metamask</div>
            <div className={style.typeAbout}>Connect using browser wallet</div>
            </div>
            <div className={style.arrow}>
              <Image
                src={arrow}
                alt=""
                // className={style.img}
                height={30}
                width={30}
              />
            </div>
          </div>  
          <Link href="/ErrorLogin">
            <div className={style.walletConnect}>
              <div className={style.image}>
                <Image
                  src={walletLogo}
                  alt=""
                  className={style.img}
                  height={60}
                  width={60}
                />{" "}
              </div>
              <div className={style.type}>
            <div className={style.typeName}>WalletConnect</div>
            <div className={style.typeAbout}>Connect using mobile wallet</div>
            </div>
              <div className={style.arrow}>
                <Image
                  src={arrow}
                  alt=""
                  // className={style.img}>
                  height={30}
                  width={30}
                />
              </div>
            </div>
          </Link>
          <Link href="/ErrorLogin">
            <div className={style.coinBase}>
              <div className={style.image}>
                <Image src={cb} 
                alt=""
                className="rounded-full" height={60} width={60} />{" "}
              </div>
              <div className={style.type}>
            <div className={style.typeName}>CoinBase</div>
            <div className={style.typeAbout}>Connect using coinBase wallet</div>
            </div>
              <div className={style.arrow}>
                <Image
                  src={arrow}
                  alt=""
                  // className={style.img}
                  height={30}
                  width={30}
                />
              </div>
            </div>
          </Link>
        </div>
        <div className={style.empty}></div>
        </div>
        <div className={style.footer}>
          <div className={style.static}>Don&#x27;t want to Login! </div>
          <Link href="/">
          <div className={style.download} >Click here to continue</div>
          </Link>
        </div>
      </div>
      {/* Hello */}
    </div>
  );
};

export default Login;
