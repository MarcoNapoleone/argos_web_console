import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Grow, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAlert} from "../../../Alert/Alert";
import {servicePath} from "../../../../services/services";
import {getReasonAlert} from "../../../../utils/requestAlertHandler";
import AddCard from "../../../AddCard/AddCard";
import CompanyCard from "./CompanyCard";
import TopBar from "../../../TopBar/TopBar";

function CompaniesPage() {

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {setAlertEvent} = useAlert();

  useEffect(() => {
    servicePath
      .get('/companies')
      .then(res => {
        setCompanies(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      });
  }, []);

  return (
    <>
      <TopBar onMenuClick={null} isOpen={false}/>
      <Box py={16}>
        <Container maxWidth="xl" disableGutters={isMobile}>
          <Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
              {loading
                ? <>
                  <Grid item xs={12} md={4}>
                    <AddCard disabled/>
                  </Grid>
                  {[...Array(5)].map(() => (
                      <Grid item xs={12} md={4}>
                        <CompanyCard loadingMode/>
                      </Grid>
                    )
                  )}
                </>
                : <>
                  <Grow in style={{transitionDelay: `50ms`}}>
                    <Grid item xs={12} md={4}>
                      <AddCard onClick={() => {
                      }}/>
                    </Grid>
                  </Grow>
                  {companies.slice(0).reverse().map((el, index) => (
                    <Grow in style={{transitionDelay: `${index * 50}ms`}}>
                      <Grid item xs={12} md={4}>
                        <CompanyCard
                          order={el}
                        />
                      </Grid>
                    </Grow>
                  ))}
                </>
              }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default CompaniesPage;

