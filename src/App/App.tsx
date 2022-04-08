import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  Grow,
  IconButton,
  LinearProgress,
  Typography,
  useMediaQuery
} from "@mui/material";
import PageTitle from "./PageTitle/PageTitle";
import SensorsRoundedIcon from '@mui/icons-material/SensorsRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Chart from "./Chart/Chart";
import {DataGrid, GridColumns} from "@mui/x-data-grid";
import {useAlert} from "./Alert/Alert";
import NoRowsOverlay from "./DatagridComponents/DatagridNoRow";
import CustomGridToolbar from "./DatagridComponents/DatagridToolbar";
import DatagridError from "./DatagridComponents/DatagridError";
import LoadingOverlay from "./DatagridComponents/DatagridLoading";
import {useTheme} from "@mui/material/styles";
import DetailsSection from "./DetailsSection/DetailsSection";
import SyncButton from "./SyncButton/SyncButton";

const sampleData = {
  'dispositivo': {
    'id': '25555',
    'mac': '0xc49deda439d5',
    'ip': '192.168.1.12',
    'soglia': 30,
    'sensore': 'hum',
    'um': '%'
  },
  'datiRilevazione': [
    {
      'valore1': 25.5,
      'valore2': 6.2,
      'valore3': 20,
      'time': '11:30'
    },
    {
      'valore1': 25.8,
      'valore2': 7.2,
      'valore3': 20.4,
      'time': '11:35'
    },
    {
      'valore1': 26.5,
      'valore2': 3.2,
      'valore3': 22.5,
      'time': '11:40'
    },
    {
      'valore1': 35.5,
      'valore2': 6.7,
      'valore3': 60,
      'time': '11:45'
    }
  ]
}

function App() {

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {setAlertEvent} = useAlert();
  const [openInfoDialog, setOpenInfoDialog] = useState(false)
  const um = sampleData.dispositivo.um;

  useEffect(() => {
    let dt = new Date();
    setUpdatedTime(
      ("0" + dt.getHours()).slice(-2)
      + ":"
      + ("0" + dt.getMinutes()).slice(-2)
    );
  }, []);

  const rows = sampleData.datiRilevazione.map((el, index) => ({
    id: index,
    n: index + 1,
    valore1: el.valore1 + um,
    valore2: el.valore2 + um,
    valore3: el.valore3 + um,
    time: el.time,
  }));

  const columns: GridColumns = [
    {
      field: 'n',
      headerName: 'n°',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'time',
      headerName: 'Tempo',
      description: 'Tempo alla rilevazione',
      minWidth: 150,
      flex: 0.5,
      editable: false,
    },
    {
      field: 'valore1',
      headerName: 'Valore1',
      minWidth: 150,
      align: 'center',
      flex: 0.33,
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'valore2',
      headerName: 'Valore2',
      minWidth: 150,
      flex: 0.33,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'valore3',
      headerName: 'Valore3',
      minWidth: 150,
      flex: 0.33,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
  ];

  const handleUpdate = () => {
    let dt = new Date();
    setUpdatedTime(
      ("0" + dt.getHours()).slice(-2)
      + ":"
      + ("0" + dt.getMinutes()).slice(-2)
    );
  }

  const handleDoubleClick = (e: any) => {

  }

  return (
    <Container>
      <Grid container direction="column" py={16} spacing={2}>
        <Grid item xs={12}>
          <PageTitle title={sampleData.dispositivo.sensore} icon={<SensorsRoundedIcon fontSize="large"/>}>
            <Box pt={1}>
              <Grow in key={1}>
                <IconButton
                  color="primary"
                  children={<InfoOutlinedIcon/>}
                  onClick={() => setOpenInfoDialog(true)}
                />
              </Grow>
            </Box>
          </PageTitle>
        </Grid>
        <Grid item xs={12}>
          <SyncButton updatedTime={updatedTime} onClick={handleUpdate}/>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={12} ml={2} mt={1}>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Grafico
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Chart
              data={sampleData.datiRilevazione}
              max={sampleData.dispositivo.soglia}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={12} ml={2} mt={1}>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Tabella
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{height: "auto", width: "100%"}}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                autoHeight
                error={null}
                disableSelectionOnClick
                loading={loading}
                disableColumnMenu
                onRowDoubleClick={handleDoubleClick}
                components={{
                  Toolbar: CustomGridToolbar,
                  NoRowsOverlay: NoRowsOverlay,
                  ErrorOverlay: DatagridError,
                  LoadingOverlay: LoadingOverlay,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openInfoDialog}
        onClose={() => setOpenInfoDialog(false)}
        fullWidth
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : theme.spacing(4),
            boxShadow: 0,
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          }
        }}
        onBackdropClick={() => {
        }}
        scroll="paper"
        TransitionComponent={Fade}
        fullScreen={isMobile}
      >
        {loading && <LinearProgress color="primary"/>}
        <DialogTitle>
          <Typography variant="h6">Info</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box py={1}>
              <DetailsSection
                sectionTitle="id"
                sectionTextContent={sampleData.dispositivo.id}
                divider
              />
              <DetailsSection
                sectionTitle="Ip"
                sectionTextContent={sampleData.dispositivo.ip}
                divider
              />
              <DetailsSection
                sectionTitle="Mac"
                sectionTextContent={sampleData.dispositivo.mac}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <Box pr={2} pb={2}>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => setOpenInfoDialog(false)}
            >
              Chiudi
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
}

export default App;
