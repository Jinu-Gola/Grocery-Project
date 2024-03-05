import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from 'react';

const Globle = createContext();

const AppWrapper = () => {
  const [data, setData] = useState("");
  console.log(data);

  return (
    <React.StrictMode>
      <Globle.Provider value={[data , setData]}>
        <App />
      </Globle.Provider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { Globle };
