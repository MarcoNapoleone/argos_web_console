// @ts-ignore
import React, {FC, useContext, useState} from 'react';
import {Breadcrumbs, Container, Grid, Link, Typography, useMediaQuery} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PageTitle from "../PageTitle/PageTitle";
import SyncButton from "../SyncButton/SyncButton";
import {useTheme} from "@mui/material/styles";

interface MainPageProps {
  icon?: React.ReactNode,
  onUpdate?: () => void,
  updatedTime?: string,
  breadcrumbs?: JSX.Element[],
  loading?: boolean,
  children?: React.ReactNode,
  title: string,
  titleColor?: "primary" | "secondary",
}

const MainPage: FC<MainPageProps> = (
  {
    icon,
    onUpdate,
    updatedTime,
    loading,
    breadcrumbs,
    children,
    title
  }
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const usedBreadcrumbs = Boolean(breadcrumbs) ? breadcrumbs : [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/app/dashboard/"
    >
      App
    </Link>,
    <Typography
      key="2" color="text.primary"
    >
      {title}
    </Typography>,
  ];

  return (
    <Container maxWidth="xl" disableGutters={isMobile}>
      <Grid container justifyContent="center" direction="column" spacing={1} pt={10}>
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small"/>}
          >
            {usedBreadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <PageTitle title={title} icon={!isMobile && icon} loading={loading}/>
        </Grid>
        {Boolean(updatedTime)
          ? <Grid item>
            <SyncButton updatedTime={updatedTime} onClick={onUpdate}/>
          </Grid>
          : null
        }
        <Grid item mt={3}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainPage;

