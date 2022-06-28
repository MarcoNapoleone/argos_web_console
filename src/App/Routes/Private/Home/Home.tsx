import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
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
  Skeleton,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import {DataGrid} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";
import PageTitle from "../../../PageTitle/PageTitle";
import {useAlert} from "../../../Alert/Alert";
import {servicePath} from "../../../../services/services";
import NoRowsOverlay from "../../../DatagridComponents/DatagridNoRow";
import CustomGridToolbar from "../../../DatagridComponents/DatagridToolbar";
import DetailsSection from "../../../DetailsSection/DetailsSection";
import DatagridError from "../../../DatagridComponents/DatagridError";
import {getReasonAlert} from "../../../../utils/requestAlertHandler";
import DataChart from "../../../Chart/DataChart";
import LoadingOverlay from "../../../DatagridComponents/DatagridLoading";
import {getFormattedTime} from "../../../../utils/dateHandler";
import SyncButton from "../../../SyncButton/SyncButton";

const sampleData = {
  "device": {
    "id": "25555",
    "mac": "0xc49deda439d5",
    "ip": "192.168.1.12",
    "name": "Ventola Sud"
  },
  "data": [
    {
      "info": {
        "sensore": "Tempertaura",
        "keys": ["temp0", "temp1"],
        "um": "°C",
        "max": 30
      },
      "now": {
        "value": 24.0,
        "time": "2022-06-24 10:00:00"
      },
      "rilevazioni": [
        {
          "temp0": 20.9,
          "temp1": 24.9,
          "time": "2022-06-24 08:00:00"
        },
        {
          "temp0": 16.9,
          "temp1": 28.9,
          "time": "2022-06-24 09:00:00"
        },
        {
          "temp0": 21.4,
          "temp1": 29.1,
          "time": "2022-06-24 10:00:00"
        },
        {
          "temp0": 21.4,
          "temp1": 29.1,
          "time": "2022-06-24 10:00:00"
        },
        {
          "temp0": 21.4,
          "temp1": 29.1,
          "time": "2022-06-24 10:00:00"
        },
        {
          "temp0": 21.4,
          "temp1": 29.1,
          "time": "2022-06-24 10:00:00"
        }
      ]
    },
    {
      "info": {
        "sensore": "Umidità",
        "keys": ["hum"],
        "um": "%",
        "max": 75
      },
      "now": {
        "value": 78.9,
        "time": "2022-06-24 10:00:00"
      },
      "rilevazioni": [
        {
          "hum": 72.1,
          "time": "2022-06-24 08:00:00"
        },
        {
          "hum": 75.3,
          "time": "2022-06-24 09:00:00"
        },
        {
          "hum": 78.9,
          "time": "2022-06-24 10:00:00"
        }
      ]
    }
  ]
}

