import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";

import AddDespesaInput from "../AddDespesaInput";

import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowsProp,
} from "@mui/x-data-grid";

import { Button, TextField } from "@mui/material";

import dayjs from "dayjs";

import style from "./table.module.scss";

import { useFragment, useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

export default function DataTable(props: any) {
  const [todayDate, setTodayDate] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const [openAddDespesa, setOpenAddDespesa] = useState(false);

  const post = useFragment(
    graphql`
      fragment Table_table on Despesa @relay(plural: true) {
        id
        name
        createdAt
        category
        value
      }
    `,
    props.data,
  );
  const [commitMutation, isMutationInFlight] = useMutation(graphql`
    mutation TableMutation(
      $name: String!
      $createdAt: String!
      $category: String!
      $value: Float!
    ) {
      createDespesa(
        name: $name
        createdAt: $createdAt
        category: $category
        value: $value
      ) {
        name
      }
    }
  `);

  // Setting initial and final date of month
  useEffect(() => {
    const todayDate = dayjs().format("YYYY-MM-DD");

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
  const handleAddDespesa = (
    despesaName: String,
    category: String,
    value: number,
    date: Date,
  ) => {
    commitMutation({
      variables: {
        name: despesaName,
        category: category,
        value: value,
        createdAt: date,
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  const handleEditClick = (id: GridRowId) => () => {};

  const handleDeleteClick = (id: GridRowId) => () => {};

  // Columns Data
  const columns: GridColumns = [
    { field: "despesaNome", headerName: "Nome da Despesa", flex: 1 },
    { field: "categoria", headerName: "Categoria da Despesa", flex: 1 },
    { field: "data", headerName: "Data", flex: 1 },
    { field: "valor", headerName: "Valor", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      flex: 0.5,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<MdEdit size={25} />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<MdDelete size={25} />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows: GridRowsProp = post.map((item: any) => ({
    id: item.id,
    despesaNome: item.name,
    categoria: item.category,
    data: dayjs(item.createdAt).format("DD/MM/YYYY"),
    valor: item.value,
  }));

  return (
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
            disable={isMutationInFlight}
            todayDate={todayDate}
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
  );
}
