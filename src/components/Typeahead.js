import React, { useState } from "react";
import styled from "styled-components";

const InputDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  height: 3em;

  input {
    width: 45vw;
    border-radius: 5px;
    font-size: 20px;
  }

  button {
    width: 8em;
    background-color: darkcyan;
    border: none;
    color: white;
    font-size: 20px;
    margin-left: 20px;
    box-shadow: 0 0 2px 2px lightgrey;
    border-radius: 5px;
  }
`;

const Typeahead = ({ suggestions, handleSelect }) => {
  const [value, setValue] = useState("");
  return (
    <InputDiv>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSelect(e.target.value);
          }
        }}
      />
      <button onclick={() => setValue("")}>Clear</button>
    </InputDiv>
  );
};

export default Typeahead;
