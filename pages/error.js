import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { SVGProps } from 'react'
import img from "../assets/construction.gif";
const style = {
  container: ` w-full flex flex-col justify-center items-center relative overflow-hidden h-screen `,
  boundary: `h-[70vh] pb-16 mt-6 border-6 border-slate-200 md:w-[35vw] md:h-[70vh] relative bg-white rounded-5xl shadow-2xl shadow-purple-400`,
};
const Rent = () => {
  return (
    <main className="bg-white relative overflow-hidden h-screen relative">
      <div className="container mx-auto h-screen pt-32 md:pt-0 px-6 z-10 flex items-center justify-between">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center relative">
          <div className="w-full mb-16 md:mb-8 text-center lg:text-left">
            <h1 className="font-light text-center lg:text-left text-5xl lg:text-6xl mt-12 md:mt-0 text-gray-700">
              Under Construction! Login via Metamask
            </h1>
            <Link href="/login">
              <button className="px-2 py-2 w-36 mt-16 font-medium transition ease-in duration-200 hover:bg-blue-400 border-2 text-lg border-gray-700 bg-blue-300 focus:outline-none">
                Login Now
              </button>
            </Link>
          </div>
          <div className="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
            {/* <img src="/images/illustrations/1.svg"/> */}
            <Image src={img} alt=""></Image>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rent;
