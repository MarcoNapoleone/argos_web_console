import React, {FC, useState} from "react";
import {
  Box,
  Card,
  Collapse,
  Grid,
  Grow,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  Zoom
} from "@mui/material";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import PhotoSizeSelectLargeOutlinedIcon from '@mui/icons-material/PhotoSizeSelectLargeOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from "@mui/icons-material/Add";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {createDocument, Document} from "../../../services/documents.services";
import FileCard from "../FileCard/FileCard";
import FileRow from "../FileRow/FileRow";
import {styled} from "@mui/material/styles";
import EmptyGridContent from "../../NoContentIcon/EmptyGridContent";
import {useParams} from "react-router-dom";
import {Id} from "../../../entities/entities";

type SortType = 'name' | 'date' | 'size';
type ViewType = 'row' | 'grid';

type PageParamsType = {
  companyId: string;
}

const Input = styled('input')({
  display: 'none',
});


type FileContainerProps = {
  files?: Document[]
  setFiles?: (files: any) => void
  loading?: boolean,
  refId?: Id,
  moduleName?: string,
}
const FileContainer: FC<FileContainerProps> = (
  {
    files,
    setFiles,
    loading,
    refId,
    moduleName
  }
) => {

  const [view, setView] = React.useState<ViewType>('grid');
  const [sort, setSort] = React.useState<SortType>('name');
  const {companyId} = useParams<PageParamsType>();
  const [selectedFiles, setSelectedFiles] = useState<Number[]>([])
  const [fileToUpload, setFileToUpload] = useState([]);
  const [renderedFiles, setRenderedFiles] = useState(files);

  const handleUploadFile = (event: any) => {
    setFileToUpload([...event.target.files])
    createDocument(companyId, refId, moduleName, event.target.files[0])
      .then((res) => {
        setFiles([...files, res]);
      })
  };

  const handleView = (event: any, newView: any) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleSort = (event: any, newSort: any) => {
    if (newSort !== null) {
      for (let i = renderedFiles?.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = files[i];
        files[i] = files[j];
        files[j] = temp;
      }
      setRenderedFiles(files)
      setSort(newSort);
    }
  };

  const handleSelection = (id: number) => {
    if (selectedFiles.some(el => el === id)) {
      setSelectedFiles(selectedFiles.filter(el => el !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{height: '100%',}}
    >
      <Box p={2}>
        <Grid container direction="column" spacing={2}>
          {loading
            ? <Grid item>
              <Skeleton variant="rectangular" animation="wave" sx={{borderRadius: '8px'}}>
                <Box sx={{height: '32px', width: '212px'}}/>
              </Skeleton>
            </Grid>
            : <Grid item container spacing={2}>
              <Grid item>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" onChange={handleUploadFile} multiple type="file"/>
                  <ToggleButton component="span" value="" size="small" color="primary">
                    <Tooltip title="Carica" TransitionComponent={Zoom} arrow>
                      <AddIcon color="primary"/>
                    </Tooltip>
                  </ToggleButton>
                </label>
              </Grid>
              <Grid item>
                <ToggleButtonGroup
                  value={view}
                  color="primary"
                  size="small"
                  exclusive
                  onChange={handleView}
                >
                  <ToggleButton value="grid">
                    <Tooltip title="Vista griglia" TransitionComponent={Zoom} arrow>
                      <GridViewOutlinedIcon/>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="row">
                    <Tooltip title="Vista lista" TransitionComponent={Zoom} arrow>
                      <ViewListOutlinedIcon/>
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item>
                <ToggleButtonGroup
                  value={sort}
                  color="primary"
                  size="small"
                  exclusive
                  onChange={handleSort}
                >
                  <ToggleButton value="name">
                    <Tooltip title="Ordina per nome" TransitionComponent={Zoom} arrow>
                      <SortByAlphaOutlinedIcon/>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="date">
                    <Tooltip title="Ordina per data" TransitionComponent={Zoom} arrow>
                      <DateRangeOutlinedIcon/>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="size">
                    <Tooltip title="Ordina per dimensione" TransitionComponent={Zoom} arrow>
                      <PhotoSizeSelectLargeOutlinedIcon/>
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item>
                <Collapse orientation="horizontal" in={selectedFiles?.length >= 1}>
                  <ToggleButtonGroup
                    color="primary"
                    size="small"
                  >
                    <ToggleButton value="download">
                      <Tooltip title="Download" TransitionComponent={Zoom} arrow>
                        <FileDownloadOutlinedIcon/>
                      </Tooltip>
                    </ToggleButton>
                    {selectedFiles?.length === 1
                      ? <ToggleButton value="rename">
                        <Tooltip title="Rinomina" TransitionComponent={Zoom} arrow>
                          <DriveFileRenameOutlineOutlinedIcon/>
                        </Tooltip>
                      </ToggleButton>
                      : null}
                    {selectedFiles?.length === 1
                      ? <ToggleButton value="info">
                        <Tooltip title="Details" TransitionComponent={Zoom} arrow>
                          <InfoOutlinedIcon/>
                        </Tooltip>
                      </ToggleButton>
                      : null}
                    <ToggleButton value="delete">
                      <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
                        <DeleteForeverOutlinedIcon/>
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Collapse>
              </Grid>
            </Grid>
          }
          <Grid item container xs={12} spacing={view === 'grid' ? 2 : 1}>
            {loading
              ? [...Array(5)].map(() => (<Grid item><FileCard loadingMode/></Grid>))
              : renderedFiles?.length
                ? view === 'grid'
                  ? <>
                    {fileToUpload.map((file, index) => (
                      <Grow in style={{transitionDelay: `${index * 50}ms`}}>
                        <Grid item>
                          <FileCard title={file?.name} uploadingMode/>
                        </Grid>
                      </Grow>
                    ))}
                    {renderedFiles.map((file, index) => (
                      <Grow in style={{transitionDelay: `${index * 50}ms`}}>
                        <Grid item>
                          <FileCard
                            title={file?.name}
                            file={file}
                            selected={selectedFiles.some(el => el === index)}
                            onClick={() => handleSelection(index)}
                          />
                        </Grid>
                      </Grow>
                    ))}
                  </>
                  : <>
                    {files.map((file, index) => (
                      <Grow in style={{transitionDelay: `${index * 50}ms`}}>
                        <Grid item xs={12}>
                          <FileRow
                            title={file?.name}
                            file={file}
                            selected={selectedFiles.some(el => el === index)}
                            onClick={() => handleSelection(index)}
                          />
                        </Grid>
                      </Grow>
                    ))}
                  </>
                : <Stack
                  p={2}
                  sx={{
                    width: '100%',
                  }}
                  justifyContent="center"
                  alignItems="center">
                  <EmptyGridContent/>
                </Stack>
            }
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Selected documents: {selectedFiles.length}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default FileContainer;