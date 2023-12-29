import React, { Dispatch, FC, useState } from "react";
import TextField from "@mui/material/TextField";

interface PropsDecimalInputField {
  label: string;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

const DecimalInputField: FC<PropsDecimalInputField> = ({
  label,
  value,
  setValue,
}) => {
  const handleDecimalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d+(\.\d{0,1})?$/;
    const inputValue: string = event.target.value;

    if (regex.test(inputValue) || inputValue === "") {
      setValue(inputValue);
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={handleDecimalChange}
      fullWidth
    />
  );
};

export default DecimalInputField;
