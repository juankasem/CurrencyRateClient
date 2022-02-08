import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../environment";
import "./CurrencyRate.css";

const CurrencyRate = () => {
  const [currencyRate, setCurrencyRate] = useState({});
  const [usdRate, setUsdRate] = useState(null);
  const [eurRate, setEurRate] = useState(null);

  const getCurrencyRate = async () => {
    await axios.get(`${apiUrl}api/currencyrate?code=usd`).then((res) => {
      setCurrencyRate(res.data);
      setUsdRate(1);
      setEurRate(res.data.rate);
    });
  };

  const swap = () => {
    if (usdRate === 1) {
      setUsdRate(currencyRate.inverseRate);
      setEurRate(1);
    } else if (eurRate === 1) {
      setEurRate(currencyRate.rate);
      setUsdRate(1);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="currency">
            <label htmlFor="">USD:</label>
            <span>{usdRate}</span>
          </div>
          <div className="button">
            <button type="button" onClick={swap}>
              Swap
            </button>
          </div>
          <div className="currency">
            <label htmlFor="">Euro:</label>
            <span>{eurRate}</span>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={getCurrencyRate}>
            Get currency rate
          </button>
        </div>
      </div>
    </>
  );
};

export default CurrencyRate;
