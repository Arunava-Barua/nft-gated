import logo from "./logo.svg";
import "./App.css";

import React, { useState, useContext } from "react";
import { NftGatedContext } from "./context/NftGatedContext";

function App() {
  const { connectWallet, currentAccount, checkValidity, isValid } =
    useContext(NftGatedContext);
  return (
    <div className="App">
      <header className="App-header">
        {isValid ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : (
          <div className="not-authorised">Not authorised !!</div>
        )}
        <p>You must have access to see the React Logo</p>
        <button type="button" className="btn" onClick={connectWallet}>
          {currentAccount ? currentAccount : "Connect wallet"}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            checkValidity("6d5e03d844f05c84e424c0bab0ad6df2");
          }}
        >
          Check Validity
        </button>
        {/* <p>{isValid ? "True" : "False"}</p> */}
      </header>
    </div>
  );
}

export default App;
