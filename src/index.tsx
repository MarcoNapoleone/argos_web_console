import React, {Suspense} from 'react';
import './index.css';
import Fallback from "./Components/SuspenseFallback/SuspenseFallback";
import Theme from "./Components/Providers/Theme/Theme";
import Routes from "./Routes/Routes";
import {createRoot} from 'react-dom/client';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

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
