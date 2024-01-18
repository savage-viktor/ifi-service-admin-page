import { TextField } from "@mui/material";
import { useState } from "react";

function FindInput({ onChange }) {
  const [input, setInput] = useState("");

  function handleInput(event) {
    setInput(event.target.value);
    onChange(event.target.value.toLowerCase());
  }

  return (
    <TextField
      id="outlined-basic"
      label="Пошук моделі"
      variant="outlined"
      onChange={handleInput}
      value={input}
      type="text"
      size="small"
      sx={{ width: 400 }}
    />
  );
}

export default FindInput;
