// @ts-ignore
import React, {FC, useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {
  alpha,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  DialogActions,
  Fab,
  Fade,
  Grid,
  Grow,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {useTheme} from "@mui/material/styles";
import PageTitle from "../PageTitle/PageTitle";
import SyncButton from "../SyncButton/SyncButton";
import DetailsLoading from "../DetailsLoading/DetailsLoading";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DeleteDialog, {useDeleteDialogContext} from "../Providers/DeleteDialog/DeleteDialog";

interface modifyConfig {
  edit: boolean;
  delete: boolean;
}

type PageParamsType = {
  pagePath: string;
  id: string;
};

interface DetailsPageProps {
  icon?: React.ReactNode,
  title: string,
  updatedTime: string,
  loading: boolean,
  onRefresh: () => void,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
  onDelete?: () => void,
  onEditMode?: () => void,
  editChildren?: React.ReactNode,
  baseChildren: React.ReactNode,
  chips?: React.ReactNode,
  noEditElement?: React.ReactNode,
  allowModify?: modifyConfig,
  breadcrumbs?: JSX.Element[],
  baseChildrenLoadingRows?: number,
  baseChildrenLoadingColumns?: number,
  children?: React.ReactNode,
}

const DetailsPage: FC<DetailsPageProps> = (
  {
    icon,
    title,
    updatedTime,
    loading,
    onRefresh,
    onSubmit,
    allowModify,
    noEditElement,
    onDelete,
    breadcrumbs,
    chips,
    onEditMode,
    editChildren,
    baseChildren,
    children,
    baseChildrenLoadingRows,
    baseChildrenLoadingColumns,
  }
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [editMode, setEditMode] = useState(false);
  const {pagePath} = useParams<PageParamsType>();
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);
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
      key="3" color="text.primary"
    >
      {loading
        ? <Skeleton animation="wave" width="30px"/>
        : title?.charAt(0).toUpperCase() + title?.slice(1)
      }
    </Typography>,
  ];

  const handleEditMode = () => {
    setEditMode(!editMode);
    if (onEditMode && !editMode) onEditMode();
  }

  return (
    <Box
      component="form"
      noValidate
      id="editForm"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        onSubmit(event);
        setEditMode(false);
      }}
    >
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
            <PageTitle title={title} icon={!isMobile && icon} loading={loading}>
              {!isMobile
                ? !editMode && <Grow in key={2}>
                <Stack direction="row" spacing={1}>
                  {allowModify.edit && <Tooltip title="Edit" arrow TransitionComponent={Zoom}>
                    <IconButton
                      id="3"
                      color="primary"
                      children={<ModeEditOutlineOutlinedIcon/>}
                      onClick={handleEditMode}
                    />
                  </Tooltip>}
                  {allowModify.delete && <Tooltip title="Delete" arrow TransitionComponent={Zoom}>
                    <IconButton
                      id="4"
                      onClick={() => setOpenDeleteDialog(true)}
                      children={<DeleteIcon/>}
                    />
                  </Tooltip>}
                </Stack>
              </Grow>
                : !loading && !allowModify && noEditElement
                /*<Grow in key={1}>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Salva modifiche" arrow TransitionComponent={Zoom}>
                    <IconButton
                      color="primary"
                      id="1"
                      form="editForm"
                      children={<SaveOutlinedIcon/>}
                      type="submit"
                    />
                  </Tooltip>
                  <Tooltip title="Annulla modifiche" arrow TransitionComponent={Zoom}>
                    <IconButton
                      id="2"
                      children={<CloseIcon/>}
                      onClick={() => setEditMode(false)}
                    />
                  </Tooltip>
                </Stack>
              </Grow>*/}
            </PageTitle>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <SyncButton updatedTime={updatedTime} onClick={onRefresh}/>
            </Grid>
            <Grid item>
              {!loading && chips}
            </Grid>
          </Grid>
          <Grid item mt={3}>
            {loading
              ? <Card variant="outlined">
                <DetailsLoading rows={baseChildrenLoadingRows} columns={baseChildrenLoadingColumns}/>
              </Card>
              : editMode
                ? <Fade in key={1}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box py={2}>
                        {editChildren}
                      </Box>
                      <DialogActions>
                        <Button color="inherit"
                                onClick={() => setEditMode(false)}
                        >
                          <Box mx={2}>annulla</Box>
                        </Button>
                        <Button
                          color="primary"
                          id="1"
                          form="editForm"
                          type="submit"
                          sx={{
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            "&:hover": {
                              backgroundColor: alpha(theme.palette.primary.main, 0.25),
                            },
                          }}>
                          <Box mx={2}>
                            salva
                          </Box>
                        </Button>
                      </DialogActions>
                    </CardContent>
                  </Card>
                </Fade>
                : <Fade in key={2}>
                  <div>
                    <Card variant="outlined">
                      <CardContent>
                        {baseChildren}
                      </CardContent>
                    </Card>
                    <Box pt={2}>
                      {children}
                    </Box>
                  </div>
                </Fade>
            }
          </Grid>
        </Grid>
        <DeleteDialog handleDelete={onDelete} title={title}/>
      </Container>
      <Zoom in={!loading && isMobile && allowModify && !editMode} style={{transitionDelay: '200ms'}}>
        <Fab
          sx={{
            margin: 0,
            top: 'auto',
            right: 16,
            bottom: 16,
            left: 'auto',
            position: 'fixed',
          }}
          onClick={handleEditMode}
        >
          <ModeEditOutlineOutlinedIcon/>
        </Fab>
      </Zoom>
    </Box>
  );
}

export default DetailsPage;

