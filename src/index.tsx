import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Theme from "./App/Theme/Theme";
import Fallback from "./App/SuspenseFallback/SuspenseFallback";

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Suspense fallback={<Fallback/>}>
        <App/>
      </Suspense>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
