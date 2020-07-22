import React from "react";

import GlobalStyles from "./GlobalStyles";

import data from "../data";
import Typeahead from "./Typeahead";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Typeahead
        suggestions={data.books}
        handleSelect={(suggestion) => {
          window.alert(suggestion);
        }}
      />
    </>
  );
};

export default App;
