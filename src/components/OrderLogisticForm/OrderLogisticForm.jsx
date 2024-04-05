import { NumericFormat } from "react-number-format";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/uk";
import dayjs from "dayjs";

import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./OrderLogisticForm.module.css";
import React, { useEffect, useState } from "react";

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

const OrderLogisticForm = ({ initLogistic, onChange }) => {
  const [logisticType, setLogisticType] = useState(initLogistic.logisticType);
  const [invoiceNumber, setInvoiceNumber] = useState(
    initLogistic.invoiceNumber
  );
  const [invoicePrice, setInvoicePrice] = useState(initLogistic.invoicePrice);
  const [comment, setСomment] = useState(initLogistic.comment);
  const [date, setDate] = useState(
    dayjs(initLogistic.date).format("MM.DD.YYYY")
  );

  useEffect(() => {
    onChange({
      logisticType,
      invoiceNumber,
      invoicePrice,
      comment,
      date,
    });
  }, [comment, date, invoiceNumber, invoicePrice, logisticType, onChange]);

  const handleChangeLogisticType = (event) => {
    setInvoiceNumber("");
    setInvoicePrice("");
    setСomment("");
    setDate(dayjs(initLogistic.date).format("MM.DD.YYYY"));

    console.log(event.target.value);

    setLogisticType(event.target.value);
  };

  const handleInput = (event) => {
    if (event.target.name === "invoiceNumber") {
      setInvoiceNumber(event.target.value);
    }
    if (event.target.name === "invoicePrice") {
      setInvoicePrice(event.target.value);
    }
    if (event.target.name === "comment") {
      setСomment(event.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <RadioGroup
        className={styles.radioGroup}
        row
        value={logisticType}
        onChange={handleChangeLogisticType}
      >
        <FormControlLabel
          value="post"
          control={<Radio size="small" />}
          label={
            <Typography className={styles.formControlLabel}>Пошта</Typography>
          }
        />
        <FormControlLabel
          value="remote"
          control={<Radio size="small" />}
          label={
            <Typography className={styles.formControlLabel}>
              Віддалено
            </Typography>
          }
        />
        <FormControlLabel
          value="meet"
          control={<Radio size="small" />}
          label={
            <Typography className={styles.formControlLabel}>Зустріч</Typography>
          }
        />
      </RadioGroup>
      {logisticType === "post" && (
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
            onChange={handleInput}
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
            onChange={handleInput}
            value={invoicePrice}
            size="small"
            InputProps={{
              inputComponent: InvoicePriceInputCustom,
            }}
          />
        </div>
      )}
      <div className={styles.dateBox}>
        <TextField
          className={styles.comment}
          name="comment"
          label="Коментар"
          autoComplete="off"
          onChange={handleInput}
          value={comment}
          size="small"
          multiline
          maxRows={4}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
          <DatePicker
            label="Дата"
            slotProps={{ textField: { size: "small" } }}
            className={styles.date}
            autoComplete="off"
            onChange={(newValue) =>
              setDate(dayjs(newValue).format("MM.DD.YYYY"))
            }
            value={dayjs(date)}
            size="small"
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default OrderLogisticForm;
