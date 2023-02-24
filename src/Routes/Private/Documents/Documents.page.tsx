import React, {useContext, useEffect, useState} from "react";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {IconButton, useMediaQuery} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import MainPage from "../../../Components/MainPage/MainPage";
import {GridColumns} from "@mui/x-data-grid";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteDialog from "../../../Components/DeleteDialog/DeleteDialog";

import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {getReasonAlert} from "../../../utils/requestAlertHandler";
import {useCurrentCompany} from "../../../Components/Providers/Company/Company.provider";
import {Document, getAllDocuments} from "../../../services/documents.services";
import FileContainer from "../../../Components/files/FileContainer/FileContainer";


type PageParamsType = {
  companyId: string;
};

const DocumentsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const {companyId} = useParams<PageParamsType>();
  const {company} = useCurrentCompany();
  const [loading, setLoading] = useState(true);
  const [updatedTime, setUpdatedTime] = useState("00:00");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);  const {setAlertEvent} = useContext(useAlertContext);
  const [documents, setDocuments] = useState<Document[]>([
    {
      "id": 1,
      "name": "file1.jpg",
      "description": "file 1",
      "refId": 0,
      "moduleId": "string",
      "fileType": "string",
      "path": "string",
    },
    {
      "id": 2,
      "name": "Scadenze_maggio23.pdf",
      "description": "Un pdf",
      "refId": 0,
      "moduleId": "string",
      "fileType": "string",
      "path": "string",
    },
    {
      "id": 3,
      "name": "file3.jpg",
      "description": "A photo",
      "refId": 0,
      "moduleId": "string",
      "fileType": "string",
      "path": "string",
    },
  ])

  const fetchData = async () => {
    const res = await getAllDocuments(companyId)
    setDocuments(res);
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }, []);

  const RenderMoreButton = (e: any) => {
    const handleMoreClick = () => {
      navigate(`/app/companies/${e.row.companyId}/local-units/${e.row.id}`);
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
        <DeleteDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          handleDelete={handleDeleteClick}
          title="Department"
        />
      </>
    );
  }

  const handleDoubleClick = (e: any) => {
    navigate(`/app/companies/${e.row.companyId}/local-units/${e.row.id}`);
  }

  const rows = documents.map((document) => {
    return {
      id: document.id,
      name: document.name,
      description: document.description,
      refId: document.refId,
      moduleId: document.moduleId,
      fileType: document.fileType,
      path: document.path
    }
  })
  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 90,
      align: 'center',
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Nome',
      minWidth: 150,
      editable: false,
      flex: 1,
    },
    {
      field: 'more',
      headerName: 'More',
      description: 'Details',
      align: 'center',
      renderCell: RenderMoreButton,
      width: 90,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    },
    {
      field: 'edit',
      headerName: 'Edit',
      description: 'Edit, Delete',
      align: 'center',
      renderCell: RenderDeleteButton,
      width: 110,
      editable: false,
      sortable: false,
      headerAlign: 'center',
    }
  ];

  const handleRefresh = () => {
    setLoading(true)
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  }

  return (
    <MainPage
      title="Documents"
      //icon={<DescriptionOutlinedIcon fontSize="large"/>}
      onRefresh={handleRefresh}
      updatedTime={updatedTime}>
      <FileContainer files={documents} setFiles={setDocuments} loading={loading}/>

    </MainPage>
  );
}

export default DocumentsPage;