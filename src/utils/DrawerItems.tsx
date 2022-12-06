import * as React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import {BusinessOutlined, GroupOutlined} from "@mui/icons-material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SensorsIcon from '@mui/icons-material/Sensors';


export const DrawerElements = [
  {index: 0, path: "dashboard", icon: <BarChartOutlinedIcon/>, label: 'Dashboard'},
  {index: 1, path: "azienda", icon: <HomeOutlinedIcon/>, label: 'Azienda'},
  {index: 2, path: "commesse", icon: <InventoryOutlinedIcon/>, label: 'Commesse'},
  {index: 3, path: "reparti", icon: <PersonPinCircleOutlinedIcon/>, label: 'Reparti'},
  {index: 4, path: "hr", icon: <GroupOutlined/>, label: 'HR'},
  {index: 5, path: "immobili", icon: <BusinessOutlined/>, label: 'Immobili'},
  {index: 6, path: "veicoli", icon: <LocalShippingOutlinedIcon/>, label: 'Veicoli'},
  {index: 7, path: "attrezzature", icon: <ConstructionOutlinedIcon/>, label: 'Attrezzature'},
  {index: 8, path: "manutenzione", icon: <EngineeringOutlinedIcon/>, label: 'Manutenzione'},
  {index: 9, path: "scadenze", icon: <EventOutlinedIcon/>, label: 'Scadenze'},
  {index: 10, path: "documenti", icon: <DescriptionOutlinedIcon/>, label: 'Documenti'},
  {index: 11, path: "pod", icon: <SensorsIcon/>, label: 'Pod'},
];
