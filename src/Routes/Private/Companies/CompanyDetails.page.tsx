import React, {useContext, useEffect, useState} from 'react';
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PageFrame from "../../../Components/PageFrame/PageFrame";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";
import {useCurrentCompany} from "../../../Components/Providers/Company/Company.provider";
import DetailsSection from '../../../Components/DetailsSection/DetailsSection';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DialogFormLabel from "../../../Components/DialogFormLabel/DialoFormLabel";
import {getUpdatedTime} from "../../../utils/dateHandler";
import {Company, updateCompany} from "../../../services/companies.services";
import {getReasonAlert, getResponseAlert} from "../../../utils/requestAlertHandler";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";

function CompanyDetailsPage() {

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const {company} = useCurrentCompany();
  const {setAlertEvent} = useContext(useAlertContext);
  const [updatedTime, setUpdatedTime] = useState(getUpdatedTime());

  useEffect(() => {
    handleRefresh()
  }, []);

  const handleRefresh = () => {
    const interval = setInterval(() => {
      setUpdatedTime(getUpdatedTime());
    }, 500);
    setLoading(false)
    return () => clearInterval(interval);
  }

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newCompany = {
      name: data.get('name'),
      address: data.get('address'),
      email: data.get('email'),
      phone: data.get('phone'),
      province: data.get('province'),
      postalCode: data.get('postalCode'),
      fiscalCode: data.get('fiscalCode'),
      vatCode: data.get('vatCode'),
      registeredMunicipality: data.get('registeredMunicipality'),
    } as Company;

    await updateCompany(company.id, newCompany)
      .then((res) => {
        setAlertEvent(getResponseAlert(res));
        handleRefresh();
      })
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
      });
  }

  return (
    <PageFrame>
      <DetailsPage
        title={company.name}
        icon={<HomeOutlinedIcon fontSize="large"/>}
        updatedTime={updatedTime}
        loading={loading}
        allowModify={{edit: true, delete: false}}
        onRefresh={handleRefresh}
        onSubmit={handleSubmitEdit}
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
                <DetailsSection sectionTitle="Municipality" sectionTextContent={company?.registeredMunicipality}/>
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
        editChildren={
          <Grid container direction="column" spacing={1}>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="vatCode"
                  name="vatCode"
                  autoFocus
                  label="Vat code"
                  defaultValue={company?.vatCode}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="fiscalCode"
                  name="fiscalCode"
                  label="Fiscal code"
                  defaultValue={company?.fiscalCode}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="registeredMunicipality"
                  name="registeredMunicipality"
                  label="Municipality"
                  autoFocus
                  defaultValue={company?.registeredMunicipality}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  autoFocus
                  defaultValue={company?.address}
                  autoComplete="address"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="province"
                  name="province"
                  label="Province"
                  autoFocus
                  defaultValue={company?.province}
                  autoComplete="province"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="postalCode"
                  name="postalCode"
                  label="Postal code"
                  autoFocus
                  defaultValue={company?.postalCode}
                  autoComplete="postalCode"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid item>
              <DialogFormLabel title="Contacts"/>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  autoFocus
                  defaultValue={company?.email}
                  autoComplete="email"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  defaultValue={company?.phone}
                  autoComplete="phone"
                  fullWidth
                  required
                />
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

