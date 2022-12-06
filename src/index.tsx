import React, {Suspense} from 'react';
import './index.css';
import Fallback from "./App/SuspenseFallback/SuspenseFallback";
import Theme from "./App/Theme/Theme";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Routes from "./App/Routes/Routes";
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Theme>
      <Suspense fallback={<Fallback/>}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes/>
        </LocalizationProvider>
      </Suspense>
    </Theme>
  </React.StrictMode>
);
