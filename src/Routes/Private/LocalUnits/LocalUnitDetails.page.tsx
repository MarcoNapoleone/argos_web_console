import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Box, Divider, Grid, IconButton, Link, Skeleton, TextField, Typography, useMediaQuery} from "@mui/material";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import AddDialog, {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteDialog, {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import DetailsSection from "../../../Components/DetailsSection/DetailsSection";
import {defaultLocalUnit, getLocalUnit, LocalUnit} from "../../../services/localUnits.services";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import DialogFormLabel from "../../../Components/DialogFormLabel/DialoFormLabel";

type PageParamsType = {
  companyId: string;
  localUnitId: string;
};


const LocalUnitDetailsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {companyId} = useParams<PageParamsType>();
  const {localUnitId} = useParams<PageParamsType>();
  const [loading, setLoading] = useState(true);
  const [localUnit, setLocalUnit] = useState(defaultLocalUnit);
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

  const fetchData = async () => {
    const res = await getLocalUnit(localUnitId)
    setLocalUnit(res);
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

  const handleUpdate = () => {
    setLoading(true)
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const handleDelete = () => {

  };

  return (
    <DetailsPage
      title={localUnit?.name}
      loading={loading}
      updatedTime={updatedTime}
      breadcrumbs={breadcrumbs}
      allowEdit
      onDelete={handleDelete}
      onSubmit={handleSubmitEdit}
      onUpdate={handleUpdate}
      baseChildren={
        <Grid container direction="column" spacing={1}>
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
    ></DetailsPage>
  );
}

export default LocalUnitDetailsPage;