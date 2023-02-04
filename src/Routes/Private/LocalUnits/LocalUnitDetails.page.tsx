import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Box, Divider, Grid, Link, Skeleton, TextField, Typography, useMediaQuery} from "@mui/material";
import {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import DetailsSection from "../../../Components/DetailsSection/DetailsSection";
import {
  defaultLocalUnit,
  deleteLocalUnit,
  getAllDepartments,
  getAllVehicles,
  getLocalUnit,
  LocalUnit,
  updateLocalUnit
} from "../../../services/localUnits.services";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import DialogFormLabel from "../../../Components/DialogFormLabel/DialoFormLabel";
import {getUpdatedTime} from "../../../utils/dateHandler";
import {defaultDepartments} from "../../../services/departments.services";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import {GridColumns} from "@mui/x-data-grid";

type PageParamsType = {
  companyId: string;
  localUnitId: string;
};

const LocalUnitDetailsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {companyId, localUnitId} = useParams<PageParamsType>();
  const [loading, setLoading] = useState(true);
  const [localUnit, setLocalUnit] = useState(defaultLocalUnit);
  const [departments, setDepartments] = useState(defaultDepartments);
  const [vehicles, setVehicles] = useState(defaultDepartments);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const {setOpenAddDialog} = useContext(useAddDialogContext);
  const {setAlertEvent} = useContext(useAlertContext);
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={`/app/companies/${companyId}`}
    >
      App
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/app/companies/${companyId}/local-units`}
    >
      Local units
    </Link>,
    <Typography
      key="3" color="text.primary"
    >
      {loading
        ? <Skeleton animation="wave" width="30px"/>
        : localUnit?.name?.charAt(0).toUpperCase() + localUnit?.name?.slice(1)
      }
    </Typography>,
  ];

  const anchors = [
    {
      title: "Departments",
      id: "departments",
    },
    {
      title: "Vehicles",
      id: "vehicles",
    }
  ];


  const fetchData = async () => {
    const _localUnit = await getLocalUnit(localUnitId)
    const _departments = await getAllDepartments(localUnitId)
    const _vehicles = await getAllVehicles(localUnitId)
    setLocalUnit(_localUnit);
    setDepartments(_departments);
    setVehicles(_vehicles);
  }

  useEffect(() => {
    handleRefresh()
  }, []);

  const departmentsRows = departments.map((department) => {
    return {
      id: department.id,
      localUnitId: department.localUnitId,
      name: department.name,
    }
  })
  const departmentsColumns: GridColumns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
  ];

  const handleRefresh = () => {
    setLoading(true)
    setUpdatedTime(getUpdatedTime());
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }

  const handleDelete = () => {
    deleteLocalUnit(localUnitId)
      .then((res) => {
        setAlertEvent(getResponseAlert(res));
        setOpenDeleteDialog(false);
        navigate(`/app/companies/${companyId}/local-units`)
      })
      .catch((err) => {
          setAlertEvent(getReasonAlert(err));
        }
      )
  }

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newLocalUnit: LocalUnit = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      address: data.get("address") as string,
      municipality: data.get("municipality") as string,
      postalCode: data.get("postalCode") as string,
    }
    await updateLocalUnit(localUnitId, newLocalUnit)
      .then((res) => {
        setAlertEvent(getResponseAlert(res));
        handleRefresh();
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
      })
  };

  return (
    <DetailsPage
      title={localUnit?.name}
      loading={loading}
      updatedTime={updatedTime}
      breadcrumbs={breadcrumbs}
      allowModify={{edit: true, delete: true}}
      onDelete={handleDelete}
      onSubmit={handleSubmitEdit}
      anchors={anchors}
      onRefresh={handleRefresh}
      baseChildren={
        <Grid container direction="column" id="details" spacing={1}>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={6}>
              <DetailsSection sectionTitle="Address:" sectionTextContent={localUnit?.address}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailsSection sectionTitle="Municipality:" sectionTextContent={localUnit?.municipality}/>
            </Grid>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={6}>
              <DetailsSection sectionTitle="Postal code:" sectionTextContent={localUnit?.postalCode}/>
            </Grid>
          </Grid>
          <Box py={2}>
            <Divider textAlign="left"><Typography variant="body2"
                                                  color="text?.secondary">Contacts</Typography></Divider>
          </Box>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={6}>
              <DetailsSection sectionTitle="Email:" sectionTextContent={localUnit?.email}
                              contentRedirect={"mailto:" + localUnit?.email}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailsSection sectionTitle="Phone:" sectionTextContent={localUnit?.phone}
                              contentRedirect={"tel:" + localUnit?.phone}/>
            </Grid>
          </Grid>
        </Grid>
      }
      editChildren={
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              autoFocus
              defaultValue={localUnit?.name}
              autoComplete="name"
              fullWidth
              required
            />
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="address"
                name="address"
                label="Address"
                autoFocus
                defaultValue={localUnit?.address}
                autoComplete="address"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="municipality"
                name="municipality"
                label="Municipality"
                defaultValue={localUnit?.municipality}
                autoComplete="municipality"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="postalCode"
                name="postalCode"
                label="Postal code"
                defaultValue={localUnit?.postalCode}
                autoComplete="postalCode"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid item>
            <DialogFormLabel title="Contacts"/>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                autoFocus
                defaultValue={localUnit?.email}
                autoComplete="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="phone"
                name="phone"
                label="Phone"
                defaultValue={localUnit?.phone}
                autoComplete="phone"
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </Grid>
      }
    >
      <Grid container direction="column" id="departments" spacing={1} pt={1}>
        <Grid item mx={2}>
          <Typography variant="h6">
            Departments
          </Typography>
        </Grid>
        <Grid item>
          {loading
            ? <Grid item container>
              {[...Array(3)].map(() => (
                <Grid item xs={12}>
                  <Skeleton animation="wave" width="100%" height="48px"/>
                </Grid>
              ))}
            </Grid>
            : <DatagridTable
              loading={loading}
              onAdd={() => {
              }}
              rows={departmentsRows}
              columns={departmentsColumns}
            />
          }
        </Grid>
      </Grid>
      <Grid container direction="column" id="vehicles" spacing={1} pt={3}>
        <Grid item mx={2}>
          <Typography variant="h6">
            Vehicles
          </Typography>
        </Grid>
        <Grid item>
          {loading
            ? <Grid item container>
              {[...Array(3)].map(() => (
                <Grid item xs={12}>
                  <Skeleton animation="wave" width="100%" height="48px"/>
                </Grid>
              ))}
            </Grid>
            : <DatagridTable
              loading={loading}
              onAdd={() => {
              }}
              rows={[]}
              columns={[]}
            />
          }
        </Grid>
      </Grid>
    </DetailsPage>
  );
}

export default LocalUnitDetailsPage;