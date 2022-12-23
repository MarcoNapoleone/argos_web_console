import React, {useEffect, useState} from 'react';
import {Box, Divider, Grid, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAlert} from "../../../Components/Providers/Alert/Alert.provider";
import PageFrame from "../../../Components/PageFrame/PageFrame";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {useCurrentCompany} from "../../../Components/Providers/Company/Company.provider";
import DetailsSection from '../../../Components/DetailsSection/DetailsSection';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {useTranslation} from "react-i18next";

function CompanyDetailsPage() {

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const {company} = useCurrentCompany();
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const {t} = useTranslation();

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
        icon={<HomeOutlinedIcon fontSize="large"/>}
        updatedTime={updatedTime}
        loading={loading}
        onUpdate={() => {
        }}
        baseChildren={
          <Grid container direction="column" spacing={1}>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Vat code" sectionTextContent={company?.vatCode}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Fiscal code" sectionTextContent={company?.fiscalCode}/>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Municipality" sectionTextContent={company?.email}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Address" sectionTextContent={company?.address}/>
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Province" sectionTextContent={company?.province}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Postal code" sectionTextContent={company?.postalCode}/>
              </Grid>
            </Grid>

            <Box py={2}>
              <Divider textAlign="left">
                <Typography variant="body2" color="text.secondary">Contacts</Typography>
              </Divider>
            </Box>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Email" sectionTextContent={company?.email}
                                contentRedirect={"mailto:" + company?.email}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DetailsSection sectionTitle="Phone" sectionTextContent={company?.phone}
                                contentRedirect={"tel:" + company?.phone}/>
              </Grid>
            </Grid>
          </Grid>
        }
      >
      </DetailsPage>
    </PageFrame>
  );
}

export default CompanyDetailsPage;

