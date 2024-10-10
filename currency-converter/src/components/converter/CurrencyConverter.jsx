import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});


  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setRates(data.rates);
        console.log(data);
      });
  }, []);
  

 
  const convertCurrency = () => {
    const rate = rates[toCurrency] / rates[fromCurrency];
    setConvertedAmount((amount * rate).toFixed(2));
  };

 
  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="converter-container">
      <h1 className="converter-title">Currency Converter</h1>

      <div className="input-section">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="currency-input"
        />
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <span className="equals">=</span>

        <input
          type="text"
          value={convertedAmount}
          disabled
          className="currency-output"
        />
        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.keys(rates).map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
