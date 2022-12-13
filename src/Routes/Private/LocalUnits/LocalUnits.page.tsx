import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {Grid, IconButton, useMediaQuery} from "@mui/material";
import DatagridTable from "../../../Components/DatagridComponents/DatagridTable";
import AddDialog, {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import MainPage from "../../../Components/MainPage/MainPage";
import {GridColumns} from "@mui/x-data-grid";
import {DirectionsBoatFilledOutlined} from "@mui/icons-material";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteDialog, {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

const LocalUnitsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const {setOpenAddDialog} = useContext(useAddDialogContext);
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);
  const {setAlertEvent} = useContext(useAlertContext);

  useEffect(() => {

  }, []);

  const RenderMoreButton = (e: any) => {
    const handleMoreClick = () => {
      navigate(`/app/navi/${e.row.shipId}`);
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
    navigate(`/app/navi/${e.row.shipId}`);
  }

  const rows = [];
  const columns: GridColumns = [
    {
      field: 'shipId',
      headerName: 'Id',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Descrizione',
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'imoNumber',
      headerName: 'IMO',
      description: 'Numero IMO',
      width: 100,
      editable: false,
    },
    {
      field: 'length',
      headerName: 'Lunghezza',
      description: 'Lunghezza',
      width: 100,
      editable: false,
    },
    {
      field: 'width',
      headerName: 'Larghezza',
      description: 'Larghezza',
      width: 100,
      editable: false,
    },
    {
      field: 'thruster',
      headerName: 'Eliche',
      description: 'Eliche di manovra',
      type: 'boolean',
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: 'crane',
      headerName: 'Gru',
      description: 'Gru di bordo',
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: 'holdsType',
      headerName: 'Stive',
      description: 'Tipo sive',
      width: 100,
      editable: false,
      sortable: false,
    },
    {
      field: 'more',
      headerName: 'Altro',
      description: 'Dettagli',
      align: 'center',
      renderCell: RenderMoreButton,
      width: 90,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'edit',
      headerName: 'Modifica',
      description: 'Modifica, Elimina',
      align: 'center',
      renderCell: RenderDeleteButton,
      width: 110,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    }
  ];

  const handleUpdate = () => {
    setLoading(true)

  }

  return (
    <MainPage title="Local Units" icon={<DirectionsBoatFilledOutlined/>} onUpdate={handleUpdate} updatedTime={updatedTime}>
      <DatagridTable
        rows={rows}
        allowAdd
        columns={columns}
        loading={loading}
        onRowDoubleClick={handleDoubleClick}
      />
      <AddDialog title={"Aggiungi "} handleSubmit={()=>{}}>
        <Grid container direction="column" spacing={1}>

        </Grid>
      </AddDialog>
    </MainPage>
  );
}

export default LocalUnitsPage;