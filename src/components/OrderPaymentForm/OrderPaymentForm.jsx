import { Autocomplete, Button, TextField } from "@mui/material";
import styles from "./OrderPaymentForm.module.css";
import React, { useEffect, useState } from "react";

import { NumericFormat } from "react-number-format";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/uk";
import dayjs from "dayjs";
import OrderPaymentList from "../OrderPaymentList/OrderPaymentList";
import { useFormik } from "formik";

const paymentTypeOptions = ["ПриватБанк", "МоноБанк", "Готівка"];

const AmountInputCustom = React.forwardRef(function InvoicePriceInputCustom(
  props,
  ref
) {
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
});

const initPayment = {
  amount: "",
  date: dayjs(new Date()),
  paymentType: null,
};

const calculateAmount = (payments) => {
  if (payments.length === 0) {
    return 0;
  } else {
    return payments.reduce(
      (accumulator, currentPament) =>
        accumulator + Number(currentPament.amount),
      0
    );
  }
};

const OrderPaymentForm = ({ initPayments, onChange }) => {
  const [payments, setPayments] = useState(initPayments);

  useEffect(() => {
    onChange(payments);
  }, [onChange, payments]);

  const handleSubmit = (values, { resetForm }) => {
    setPayments((prev) => [...prev, values]);
    resetForm();
  };

  const onDeletePayment = (index) => {
    setPayments(payments.filter((payment, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: initPayment,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <div>Сплачено {calculateAmount(payments)} грн</div>
      <form className={styles.amountForm} onSubmit={formik.handleSubmit}>
        <div className={styles.fields}>
          <TextField
            className={styles.amount}
            name="amount"
            label="Сума"
            autoComplete="off"
            required
            onChange={formik.handleChange}
            value={formik.values.amount}
            size="small"
            InputProps={{
              inputComponent: AmountInputCustom,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            <DatePicker
              className={styles.date}
              value={formik.values.date}
              name="date"
              label="Дата"
              slotProps={{ textField: { size: "small", required: true } }}
              autoComplete="off"
              size="small"
              onChange={(value) => {
                formik.setFieldValue("date", value);
              }}
            />
          </LocalizationProvider>
          <Autocomplete
            className={styles.paymentType}
            popupIcon={null}
            options={paymentTypeOptions}
            onChange={(e, value) => {
              formik.setFieldValue("paymentType", value);
            }}
            value={formik.values.paymentType}
            renderInput={(params) => (
              <TextField required {...params} label="Тип оплати" />
            )}
            size="small"
            noOptionsText={"Не знайдено"}
          />
        </div>
        <Button type="submit" variant="contained" size="small">
          Додати оплату
        </Button>
      </form>

      <OrderPaymentList payments={payments} onDelete={onDeletePayment} />
    </div>
  );
};

export default OrderPaymentForm;
