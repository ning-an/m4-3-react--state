import React, { useState } from "react";
import styled from "styled-components";
import { categories } from "../data";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: darkcyan;

  div {
    display: flex;
    height: 3em;
    margin-top: 150px;
    margin-bottom: 20px;
  }

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

  li {
    padding: 10px;
    transition: transform 0.3s ease-in-out;
  }

  li:hover {
    background-color: lightgoldenrodyellow;
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const InSpan = styled.span`
  font-style: italic;
  opacity: 0.5;
`;

const Category = styled.span`
  color: #e0b195;
  font-style: italic;
`;

const ShowBooks = ({ suggestions, value, handleSelect }) => {
  return (
    value.length >= 2 && (
      <ul>
        {suggestions
          .filter((suggestion) =>
            suggestion.title.toLowerCase().includes(value.toLowerCase())
          )
          .map((elem) => {
            const bookTitle = elem.title;
            const matchedIndex = bookTitle
              .toLowerCase()
              .indexOf(value.toLowerCase());
            return (
              <li onClick={(e) => handleSelect(e.target.innerText)}>
                <Prediction>{bookTitle.slice(0, matchedIndex)}</Prediction>
                <span>{value}</span>
                <Prediction>
                  {bookTitle.slice(matchedIndex + value.length)}
                </Prediction>
                <InSpan> in </InSpan>
                <Category>{categories[elem.categoryId].name}</Category>
              </li>
            );
          })}
      </ul>
    )
  );
};

const Typeahead = ({ suggestions, handleSelect }) => {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSelect(value);
            }
          }}
        />
        <button onClick={() => setValue("")}>Clear</button>
      </div>
      <ShowBooks
        suggestions={suggestions}
        value={value}
        handleSelect={handleSelect}
      />
    </Wrapper>
  );
};

export default Typeahead;
