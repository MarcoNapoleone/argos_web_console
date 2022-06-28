import React, {Suspense} from 'react';
import './index.css';
import Fallback from "./App/SuspenseFallback/SuspenseFallback";
import Theme from "./App/Theme/Theme";
import Routes from "./App/Routes/Routes";
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Suspense fallback={<Fallback/>}>
        <Routes/>
      </Suspense>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);