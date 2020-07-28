import React, { useState, useEffect, useRef } from "react";
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

const ShowBooks = ({
  suggestions,
  value,
  handleSelect,
  setSelectedSuggestionIndex,
  selectedSuggestionIndex,
}) => {
  const hoverStyle = {
    backgroundColor: "lightgoldenrodyellow",
    transform: "scale(1.05)",
    cursor: "pointer",
  };
  return (
    value.length >= 2 && (
      <ul>
        {suggestions.map((elem, index) => {
          const isSelected = index === selectedSuggestionIndex;
          const bookTitle = elem.title;
          const matchedIndex = bookTitle
            .toLowerCase()
            .indexOf(value.toLowerCase());
          return (
            <li
              key={elem.id}
              style={isSelected ? hoverStyle : {}}
              onMouseEnter={() => {
                setSelectedSuggestionIndex(index);
              }}
              onClick={() => handleSelect(elem.title)}
            >
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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    -1
  );
  const refFocus = useRef(null);

  useEffect(() => {
    refFocus.current.focus();
  }, []);
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.title.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <Wrapper>
      <div>
        <input
          ref={refFocus}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter": {
                handleSelect(
                  filteredSuggestions[selectedSuggestionIndex].title
                );
                return;
              }
              case "ArrowUp": {
                selectedSuggestionIndex > -1 &&
                  setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                return;
              }
              case "ArrowDown": {
                selectedSuggestionIndex < filteredSuggestions.length - 1 &&
                  setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              }
            }
          }}
        />
        <button onClick={() => setValue("")}>Clear</button>
      </div>
      <ShowBooks
        suggestions={filteredSuggestions}
        value={value}
        handleSelect={handleSelect}
        selectedSuggestionIndex={selectedSuggestionIndex}
        setSelectedSuggestionIndex={setSelectedSuggestionIndex}
      />
    </Wrapper>
  );
};

export default Typeahead;
