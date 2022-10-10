import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import AddDespesaInput from "../AddDespesaInput";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";

import dayjs from "dayjs";

import style from "./table.module.scss";

const columns: GridColDef[] = [
  { field: "despesaNome", headerName: "Nome da Despesa", flex: 1 },
  { field: "categoria", headerName: "Categoria da Despesa", flex: 1 },
  { field: "data", headerName: "Data", flex: 1 },
  { field: "valor", headerName: "Valor", flex: 1 },
];

const rows = [
  {
    id: 1,
    despesaNome: "Compras no Mix",
    categoria: "Compras",
    data: "10/10/2022",
    valor: "R$ 1500,00",
  },
];

export default function DataTable() {
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const [openAddDespesa, setOpenAddDespesa] = useState(false);

  useEffect(() => {
    const todayDate = dayjs().format("DD/MM/YYYY");
    const initialDateFormated = dayjs(todayDate)
      .startOf("month")
      .format("YYYY-MM-DD");
    const finalDateFormated = dayjs(todayDate)
      .endOf("month")
      .format("YYYY-MM-DD");

    setInitialDate(initialDateFormated);
    setFinalDate(finalDateFormated);
  }, []);

  //   AddDespesa Functions
  const handleAddDespesa = (despesaName: String) => {
    console.log(despesaName);
    console.log("hey");
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
