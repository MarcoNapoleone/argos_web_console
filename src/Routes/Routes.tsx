// @ts-ignore
import {BrowserRouter, Outlet, Route, Routes as Router, useParams,} from "react-router-dom";
import React, {lazy, useEffect, useRef} from 'react';
import {AuthProvider, RequireAuth, useAuth} from "../Components/Providers/Authorization/Authorization.provider";
import {AlertProvider} from "../Components/Providers/Alert/Alert.provider";
import PodsPage from "./Private/Pods/Pods.page";
import PageFrame from "../Components/PageFrame/PageFrame";
import CompaniesPage from "./Private/Companies/Companies.page";
import CompanyDetailsPage from "./Private/Companies/CompanyDetails.page";
import {CompanyProvider} from "../Components/Providers/Company/Company.provider";
import LocalUnitsPage from "./Private/LocalUnits/LocalUnits.page";
import LocalUnitDetailsPage from "./Private/LocalUnits/LocalUnitDetails.page";
import DepartmentsPage from "./Private/Departments/Departments.page";
import DepartmentDetailsPage from "./Private/Departments/DepartmentDetails.page";
import HRPage from "./Private/HR/HR.page";
import HRDetailsPage from "./Private/HR/HRDetails.page";
import PropertiesPage from "./Private/Properties/Properties.page";
import PropertyDetailsPage from "./Private/Properties/PropertyDetails.page";
import VehiclesPage from "./Private/Vehicles/Vehicles.page";
import VehicleDetailsPage from "./Private/Vehicles/VehicleDetails.page";
import EquipmentsPage from "./Private/Equipments/Equipments.page";
import EquipmentDetailsPage from "./Private/Equipments/EquipmentDetails.page";
import TimetablesPage from "./Private/Timetables/Timetables.page";
import DocumentsPage from "./Private/Documents/Documents.page";
import DocumentDetailsPage from "./Private/Documents/DocumentDetails.page";
import AddDialog, {AddDialogProvider} from "../Components/Providers/AddDialog/AddDialog";

const Login = lazy(() => import("./Public/login/login.page"));
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
            <AddDialogProvider>
              <Router>
                <Route path="/" element={<Login/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="settings" element={<>set</>}/>
                <Route path="/app/companies" element={<RequireAuth><CompaniesPage/></RequireAuth>}/>
                <Route path="/app/companies/:companyId" element={<CompanyDetailsPage/>}/>
                <Route path="/app/companies/:companyId" element={<PageFrame><Outlet/></PageFrame>}>
                  <Route path="local-units">
                    <Route index element={<LocalUnitsPage/>}/>
                    <Route path=":localUnitId" element={<LocalUnitDetailsPage/>}/>
                  </Route>
                  <Route path="departments">
                    <Route index element={<DepartmentsPage/>}/>
                    <Route path=":departmentId" element={<DepartmentDetailsPage/>}/>
                  </Route>
                  <Route path="hr">
                    <Route index element={<HRPage/>}/>
                    <Route path=":hrId" element={<HRDetailsPage/>}/>
                  </Route>
                  <Route path="properties">
                    <Route index element={<PropertiesPage/>}/>
                    <Route path=":proprietyId" element={<PropertyDetailsPage/>}/>
                  </Route>
                  <Route path="vehicles">
                    <Route index element={<VehiclesPage/>}/>
                    <Route path=":vehicleId" element={<VehicleDetailsPage/>}/>
                  </Route>
                  <Route path="equipments">
                    <Route index element={<EquipmentsPage/>}/>
                    <Route path=":equipmentId" element={<EquipmentDetailsPage/>}/>
                  </Route>
                  <Route path="timetables">
                    <Route index element={<TimetablesPage/>}/>
                    <Route path=":timetableId" element={<DepartmentDetailsPage/>}/>
                  </Route>
                  <Route path="documents">
                    <Route index element={<DocumentsPage/>}/>
                    <Route path=":documentId" element={<DocumentDetailsPage/>}/>
                  </Route>
                  <Route path="pods">
                    <Route index element={<PodsPage/>}/>
                    <Route path=":podId" element={<PodsPage/>}/>
                  </Route>
                  <Route path="*" element={<NoMatch/>}/>
                </Route>
                <Route path="*" element={<NoMatch/>}/>
              </Router>
            </AddDialogProvider>
          </CompanyProvider>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
}

export default Routes;
