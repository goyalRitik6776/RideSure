import React, { useState } from "react";
import { BsTelephoneFill, BsFillPersonFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

const style = {
  wrapper: `h-screen w-screen bg-black flex justify-center items-center`,
  formBoxOuter: `bg-[#02044a] w-[80vw] md:w-[60vw] h-[600px] flex justify-between items-center rounded-2xl gap-15`,
  details: `w-[50%] hidden lg:flex flex-col justify-between h-full p-10`,
  topHeading: `text-white font-extrabold text-4xl mb-4`,
  topDetails: `text-[#8d8dba] mb-8 text-sm leading-relaxed`,
  item: `flex items-center gap-4 text-white border border-transparent hover:border-blue-600 px-4 py-3 rounded-lg mb-4 cursor-pointer transition`,
  footer: `flex gap-10 mt-8 items-center`,
  social: `text-white text-[40px] border border-white p-2 rounded-full hover:bg-blue-600 cursor-pointer transition`,
  formBox: `bg-white w-full lg:w-[45%] p-8 h-full rounded-2xl lg:rounded-tl-0 rounded-bl-0 relative`,
  formItems: `mb-4`,
  input: `flex items-center border-2 border-slate-200 p-2 rounded-lg w-full focus-within:border-blue-600 transition`,
  submitButton: `w-full py-3 px-10 bg-blue-600 text-white rounded-xl hover:bg-[#02044a] transition`,
};

const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        setValues({ name: "", email: "", message: "" });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.formBoxOuter}>
        <div className={style.details}>
          <div>
            <h2 className={style.topHeading}>Having some issues?</h2>
            <p className={style.topDetails}>
              Fill up the form and our team will get back to you within 24
              hours.
            </p>

            <div>
              <div className={style.item}>
                <BsTelephoneFill className="text-blue-600 text-xl" />
                +91 1234567890
              </div>
              <div
                className={style.item}
                role="presentation"
                onClick={() => window.open(`mailto:goyalritik555.rg@gmail.com`)}
              >
                <IoMail className="text-blue-600 text-xl" />
                goyalritik555.rg@gmail.com
              </div>
              <div className={style.item}>
                <TiLocation className="text-blue-600 text-xl" />
                Mumbai
              </div>
            </div>
          </div>

          <div className={style.footer}>
            <FaFacebookF className={style.social} />
            <FiTwitter className={style.social} />
            <FaInstagram className={style.social} />
          </div>
        </div>

        <div className={style.formBox}>
          <div className="space-y-4">
            <div className={style.formItems}>
              <label className="block mb-1 text-sm">Your Name</label>
              <div className={style.input}>
                <BsFillPersonFill className="text-xl mr-2 text-blue-600" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="outline-none w-full"
                  required
                  value={values.name}
                  onChange={(e) =>
                    setValues((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className={style.formItems}>
              <label className="block mb-1 text-sm">Email</label>
              <div className={style.input}>
                <IoMail className="text-xl mr-2 text-blue-600" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="outline-none w-full"
                  required
                  value={values.email}
                  onChange={(e) =>
                    setValues((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className={style.formItems}>
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                className="border-2 border-slate-200 p-2 rounded-lg w-full h-32 resize-none outline-none focus:border-blue-600 transition"
                placeholder="Your message..."
                required
                value={values.message}
                onChange={(e) =>
                  setValues((p) => ({ ...p, message: e.target.value }))
                }
              />
            </div>

            <div className="absolute bottom-10 left-10 right-10">
              {showToast ? (
                <div className="text-blue-600 font-bold text-lg mb-4">
                  Message Sent Successfully!
                </div>
              ) : null}

              <button className={style.submitButton} onClick={handleSubmit}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
