import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";

export default function AddDespesaInput(props: any) {
  const [despesaName, setDespesaName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const verifyInputs = () => {
    if (despesaName === "") {
      setAlert({ type: "error", message: "O nome é obrigatório!" });
    } else if (category === "") {
      setAlert({ type: "error", message: "A categoria é obrigatória" });
    } else if (value === "") {
      setAlert({ type: "error", message: "O valor é obrigatório!" });
    } else if (date === "") {
      setAlert({ type: "error", message: "A data é obrigatória!" });
    } else {
      props.addDespesa(despesaName);
      handleCloseDespesa();
    }
  };

  const handleCloseDespesa = () => {
    props.setOpenAddDespesa();
    setDespesaName("");
    setCategory("");
    setValue("");
    setDate("");
    setAlert({ type: "", message: "" });
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleCloseDespesa}>
        <DialogTitle>Adicionar Despesa</DialogTitle>
        <DialogContent>
          <div>
            {alert.type === "error" ? (
              <Alert severity="error">{alert.message}</Alert>
            ) : (
              ""
            )}
          </div>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Nome da despesa"
            type="text"
            fullWidth
            variant="standard"
            value={despesaName}
            onChange={event => setDespesaName(event.target.value)}
          />

          <TextField
            required
            margin="dense"
            id="categoria"
            label="Categoria da despesa"
            type="text"
            fullWidth
            variant="standard"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <TextField
            required
            margin="dense"
            label="Valor"
            type="number"
            id="value"
            fullWidth
            variant="standard"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <TextField
            required
            margin="dense"
            id="data"
            type="date"
            fullWidth
            variant="standard"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDespesa()}>Cancelar</Button>
          <Button onClick={() => verifyInputs()}>Adicionar Despesa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
