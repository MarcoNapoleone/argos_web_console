import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Autocomplete, Grid, IconButton, TextField, useMediaQuery} from "@mui/material";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import AddDialog, {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import MainPage from "../../../Components/MainPage/MainPage";
import {GridColumns} from "@mui/x-data-grid";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteDialog, {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import {useCurrentCompany} from "../../../Components/Providers/Company/Company.provider";
import {
  createDepartment,
  defaultDepartments,
  deleteDepartment,
  Department,
  getAllDepartments
} from "../../../services/departments.services";
import {defaultLocalUnits, getAllLocalUnits, LocalUnit} from "../../../services/localUnits.services";
import {getUpdatedTime} from "../../../utils/dateHandler";


type PageParamsType = {
  companyId: string;
};

const DepartmentsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {companyId} = useParams<PageParamsType>();
  const {company} = useCurrentCompany();
  const [departments, setDepartments] = useState(defaultDepartments);
  const [loading, setLoading] = useState(true);
  const [selectLoading, setSelectLoading] = useState(true);
  const [localUnits, setLocalUnits]: [LocalUnit[], (posts: LocalUnit[]) => void] = useState(defaultLocalUnits);
  const [selectedLocalUnit, setSelectedLocalUnit]: [LocalUnit, (posts: LocalUnit) => void] = useState(null);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());
  const {setOpenAddDialog} = useContext(useAddDialogContext);
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);
  const {setAlertEvent} = useContext(useAlertContext);

  const fetchData = async () => {
    const res = await getAllDepartments(companyId)
    setDepartments(res);
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

  const getLocalUnits = async () => {
    setSelectLoading(true)
    const res = await getAllLocalUnits(companyId)
    setLocalUnits(res)
    setSelectLoading(false)
  }

  const handleRefresh = () => {
    setLoading(true)
    setUpdatedTime(getUpdatedTime())
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }

  const handleMoreInfoClick = (e: any) => {
    navigate(`/app/companies/${companyId}/departments/${e.row.id}`);
  };

  const RenderMoreButton = (e: any) => {

    return (
      <IconButton
        onClick={handleMoreInfoClick}
        size="small"
      >
        <OpenInNewOutlinedIcon/>
      </IconButton>
    );
  }

  const RenderDeleteButton = (e: any) => {
    const handleDeleteClick = async () => {
      setLoading(true);
      await deleteDepartment(e.row.id)
        .then((res) => {
          setAlertEvent(getResponseAlert(res));
          setOpenDeleteDialog(false);
          handleRefresh();
        })
        .catch((err) => {
          setAlertEvent(getReasonAlert(err));
        })
    };
    return (
      <>
        <IconButton
          onClick={() => setOpenDeleteDialog(true)}
          size="small"
        >
          <DeleteIcon/>
        </IconButton>
        <DeleteDialog handleDelete={handleDeleteClick} title="Department"/>
      </>
    );
  }

  const handleSubmitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newDepartment: Department = {
      name: data.get("name") as string,
      localUnitId: selectedLocalUnit.id,
    }
    await createDepartment(companyId, newDepartment)
      .then((res) => {
        setOpenAddDialog(false);
        handleRefresh();
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
      })

  };

  const rows = departments.map((department) => {
    return {
      id: department.id,
      localUnitId: department.localUnitId,
      name: department.name,
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
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      editable: false,
      flex: 1,
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

  return (
    <MainPage
      title="Departments"
      onRefresh={handleRefresh}
      updatedTime={updatedTime}>
      <DatagridTable
        rows={rows}
        allowAdd
        columns={columns}
        loading={loading}
        onRowDoubleClick={handleMoreInfoClick}
      />
      <AddDialog
        title={"Add department"}
        handleSubmit={handleSubmitCreate}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Name"
              autoFocus
              autoComplete="name"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="localUnits"
              loading={selectLoading}
              multiple={false}
              value={selectedLocalUnit}
              onOpen={getLocalUnits}
              onChange={(event: any, newValue: any) => {
                setSelectedLocalUnit(newValue);
              }}
              options={localUnits}
              getOptionLabel={(option) => option?.name}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Local unit"
                />
              )}
            />
          </Grid>
        </Grid>
      </AddDialog>
    </MainPage>
  );
}

export default DepartmentsPage;