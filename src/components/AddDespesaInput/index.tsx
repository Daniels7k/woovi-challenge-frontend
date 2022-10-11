import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, InputAdornment } from "@mui/material";

export default function AddDespesaInput(props: any) {
  const [despesaName, setDespesaName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState<number>();
  const [date, setDate] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    setDate(props.todayDate);
  }, [props.todayDate]);

  const verifyInputs = () => {
    if (despesaName === "") {
      setAlert({ type: "error", message: "O nome é obrigatório!" });
    } else if (category === "") {
      setAlert({ type: "error", message: "A categoria é obrigatória" });
    } else if (value === null) {
      setAlert({ type: "error", message: "O valor é obrigatório!" });
    } else if (date === "") {
      setAlert({ type: "error", message: "A data é obrigatória!" });
    } else {
      props.addDespesa(despesaName, category, value, date);
      handleCloseDespesa();
    }
  };

  const handleCloseDespesa = () => {
    props.setOpenAddDespesa();
    setDespesaName("");
    setCategory("");
    setValue(undefined);
    setDate(props.todayDate);
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            value={value}
            onChange={event => setValue(parseInt(event.target.value))}
          />

          <TextField
            required
            margin="dense"
            id="data"
            type="datetime-local"
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
