import { TextField } from "@mui/material";

import { NumericFormat } from "react-number-format";

import styles from "./PostTypeForm.module.css";
import React from "react";

const InvoicePriceInputCustom = React.forwardRef(
  function InvoicePriceInputCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        suffix=" грн"
        allowNegative={false}
      />
    );
  }
);

const InvoiceNumberInputCustom = React.forwardRef(
  function InvoiceNumberInputCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
        allowNegative={false}
      />
    );
  }
);

const PostTypeForm = ({ invoiceNumber, onChange, invoicePrice }) => {
  return (
    <div className={styles.invoiceBox}>
      <TextField
        className={`${styles.invoiceNumber} ${
          (invoiceNumber.length !== 14) & (invoiceNumber.length > 0)
            ? styles.invoicePriceWarning
            : ""
        }`}
        name="invoiceNumber"
        label="ТТН"
        autoComplete="off"
        onChange={onChange}
        value={invoiceNumber}
        size="small"
        InputProps={{
          inputComponent: InvoiceNumberInputCustom,
        }}
      />
      <TextField
        className={styles.invoicePrice}
        name="invoicePrice"
        label="Вартість"
        autoComplete="off"
        onChange={onChange}
        value={invoicePrice}
        size="small"
        InputProps={{
          inputComponent: InvoicePriceInputCustom,
        }}
      />
    </div>
  );
};

export default PostTypeForm;
