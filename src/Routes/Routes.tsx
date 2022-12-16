// @ts-ignore
import {BrowserRouter, Outlet, Route, Routes as Router, useParams,} from "react-router-dom";
import React, {lazy, useEffect, useRef} from 'react';
import {AuthProvider, RequireAuth, useAuth} from "../Components/Providers/Authorization/Authorization.provider";
import {AlertProvider} from "../Components/Providers/Alert/Alert.provider";
import PodsPage from "./Private/Pod/Pods.page";
import PageFrame from "../Components/PageFrame/PageFrame";
import CompaniesPage from "./Private/Companies/Companies.page";
import CompanyDetailsPage from "./Private/Companies/CompanyDetails.page";
import {CompanyProvider} from "../Components/Providers/Company/Company.provider";
import LocalUnitsPage from "./Private/LocalUnits/LocalUnits.page";

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
  companyId: string;
};


const Routes = () => {
  const {loggedUser} = useAuth();
  return (
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <CompanyProvider>
            <Router>
              <Route path="/" element={<Login/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="/app/companies" element={<RequireAuth><CompaniesPage/></RequireAuth>}/>
              <Route path="/app/companies/:companyId" element={<CompanyDetailsPage/>}/>
              <Route path="/app/companies/:companyId" element={<PageFrame><Outlet/></PageFrame>}>
                <Route path="local-units" element={<LocalUnitsPage/>}>
                  <Route path=":localUnitId" element={<PodsPage/>}/>
                </Route>
                <Route path="departments" element={<>{'d'}</>}/>
                <Route path="hr" element={<></>}/>
                <Route path="proprieties" element={<></>}/>
                <Route path="vehicles" element={<></>}/>
                <Route path="equipments" element={<></>}/>
                <Route path="maintenance" element={<></>}/>
                <Route path="deadlines" element={<></>}/>
                <Route path="documents" element={<></>}/>
                <Route path="pods" element={<PodsPage/>}/>
                <Route path="settings" element={<></>}/>
                <Route path="*" element={<NoMatch/>}/>
              </Route>
              <Route path="*" element={<NoMatch/>}/>
            </Router>
          </CompanyProvider>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
}

export default Routes;
