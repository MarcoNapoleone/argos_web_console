// @ts-ignore
import {BrowserRouter, Outlet, Route, Routes as Router, useParams,} from "react-router-dom";
import React, {lazy, useEffect, useRef} from 'react';
import {AuthProvider, useAuth} from "../Authorization/Authorization";
import {AlertProvider} from "../Alert/Alert";
import PodPage from "./Private/Pod/PodPage";
import PageFrame from "../PageFrame/PageFrame";
import DashboardPage from "./Private/Dashboard/DashboardPage";
import CompaniesPage from "./Private/Companies/CompaniesPage";

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
            <Route path="/" element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="aziende" element={<CompaniesPage/>}/>
            <Route path="/app" element={<PageFrame><Outlet/></PageFrame>}>
              <Route path="dashboard" element={<DashboardPage/>}/>
              <Route path="commesse" element={<></>}/>
              <Route path="reparti" element={<></>}/>
              <Route path="hr" element={<></>}/>
              <Route path="immobili" element={<></>}/>
              <Route path="veicoli" element={<></>}/>
              <Route path="attrezzature" element={<></>}/>
              <Route path="manutenzione" element={<></>}/>
              <Route path="scadenze" element={<></>}/>
              <Route path="documenti" element={<></>}/>
              <Route path="pod" element={<PodPage/>}/>
              <Route path="settings" element={<></>}/>
              <Route path="*" element={<NoMatch/>}/>
            </Route>
            <Route path="*" element={<NoMatch/>}/>
          </Router>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
}

export default Routes;
