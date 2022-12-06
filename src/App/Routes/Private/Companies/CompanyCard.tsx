import React from "react";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {Skeleton} from "@mui/lab";
import {alpha, Box, Card, CardActionArea, CardContent, Chip, Grid, Typography} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../../../utils/dateHandler";
import {TypeBackground} from "@mui/material/styles/createPalette";

type OrderCardProps = {
  order?: any,
  loadingMode?: boolean,
  bgColor?: TypeBackground,
}

const CompanyCard: React.FC<OrderCardProps> = (
  {
    order,
    loadingMode,
  }
) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getLabel = (order: any) => {
    if (order.statoCommessa !== 0) {
      return 'Chiusa'
    } else {
      const then = new Date();
      then.setDate(then.getDate() - 3);
      if (new Date(order.dataInizio) > then) {
        return 'Nuova';
      } else return 'Attiva'
    }
  }

  const handleClick = () => {
    navigate(`/app/azienda/${order.idCommessa}`);
    window.location.reload();
  }
  return (
    <>
      {loadingMode
        ? <Skeleton variant="rectangular" width="100%" animation="wave" sx={{borderRadius: '16px'}}>
          <CardActionArea sx={{
            height: '100%',
          }} onClick={handleClick}>
            <CardContent>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Box color="text.secondary">
                    <AccessTimeOutlinedIcon fontSize="small" color="inherit"/>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div" color="text.secondary">
                    loading
                  </Typography>
                </Grid>
              </Grid>
              <Typography gutterBottom variant="h5" component="div">
                loading
              </Typography>
              <Chip
                size="small"
                label="loading"
              />
            </CardContent>
          </CardActionArea>
        </Skeleton>
        : <Card variant="outlined">
          <CardActionArea sx={{
            height: '100%',
          }} onClick={handleClick}>
            <CardContent>
              <Grid container direction="row" justifyContent="space-between">
                <Grid item xs="auto" container alignItems="center" spacing={1}>
                  <Grid item>
                    <Box color="text.secondary">
                      <AccessTimeOutlinedIcon fontSize="small" color="inherit"/>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2" component="div" color="text.secondary">
                      {getFormattedDate(order.dataInizio)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Typography gutterBottom variant="h5" component="div">
                {order.codiceCommessa}
              </Typography>
              {order.statoCommessa !== 0
                ? <Chip
                  size="small"
                  label={getLabel(order)}
                />
                : <Chip
                  size="small"
                  sx={{
                    color: theme.palette.secondary.main,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                  }}
                  color={'secondary'}
                  label={getLabel(order)}
                />}
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </>
  )
}

export default CompanyCard;