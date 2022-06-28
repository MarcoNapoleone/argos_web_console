// @ts-ignore
import {BrowserRouter, Outlet, Route, Routes as Router, useParams,} from "react-router-dom";
import React, {lazy, useEffect, useRef} from 'react';
import {AuthProvider, useAuth} from "../Authorization/Authorization";
import {AlertProvider} from "../Alert/Alert";
import Home from "./Private/Home/Home";
import PageFrame from "../PageFrame/PageFrame";

const Login = lazy(() => import("./Public/login/login"));
const NoMatch = lazy(() => import("./NoMatch/NoMatch"));

export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

type PageParamsType = {
  pagePath: string;
};


const Routes = () => {
  const {loggedUser} = useAuth();
  return (
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <Router>
            <Route path="login" element={<Login/>}/>
            <Route path="/" element={<PageFrame><Outlet/></PageFrame>}>
              <Route path="home" element={<Home/>}/>
              <Route path="*" element={<NoMatch/>}/>
            </Route>
          </Router>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
}

export default Routes;
