import {alpha, Badge, Card, CardActionArea, CircularProgress, Grid, Skeleton, Stack, Typography} from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import React, {FC} from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {styled} from '@mui/system';
import {Document} from "../../../services/documents.services";
const SelectedBadge = styled(Badge)`
  & .MuiBadge-badge {
    padding: 0;
    color: #fff;
  }
`;

type FileCardProps = {
  onClick?: () => void,
  selected?: boolean,
  disabled?: boolean,
  title?: string,
  file?: Document,
  uploadingMode?: boolean,
  loadingMode?: boolean,
}

const FileCard: FC<FileCardProps> = (
  {
    onClick,
    disabled,
    selected,
    loadingMode,
    uploadingMode,
    title,
    file
  }
) => {

  const getTitle = () => {

  }

  return (
    <>
      {loadingMode
        ? <Skeleton variant="rectangular" animation="wave" sx={{borderRadius: '8px'}}>
          <Card
            sx={{
              height: '70px',
              width: '60px',
              borderRadius: '8px',
            }}
          />
        </Skeleton>
        : <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <SelectedBadge
              sx={{
                top: '2px',
                right: '2px',
                p: 0,
                '& .MuiBadge-badge': {
                  bgcolor: 'background.paper'
                }
              }}
              badgeContent={
                selected
                  ? <CheckCircleIcon
                    color="primary"
                    fontSize="small"
                  />
                  : null
              }
            >
              <Card
                variant="outlined"
                sx={{
                  height: '70px',
                  width: '60px',
                  borderRadius: '8px',
                  bgcolor: selected ? (theme) => alpha(theme.palette.primary.main, 0.1) : "background.paper",
                  borderColor: selected ? 'primary.main' : "",
                }}
              >
                <CardActionArea onClick={onClick} sx={{height: '100%', width: '100%'}}
                                disabled={disabled || uploadingMode}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                  >
                    {uploadingMode
                      ? <CircularProgress size={24}/>
                      : <InsertDriveFileOutlinedIcon fontSize="large" color="primary"/>
                    }
                  </Stack>
                </CardActionArea>
              </Card>
            </SelectedBadge>
          </Grid>
          <Grid item>
            <Typography variant="caption" color={selected ? "primary" : "default"}>
              {Boolean(title)
                ? title.length < 10 ? title : title.substring(0, 7) + '...'
                : file?.name.length < 10 ? file?.name : file?.name.substring(0, 7) + '...'
              }
            </Typography>
          </Grid>
        </Grid>
      }
    </>
  );
}

export default FileCard;