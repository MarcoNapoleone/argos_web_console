import React, {FC} from "react";
import {Box, Divider, Grid, Link, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type DetailsSectionProps = {
  sectionTitle: string,
  sectionTextContent?: string | number | null,
  contentRedirect?: string,
  adornment?: string,
  children?: React.ReactNode,
  divider?: boolean,
}

const DetailsSection: FC<DetailsSectionProps> = (
  {
    sectionTitle,
    sectionTextContent,
    children,
    contentRedirect,
    adornment,
    divider,
  }
) => {
  const theme = useTheme();
  if (sectionTextContent === ""
    || sectionTextContent === null
    || sectionTextContent === undefined
    || sectionTextContent === "01 Gen 0001"
    || sectionTextContent === "0001-01-01T00:00:00"
  )
    return (
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary"><em>{sectionTitle}</em></Typography>
          </Grid>
          <Grid item xs>
            <Typography color="text.secondary"><em>N/D</em></Typography>
          </Grid>
          {divider && <Grid item xs={12} my={1}><Divider/></Grid>}
        </Grid>
      </Box>
    );
  else return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="caption" color="text.secondary"><em>{sectionTitle}</em></Typography>
        </Grid>
        {children
          ? <Grid item xs={12}>
            <Typography>{children}</Typography>
          </Grid>
          : <Grid item xs={12}>
            {Boolean(contentRedirect)
              ? <Link
                underline="always"
                key="1"
                color="inherit"
                href={contentRedirect}
              >
                {sectionTextContent}
              </Link>
              : Boolean(adornment)
                ? <Typography>{sectionTextContent + ' ' + adornment}</Typography>
                : <Typography>{sectionTextContent}</Typography>
            }
          </Grid>
        }
        {divider && <Grid item xs={12} my={1}><Divider/></Grid>}
      </Grid>
    </Box>
  );
}


export default DetailsSection;