function Home() {

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const [device, setDevice] = useState<any>({})
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {setAlertEvent} = useAlert();
  const [openInfoDialog, setOpenInfoDialog] = useState(false)

  useEffect(() => {
    servicePath
      .get('/getgraph.php')
      .then(res => {
        setDevice(res.data)
        let dt = new Date();
        setUpdatedTime(
          ("0" + dt.getHours()).slice(-2)
          + ":"
          + ("0" + dt.getMinutes()).slice(-2)
        );
        setLoading(false)
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      });
  }, []);

  const getRows = (keys: Array<string>, data: Array<any>, um: string) => {
    let rows: Array<any> = [];
    data.forEach((el, index) => {
      const row = {
        id: index,
        n: index + 1,
      }
      for (const key of keys) {
        row[`${key}`] = el[`${key}`] + ' ' + um
      }
      row["time"] = getFormattedTime(new Date(el["time"]))
      rows.push(row)
    })
    return rows
  }

  const getColumns = (keys: Array<string>) => {
    let columns: Array<any> = [
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
    ]
    for (const key of keys) {
      columns.push(
        {
          field: key,
          headerName: key,
          minWidth: 150,
          align: 'center',
          flex: 1 / keys?.length,
          editable: false,
          headerAlign: 'center',
        }
      )
    }
    return columns
  }

  const handleUpdate = () => {
    setLoading(true)
    servicePath
      .get('/getgraph.php')
      .then(res => {
        setDevice(res.data)
        let dt = new Date();
        setUpdatedTime(
          ("0" + dt.getHours()).slice(-2)
          + ":"
          + ("0" + dt.getMinutes()).slice(-2)
        );
        setLoading(false)
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      });
  }

  const handleDoubleClick = (e: any) => {

  }

  return (
    <Container maxWidth="xl" disableGutters={isMobile}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PageTitle
            title={sampleData?.device?.name}
            icon={
              <SensorsIcon
                fontSize="large"/>
            }
            loading={loading}
          >
            <Box pt={1}>
              <Grow in key={1}>
                <IconButton
                  color="primary"
                  disabled={loading}
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
        {loading
          ? <Grid item xs={12} container spacing={1}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <Box p={2}>
                  <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
                    <Grid item xs={8} sm={9} container>
                      <Grid item xs={12}>
                        <Skeleton>
                          <Typography color="text.secondary">
                            lorem ipsum
                          </Typography>
                        </Skeleton>
                      </Grid>
                      <Grid item>
                        <Skeleton>
                          <Typography variant={isMobile ? "h6" : "h4"} color="secondary">
                            00.00um
                          </Typography>
                        </Skeleton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <Stack width="100%" height={350} justifyContent="center" alignItems="center">
                  <CircularProgress/>
                </Stack>
              </Card>
            </Grid>
          </Grid>
          : device?.data?.map((el, index) => (
            <Grid item xs={12} lg={device?.data?.length === 1 ? 12 : 6} container spacing={1} direction="column"
                  justifyContent="flex-start">
              <Grid item ml={2} mt={1}>
                <Typography
                  variant="h6"
                >
                  {el?.info?.sensore}
                </Typography>
              </Grid>
              <Grid item>
                <Card variant="outlined">
                  <Box p={2}>
                    <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
                      <Grid item xs={8} sm={9} container direction="column">
                        <Grid item>
                          <Typography color="text.secondary">
                            {getFormattedTime(new Date(el?.now?.time))}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant={isMobile ? "h6" : "h4"} color="secondary">
                            {el?.now?.value + el?.info?.um}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/*<Grid item xs={4} sm={3}>
                      <Button
                        onClick={() => {
                          console.log(device)
                        }}
                        color="primary"
                        fullWidth
                        sx={{
                          height: theme.spacing(6),
                          borderRadius: theme.spacing(4),
                          backgroundColor: alpha(theme.palette.primary.main, 0.20),
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.25),
                          },
                        }}
                        startIcon={
                          <InfoOutlinedIcon/>
                        }
                      >
                        info
                      </Button>
                    </Grid>*/}
                    </Grid>
                  </Box>
                </Card>
              </Grid>
              <Grid item>
                <DataChart
                  data={el?.rilevazioni.map((r) => {
                    return {...r, "time": getFormattedTime(new Date(r.time))}
                  })}
                  max={el?.info?.max}
                  keys={el?.info?.keys}
                />
              </Grid>
              <Grid item>
                <div style={{height: "auto", width: "100%"}}>
                  <DataGrid
                    rows={getRows(el?.info?.keys, el?.rilevazioni, el?.info?.um)}
                    columns={getColumns(el?.info?.keys)}
                    getRowId={(row) => row.id}
                    autoHeight
                    pagination
                    rowsPerPageOptions={[5]}
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
          ))}
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
                sectionTextContent={sampleData.device.id}
                divider
              />
              <DetailsSection
                sectionTitle="Ip"
                sectionTextContent={sampleData.device.ip}
                divider
              />
              <DetailsSection
                sectionTitle="Mac"
                sectionTextContent={sampleData.device.mac}
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

export default Home;

