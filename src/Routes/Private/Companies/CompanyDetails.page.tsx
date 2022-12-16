import React, {useEffect, useState} from 'react';
import {Grid, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAlert} from "../../../Components/Providers/Alert/Alert.provider";
import PageFrame from "../../../Components/PageFrame/PageFrame";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {useCurrentCompany} from "../../../Components/Providers/Company/Company.provider";

function CompanyDetailsPage() {

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const {company} = useCurrentCompany();
  const [updatedTime, setUpdatedTime] = useState("00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedTime(new Date().toLocaleTimeString())
    }, 1000);
    let dt = new Date();
    setUpdatedTime(
      ("0" + dt.getHours()).slice(-2)
      + ":"
      + ("0" + dt.getMinutes()).slice(-2)
    );
    setLoading(false)
    return () => clearInterval(interval);
  }, []);

  return (
    <PageFrame>
      <DetailsPage
        title={company.name}
        updatedTime={updatedTime}
        loading={loading}
        onUpdate={()=>{}}
        baseChildren={
          <Grid container direction="column" spacing={1}>
           {/* <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Data inizio:" sectionTextContent={getFormattedDate(Order?.dataInizio)}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Data fine"
                                sectionTextContent={Boolean(Order?.statoCommessa) ? "In corso" : getFormattedDate(Order?.dataFine)}/>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DetailsSection fullWidth sectionTitle="Fatturazione" sectionTextContent={Order?.previstaFatturazione}>
                <YeoOrNotChip isYes={Boolean(Order?.previstaFatturazione)}/>
              </DetailsSection>
            </Grid>
            <Grid item xs={12}>
              <DetailsSection fullWidth sectionTitle="Descrizione:" sectionTextContent={Order?.descrizioneCommessa}/>
            </Grid>
            <Box py={2}>
              <Divider textAlign="left"><Typography variant="body2"
                                                    color="text.secondary">Tipologia</Typography></Divider>
            </Box>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Attività:"
                                sectionTextContent={Order?.tipoAttivitaCommessa?.descrizioneTipoAttivitaCommessa}>
                  <Chip variant="filled" size="small"
                        icon={getOrderIcon(Order?.tipoAttivitaCommessa?.idTipoAttivitaCommessa)}
                        label={Order?.tipoAttivitaCommessa?.descrizioneTipoAttivitaCommessa}/>
                </DetailsSection>
              </Grid>
              {Order?.tipoAttivitaCommessa?.idTipoAttivitaCommessa === 1 &&
                  <Grid item xs={12} sm={6}>
                    <DetailsSection sectionTitle="Nave:" sectionTextContent={Order?.nave?.nome}>
                      <Chip variant="filled" size="small"
                            label={<Link color="inherit"
                                         href={`/app/navi/${Order?.nave?.idNave}`}>{Order?.nave?.nome}</Link>}/>
                    </DetailsSection>
                  </Grid>
              }
            </Grid>
            <Box py={2}>
              <Divider textAlign="left"><Typography variant="body2"
                                                    color="text.secondary">Cliente</Typography></Divider>
            </Box>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Cliente:" sectionTextContent={Order?.cliente?.ragioneSociale}>
                  <Chip
                    variant="filled"
                    size="small"
                    label={
                      <Link color="inherit" href={`/app/clienti/${Order?.cliente?.idCliente}`}>
                        {Order?.cliente?.ragioneSociale}
                      </Link>
                    }
                  />
                </DetailsSection>
              </Grid>
            </Grid>
            <Box py={2}>
              <Divider textAlign="left"><Typography variant="body2" color="text.secondary">Prodotti</Typography></Divider>
            </Box>
            <Grid item xs={12} sm={6}>
              <ListDetailsSection sectionTitle="Prodotti:" sectionArray={Order?.commessaProdotti?.map((el) => {
                return el?.prodotto?.descrizioneProdotto
              })}/>
            </Grid>*/}
          </Grid>
        }
        ></DetailsPage>
    </PageFrame>
  );
}

export default CompanyDetailsPage;

