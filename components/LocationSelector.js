import { useState } from "react";
import { useContext } from "react";
import { UberContext } from "../context/uberContext";
import React from "react";

const style = {
  wrapper: `pt-2 `,
  searchHeader: `w-full font-bold text-left flex items-center text-3xl p-4 pl-5 overflow-hidden h-[100px]`,
  inputBoxes: `flex flex-col mb-4 relative`,
  inputBox: `h-10 mx-4 border-2 bg-[#eeeeee] flex items-center my-1 py-1 px-2`,
  focusedInputBox: `border-black`,
  svgContainer: `mx-1`,
  input: `my-2 rounded-2 p-2 outline-none border-none bg-transparent  h-full w-full`,
  verticalLine: `w-0 h-[2rem] border-black border absolute z-10 left-[2.3rem] top-[2rem]`,
  //   suggestionsContainer:`bg-red-600  h-10 mx-4 border-2 my-1 py-1 px-2 z-20`,
  dropDown: `dropdown relative flex justify-center`,
  suggestionWrapper: `dropdown-menu absolute text-gray-700 pt-1 cursor-pointer z-20 px-4`,
  invisible: `invisible`,
  suggestion: `bg-gray-200 hover:bg-gray-400 py-1 px-4 block whitespace-no-wrap  border border-black`,
  dropDownD:`dropdown relative flex justify-center`,
  suggestionWrapperD:`dropdown-menu absolute text-gray-700 pt-1 cursor-pointer z-20 px-4`,
  suggestionD:`bg-gray-200 hover:bg-gray-400 py-1 px-4 block whitespace-no-wrap border border-black`
};

const LocationSelector = () => {
  const [inFocus, setInFocus] = useState("from");
  const { pickup, setPickup, dropoff, setDropoff, psuggestions,setpSuggestions,dsuggestions,setdSuggestions } =
    useContext(UberContext);

  return (
    <div className={style.wrapper}>
      <div className={style.searchHeader}>
        {inFocus === "from" ? "Where Can We Pick You Up?" : "Where To?"}
      </div>
      <div className={style.inputBoxes}>
        <div
          className={`${style.inputBox} ${
            inFocus === "from" && style.focusedInputBox
          }`}
        >
          <div className={style.svgContainer}>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
          </div>
      
          <input
            className={style.input}
            placeholder="Enter pickup location"
       
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onFocus={() => {setInFocus("from")
            style.suggestionWrapper = "dropdown-menu absolute text-gray-700 pt-1 cursor-pointer z-20 px-4"}
             }
          />

    
        </div>

        {psuggestions?.length > 0 && (
          <div className={style.dropDown}>
            <div
              className={`${style.suggestionWrapper} ${
                (pickup === "" || inFocus === "to") && style.invisible
              }`}
            >
              {psuggestions.map((suggestion, index) => {
                return (
                  <div
                    className={style.suggestion}
                    key={index}
                    onClick={() => {
                      style.suggestionWrapper = "dropdown-menu absolute text-gray-700 pt-1 invisible cursor-pointer z-20 px-4"
                      setPickup(suggestion.place_name.split(',')[0]);
                      setpSuggestions([]);
                    }}
                    
                  >
                    {suggestion.place_name}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={style.verticalLine} />
        <div
          className={`${style.inputBox} ${
            inFocus === "to" && style.focusedInputBox
          }`}
        >
          <div className={style.svgContainer}>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 10h-4v4h4v-4zM7 7v10h10V7H7z"
              />
            </svg>
          </div>
          <input
            className={style.input}
            placeholder="Where to?"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onFocus={() => {setInFocus("to")
            style.suggestionWrapperD = "dropdown-menu absolute text-gray-700 pt-1 cursor-pointer z-20 px-4"
            }}
          />

        </div>
        
          
        {dsuggestions?.length > 0 && (
          <div className={style.dropDownD}>
            <div
              className={`${style.suggestionWrapperD}  ${
                (dropoff === "" || inFocus === "from" ) && style.invisible
              }`}
            >
              {dsuggestions.map((suggestion, index) => {
                return (
                  <div
                    className={style.suggestionD}
                    key={index}
                    onClick={() => {
                      style.suggestionWrapperD = "dropdown-menu absolute cursor-pointer text-gray-700 pt-1 invisible z-20 px-4"

                      setDropoff(suggestion.place_name.split(',')[0]);
                      setdSuggestions([]);
                    }}
                  >
                    {suggestion.place_name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
