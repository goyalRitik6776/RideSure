import React from "react";
import { useState } from "react";
import { BsTelephoneFill,BsFillPersonFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
const style = {
  wrapper: `h-screen w-screen bg-black flex justify-center items-center`,
  formBoxOuter: `bg-[#02044a] w-[60vw] h-[550px] flex justify-center items-center rounded-2xl`,
  details: `bg-[#02044a] flex-1 mr-[4vw] h-[70vh] ml-[4vw] flex-col hidden lg:block`,
  header: ``,
  topHeading: `text-white font-extrabold text-4xl mb-6 mt-2`,
  topDetails: `text-[#8d8dba] mb-12`,
  midDetails: ` h-[30vh] flex-col w-[250px] rounded-xl`,
  item: ` h-[8vh] pt-2  hover:border-blue-600 border-2 border-[#02044a] mb-3 rounded-lg text-white cursor-pointer hover:transition ease-in duration-200 flex justify-start items-center pb-1`,
  text: ``,
  footer: ` mt-12 h-10 w-[250px] text-center text-white flex justify-around items-center`,
  social: `text-white text-5xl rounded-full hover:bg-blue-600 p-3 cursor-pointer transition ease-in duration-200`,
  formBox: `bg-white flex-1 mx-[3vw] h-[70vh] rounded-2xl flex-col justify-center text-center`,
  formItems: `flex-col justify-start`,
  input:`flex justify-start  items-center rounded-lg p-2 bg-transparent w-11/12 mx-4 border-2 border-slate-200`,
  submitButton: `float-right mr-6 mt-4 py-3 px-12 rounded-xl bg-blue-600 cursor-pointer text-white font-mono transition ease-in duration-200 hover:bg-[#02044a] focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white text-base font-semibold shadow-md focus:ring-2 focus:ring-offset-2`,
  focusedInputBox: `border-2 border-blue-600`,
  focused:`text-blue-600`,
};

const Contact = () => {
  const [inFocus, setInFocus] = useState("");
  const handleLogin = () =>{
    
  

  }

  return (
    <div className={style.wrapper}>
      <div className={style.formBoxOuter}>
        <div className={style.details}>
          <div className={style.header}>
            <div className={style.topHeading}>Having some issues</div>
            <div className={style.topDetails}>
              {" "}
              Fill up the form and our Team will get back to you within 24 hours
            </div>
          </div>
          <div className={style.midDetails}>
            <div className={style.item}>
              <BsTelephoneFill className="text-blue-600 mx-6 " />
              <div className={style.text}>+91 1234567890</div>
            </div>
            <div className={style.item}>
              <IoMail className="text-blue-600 mx-6" />
              <div className={style.text}>12345@gmail.com</div>
            </div>
            <div className={style.item}>
              <TiLocation className="text-blue-600 mx-6 text-xl" />
              <div className={style.text}>Los Angeles</div>
            </div>
          </div>
          <div className={style.footer}>
            <FaFacebookF className={style.social} />
            <FiTwitter className={style.social} />
            <FaInstagram className={style.social} />
          </div>
        </div>
        <div className={style.formBox}>
          <form action="/" method="post"  className="flex-col">
          <div className={style.formItems}>
                <div className=" mt-8 text-start mx-4 px-2 font-mono pb-1">Your Name</div>
                <div className={`${style.input} ${
            inFocus === "name" && style.focusedInputBox
          }`}>
                <BsFillPersonFill className={`mx-2 text-2xl ${inFocus === "name" && style.focused} `}/>
              <input type="text" placeholder="" className="outline-none border-none  w-full" onFocus={() => {setInFocus("name")}} required></input>
                </div>
            </div>
            <div className={style.formItems}>
                <div className=" mt-4 text-start mx-4 px-2 font-mono pb-1">Email</div>
                <div className={`${style.input} ${
            inFocus === "email" && style.focusedInputBox
          }`}>
                <IoMail className={`mx-2 text-2xl ${inFocus === "email" && style.focused} `}/>
              <input type="email" placeholder="" className="outline-none border-none w-full"
              onFocus={() => {setInFocus("email")}} required></input>
                </div>
            </div>
            <div className={style.formItems}>
                <div className=" mt-4 text-start mx-4 px-2 font-mono pb-1">Message</div>
            
              <textarea className={`${style.input} h-[160px] outline-none resize-none `} required></textarea>
            
            </div>
            
          <input type='submit' value='Send Message' className={style.submitButton} onClick={handleLogin}/>
          </form>
  
        </div>
      </div>
    </div>
  );
};

export default Contact;
