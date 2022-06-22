import React from "react";

import useInput from "./useInput";

const style = {
    wrapper:``,
    suggestionWrapper:``,
    suggestion:``,
}

const InputField = () => {
  const address = useInput("");

  return (
    <div className={style.wrapper}>
      <input
        placeholder="Address"
        {...address}
        isTyping={address.value !== ""}
      />
      {address.suggestions?.length > 0 && (
        <div className={style.suggestionWrapper}>
          {address.suggestions.map((suggestion, index) => {
            return (
              <div className={style.suggestion}
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name);
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputField;