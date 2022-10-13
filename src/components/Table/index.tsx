import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";

import { CreateDespesaMutation } from "./mutations/CreateDespesaMutation";
import { DeleteDespesaMutation } from "./mutations/DeleteDespesaMutation";
import { UpdateDespesaMutation } from "./mutations/UpdateDespesaMutation";

import AddDespesaInput from "../AddDespesaInput";

import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowsProp,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import { Button, TextField } from "@mui/material";

import dayjs from "dayjs";

import style from "./table.module.scss";

import { useFragment, useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { IDespesa } from "../../types/Despesa";
import EditDespesaInput from "../EditDespesaInput";
import SnackbarAlert from "../SnackbarAlert";

export default function DataTable(props: any) {
  const [todayDate, setTodayDate] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const [openAddDespesa, setOpenAddDespesa] = useState(false);
  const [openEditDespesa, setOpenEditDespesa] = useState(false);
  const [despesaEditData, setDespesaEditData] = useState({});

  const post = useFragment(
    graphql`
      fragment Table_table on Despesa @relay(plural: true) {
        id
        name
        releaseDate
        category
        value
      }
    `,
    props.data,
  );

  //Mutations
  const [createDespesaMutation] = useMutation(CreateDespesaMutation);
  const [deleteDespesaMutation] = useMutation(DeleteDespesaMutation);
  const [updateDespesaMutation] = useMutation(UpdateDespesaMutation);

  // Setting initial and final date of month
  useEffect(() => {
    const todayDate = dayjs().format("YYYY-MM-DDTHH:mm");

    const initialDateFormated = dayjs(todayDate)
      .startOf("month")
      .format("YYYY-MM-DD");

    const finalDateFormated = dayjs(todayDate)
      .endOf("month")
      .format("YYYY-MM-DD");

    setTodayDate(todayDate);
    setInitialDate(initialDateFormated);
    setFinalDate(finalDateFormated);
  }, []);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleOpenAlert = (alertType: string, alertText: string) => {
    setAlertText(alertText);
    setAlertType(alertType);
    setOpenAlert(true);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  //   Date Functions
  const handleChangeInitialDate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInitialDate(event.target.value);
  };

  const handleChangeFinalDate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFinalDate(event.target.value);
  };

  //   Actions Functions
  const handleAddDespesa = (despesa: IDespesa) => {
    createDespesaMutation({
      variables: {
        name: despesa.despesaName,
        category: despesa.category,
        value: despesa.value,
        releaseDate: dayjs(despesa.releaseDate).toISOString(),
      },
      onCompleted() {
        handleOpenAlert("success", "Despesa adicionada com sucesso!");
      },
      onError() {
        handleOpenAlert("error", "Algo deu errado!");
      },
    });
  };

  const handleEditClick = (despesa: any) => {
    console.log(despesa);
    updateDespesaMutation({
      variables: {
        id: despesa.despesaID,
        name: despesa.despesaName,
        category: despesa.category,
        value: despesa.value,
        releaseDate: dayjs(despesa.releaseDate).toISOString(),
      },
      onCompleted() {
        handleOpenAlert("success", "Despesa atualizada com sucesso!");
      },
      onError() {
        handleOpenAlert("error", "Algo deu errado!");
      },
    });
  };

  const handleDeleteClick = (id: GridRowId) => {
    deleteDespesaMutation({
      variables: { id: id },
      onCompleted() {
        handleOpenAlert("success", "Despesa excluida com sucesso!");
      },
      onError() {
        handleOpenAlert("error", "Algo deu errado!");
      },
    });
  };

  // Columns Data
  const columns: GridColumns = [
    { field: "despesaName", headerName: "Nome da Despesa", flex: 1 },
    { field: "category", headerName: "Categoria da Despesa", flex: 1 },
    {
      field: "releaseData",
      headerName: "Data",
      type: "dateTime",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        return dayjs(params.value).format("DD/MM/YYYY - HH:mm");
      },
    },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        return `R$ ${params.value.toFixed(2)}`;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      flex: 0.5,
      cellClassName: "actions",
      getActions: (params: any) => {
        return [
          <GridActionsCellItem
            icon={<MdEdit size={25} />}
            label="Editar"
            className="textPrimary"
            onClick={() => {
              setOpenEditDespesa(true);
              setDespesaEditData(params.row);
            }}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<MdDelete size={25} />}
            label="Editar"
            className="textPrimary"
            onClick={(params: any) => handleDeleteClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows: GridRowsProp = post.map((item: any) => ({
    id: item.id,
    despesaName: item.name,
    category: item.category,
    releaseData: item.releaseDate,
    value: item.value,
  }));

  return (
    <>
      <div className={style.tableContainer}>
        <div className={style.tableBox}>
          <div className={style.tableActions}>
            {/* ADD Despesa */}
            <Button
              variant="text"
              onClick={() => setOpenAddDespesa(true)}
              startIcon={<AiOutlinePlus />}
            >
              Adicionar despesa
            </Button>

            <AddDespesaInput
              addDespesa={handleAddDespesa}
              setOpenAddDespesa={() => setOpenAddDespesa(false)}
              open={openAddDespesa}
              todayDate={todayDate}
            />

            <EditDespesaInput
              editDespesa={handleEditClick}
              setOpenEditDespesa={() => setOpenEditDespesa(false)}
              open={openEditDespesa}
              despesaEditData={despesaEditData}
            />

            {/* Datas */}
            <div className={style.tableDateActions}>
              <TextField
                id="outlined"
                type="date"
                size="small"
                value={initialDate}
                onChange={handleChangeInitialDate}
              />
              a
              <TextField
                id="outlined"
                type="date"
                size="small"
                value={finalDate}
                onChange={handleChangeFinalDate}
              />
            </div>
          </div>

          {/* DataGrid */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              "& .MuiDataGrid-footerContainer": { backgroundColor: "white" },
            }}
          />
        </div>
      </div>

      {/* Alerts */}
      <SnackbarAlert
        open={openAlert}
        handleAlert={handleCloseAlert}
        alertText={alertText}
        alertType={alertType}
      />
    </>
  );
}
