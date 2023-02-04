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
  getAllEquipments,
  getAllHR,
  getDepartment,
  updateDepartment
} from "../../../services/departments.services";
import {getUpdatedTime} from "../../../utils/dateHandler";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import {GridColumns} from "@mui/x-data-grid";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import {defaultHRs} from "../../../services/hr.services";
import {defaultEquipments} from "../../../services/equipments.services";
import {defaultLocalUnit, getLocalUnit} from "../../../services/localUnits.services";
import DetailsSection from "../../../Components/DetailsSection/DetailsSection";

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
  const [localUnit, setLocalUnit] = useState(defaultLocalUnit);
  const [hr, setHR] = useState(defaultHRs);
  const [equipments, setEquipments] = useState(defaultEquipments);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
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

  const anchors = [
    {
      title: "HR",
      id: "hr"
    },
    {
      title: "Equipments",
      id: "equipments"
    }
  ]

  const fetchData = async () => {
    const _departments = await getDepartment(departmentId)
    const _hr = await getAllHR(departmentId);
    const _equipments = await getAllEquipments(departmentId);
    const _localUnit = await getLocalUnit(_departments.localUnitId);
    setDepartment(_departments);
    setHR(_hr);
    setEquipments(_equipments);
    setLocalUnit(_localUnit);
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

  const HRsRows = hr.map((hr) => {
    return {
      id: hr.id,
      name: hr.name,
      surname: hr.surname,
      fiscalCode: hr.fiscalCode,
      phone: hr.phone,
      email: hr.email,
      birthDate: hr.birthDate,
      birthPlace: hr.birthPlace,
      address: hr.address,
      municipality: hr.municipality,
      province: hr.province,
      postalCode: hr.postalCode,
      country: hr.country,
    }
  })
  const HRsColumns: GridColumns = [
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
    {
      field: 'surname',
      headerName: 'Surname',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'fiscalCode',
      headerName: 'Fiscal Code',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'birthPlace',
      headerName: 'Birth Place',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'municipality',
      headerName: 'Municipality',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'province',
      headerName: 'Province',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'postalCode',
      headerName: 'Postal Code',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'country',
      headerName: 'Country',
      minWidth: 150,
      editable: false,
      flex: 1,
    }
  ];

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
      baseChildren={
        <Grid container direction="column" id="details" spacing={1}>
          <Grid item xs={12} sm={6}>
            <DetailsSection
              sectionTitle="Local unit:"
              sectionTextContent={localUnit?.name}
              contentRedirect={`/app/companies/${companyId}/local-units/${localUnit?.id}`}
            />
          </Grid>
        </Grid>
      }
      anchors={anchors}
    >
      <Grid container direction="column" id="hr" spacing={1} pt={1}>
        <Grid item mx={2}>
          <Typography variant="h6">
            HR
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
              rows={HRsRows}
              columns={HRsColumns}
            />
          }
        </Grid>
      </Grid>
      <Grid container direction="column" id="equipments" spacing={1} pt={3}>
        <Grid item mx={2}>
          <Typography variant="h6">
            Equipments
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

export default DepartmentDetailsPage;