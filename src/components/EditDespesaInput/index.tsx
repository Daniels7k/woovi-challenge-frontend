import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, InputAdornment } from "@mui/material";
import dayjs from "dayjs";

export default function EditDespesaInput(props: any) {
  const [despesaName, setDespesaName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [despesaID, setDespesaID] = useState("");

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  useEffect(() => {
    const { despesaName, category, releaseDate, id, value } =
      props.despesaEditData;

    const formatedData = dayjs(releaseDate).format("YYYY-MM-DD HH:mm");

    setDespesaName(despesaName);
    setCategory(category);
    setReleaseDate(formatedData);
    setValue(value);
    setDespesaID(id);
  }, [props.despesaEditData]);

  const verifyInputs = () => {
    if (despesaName === "") {
      setAlert({ type: "error", message: "O nome é obrigatório!" });
    } else if (category === "") {
      setAlert({ type: "error", message: "A categoria é obrigatória" });
    } else if (value === null) {
      setAlert({ type: "error", message: "O valor é obrigatório!" });
    } else if (releaseDate === "") {
      setAlert({ type: "error", message: "A data é obrigatória!" });
    } else {
      const numberValue = parseInt(value);
      props.editDespesa({
        despesaName,
        category,
        value: numberValue,
        releaseDate,
        despesaID,
      });
      handleCloseDespesa();
    }
  };

  const handleCloseDespesa = () => {
    props.setOpenEditDespesa();
    setDespesaName("");
    setCategory("");
    setValue("");
    setReleaseDate("");
    setAlert({ type: "", message: "" });
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleCloseDespesa}>
        <DialogTitle>Editar Despesa</DialogTitle>
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
            onChange={event => setValue(event.target.value)}
          />

          <TextField
            required
            margin="dense"
            id="data"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={releaseDate}
            onChange={event => setReleaseDate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDespesa()}>Cancelar</Button>
          <Button onClick={() => verifyInputs()}>Editar Despesa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
