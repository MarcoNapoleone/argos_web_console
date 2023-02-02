import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Grid, Link, Skeleton, TextField, Typography} from "@mui/material";
import {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {
  defaultDepartment,
  deleteDepartment,
  Department,
  getDepartment,
  updateDepartment
} from "../../../services/departments.services";
import {getUpdatedTime} from "../../../utils/dateHandler";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";

type PageParamsType = {
  departmentId: string;
  companyId: string;
}
const DepartmentDetailsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {companyId, departmentId} = useParams<PageParamsType>();
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState(defaultDepartment);
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
      href={`/app/companies/${companyId}/departments`}
    >
      Departments
    </Link>,
    <Typography
      key="3" color="text.primary"
    >
      {loading
        ? <Skeleton animation="wave" width="30px"/>
        : department?.name?.charAt(0).toUpperCase() + department?.name?.slice(1)
      }
    </Typography>,
  ];

  const fetchData = async () => {
    const res = await getDepartment(departmentId)
    setDepartment(res);
  }

  useEffect(() => {
    handleRefresh()
  }, []);

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
    deleteDepartment(departmentId)
      .then((res) => {
        setAlertEvent(getResponseAlert(res));
        setOpenDeleteDialog(false);
        navigate(`/app/companies/${companyId}/departments`)
      })
      .catch((err) => {
          setAlertEvent(getReasonAlert(err));
        }
      )
  }

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newDepartment: Department = {
      name: data.get("name") as string,
    }
    await updateDepartment(departmentId, newDepartment)
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
      title={department.name}
      loading={loading}
      updatedTime={updatedTime}
      breadcrumbs={breadcrumbs}
      allowModify={{edit: true, delete: true}}
      onDelete={handleDelete}
      onSubmit={handleSubmitEdit}
      onRefresh={handleRefresh}
      editChildren={
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              autoFocus
              defaultValue={department?.name}
              autoComplete="name"
              fullWidth
              required
            />
          </Grid>
        </Grid>
      }
    ></DetailsPage>
  );
}

export default DepartmentDetailsPage;