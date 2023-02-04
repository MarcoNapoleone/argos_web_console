import React, {useContext, useEffect, useState} from "react";
import {IconButton, useMediaQuery} from "@mui/material";
import {useAddDialogContext} from "../../../Components/Providers/AddDialog/AddDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteDialog, {useDeleteDialogContext} from "../../../Components/Providers/DeleteDialog/DeleteDialog";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import DetailsPage from "../../../Components/DetailsPage/DetailsPage";

const TimetablesDetailsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const {setOpenAddDialog} = useContext(useAddDialogContext);
  const {setOpenDeleteDialog} = useContext(useDeleteDialogContext);

  useEffect(() => {

  }, []);

  const RenderMoreButton = (e: any) => {
    const handleMoreClick = () => {
      navigate(`/app/navi/${e.row.shipId}`);
    };
    return (
      <IconButton
        onClick={handleMoreClick}
        size="small"
      >
        <OpenInNewOutlinedIcon/>
      </IconButton>
    );
  }

  const RenderDeleteButton = (e: any) => {
    const handleDeleteClick = async () => {
      setLoading(true);

    };
    return (
      <>
        <IconButton
          onClick={() => setOpenDeleteDialog(true)}
          size="small"
        >
          <DeleteIcon/>
        </IconButton>
        <DeleteDialog handleDelete={handleDeleteClick} title={'gg'}/>
      </>
    );
  }

  const handleDoubleClick = (e: any) => {
    navigate(`/app/navi/${e.row.shipId}`);
  }

  const handleRefresh = () => {
    setLoading(true)

  }

  return (
    <DetailsPage
      title={'Local Units'}
      loading={loading}
      updatedTime={updatedTime}
      onRefresh={handleRefresh}
      baseChildren={<></>}
      editChildren={<></>}
    ></DetailsPage>
  );
}

export default TimetablesDetailsPage;