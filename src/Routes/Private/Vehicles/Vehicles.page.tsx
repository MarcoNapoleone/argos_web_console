import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Grid, IconButton, useMediaQuery} from "@mui/material";
import AddDialog, {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import MainPage from "../../../Components/MainPage/MainPage";
import {GridColumns} from "@mui/x-data-grid";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteDialog, {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import {useCurrentCompany} from "../../../Components/Providers/Company/Company.provider";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import {defaultVehicles, getAllVehicles} from "../../../services/vehicles.services";

type PageParamsType = {
  companyId: string;
};

const VehiclesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {companyId} = useParams<PageParamsType>();
  const {company} = useCurrentCompany();

  const [vehicles, setVehicles] = useState(defaultVehicles);
  const [loading, setLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const {setOpenAddDialog} = useContext(useAddDialogContext);
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);
  const {setAlertEvent} = useContext(useAlertContext);

  const fetchData = async () => {
    const res = await getAllVehicles(companyId)
    setVehicles(res);
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }, []);

  const RenderMoreButton = (e: any) => {
    const handleMoreClick = () => {
      navigate(`/app/companies/${e.row.companyId}/local-units/${e.row.id}`);
    };
    return (
      <IconButton
        onClick={handleMoreClick}
        size="small"
      >
        <OpenInNewOutlinedIcon/>
      </IconButton>
    );
  }

  const RenderDeleteButton = (e: any) => {
    const handleDeleteClick = async () => {
      setLoading(true);

    };
    return (
      <>
        <IconButton
          onClick={() => setOpenDeleteDialog(true)}
          size="small"
        >
          <DeleteIcon/>
        </IconButton>
        <DeleteDialog handleDelete={handleDeleteClick} title={'gg'}/>
      </>
    );
  }

  const handleDoubleClick = (e: any) => {
    navigate(`/app/companies/${e.row.companyId}/local-units/${e.row.id}`);
  }

  const rows = vehicles.map((vehicle) => {
    return {
      id: vehicle.id,
      hrId: vehicle.hrId,
      localUnitId: vehicle.localUnitId,
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      licensePlate: vehicle.licensePlate,
      serialNumber: vehicle.serialNumber,
      registrationDate: vehicle.registrationDate,
      category: vehicle.category,
      owner: vehicle.owner,
    }
  })
  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'hrId',
      headerName: 'HrId',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'localUnitId',
      headerName: 'Local Unit Id',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'licensePlate',
      headerName: 'License Plate',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'serialNumber',
      headerName: 'Serial Number',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'registrationDate',
      headerName: 'Registration Date',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 120,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'more',
      headerName: 'More',
      description: 'Details',
      align: 'center',
      renderCell: RenderMoreButton,
      width: 90,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      description: 'Edit, Delete',
      align: 'center',
      renderCell: RenderDeleteButton,
      width: 110,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    }
  ];

  const handleRefresh = () => {
    setLoading(true)
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }

  return (
    <MainPage
      title="Vehicles"
      onRefresh={handleRefresh}
      updatedTime={updatedTime}>
      <DatagridTable
        rows={rows}
        allowAdd
        onAdd={() => setOpenAddDialog(true)}
        columns={columns}
        loading={loading}
        onRowDoubleClick={handleDoubleClick}
      />      <AddDialog title={"Add "} handleSubmit={() => {
      }}>
        <Grid container direction="column" spacing={1}>

        </Grid>
      </AddDialog>
    </MainPage>
  );
}

export default VehiclesPage;