import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Grid, IconButton, useMediaQuery} from "@mui/material";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
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
import {defaultHRs, getAllHR} from "../../../services/hr.services";


type PageParamsType = {
  companyId: string;
};

const HRPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {companyId} = useParams<PageParamsType>();
  const {company} = useCurrentCompany();

  const [hr, setHR] = useState(defaultHRs);
  const [loading, setLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const {setOpenAddDialog} = useContext(useAddDialogContext);
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);
  const {setAlertEvent} = useContext(useAlertContext);

  const fetchData = async () => {
    const res = await getAllHR(companyId)
    setHR(res);
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
    const handleDeleteClick = () => {

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

  const rows = hr.map((hr) => {
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
      title="HR"
      //icon={<GroupOutlined fontSize="large"/>}
      onRefresh={handleRefresh}
      updatedTime={updatedTime}>
      <DatagridTable
        rows={rows}
        allowAdd
        columns={columns}
        loading={loading}
        onRowDoubleClick={handleDoubleClick}
      />
      <AddDialog title={"Add "} handleSubmit={() => {
      }}>
        <Grid container direction="column" spacing={1}>

        </Grid>
      </AddDialog>
    </MainPage>
  );
}

export default HRPage;