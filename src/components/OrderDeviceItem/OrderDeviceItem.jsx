import {
  Autocomplete,
  Checkbox,
  InputAdornment,
  TextField,
} from "@mui/material";
import styles from "./OrderDeviceItem.module.css";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useFormik } from "formik";
import { useEffect } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AccountCircle } from "@mui/icons-material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const makeServiceOptions = (model, services, client, dropshipper) => {
  const options = [];
  services.map((service) => {
    service.prices.map((price) => {
      if (price.models.includes(model)) {
        options.push({ label: service.name, price });
      }
    });
  });

  return options;
};

const complectationOptions = [
  "АКБ",
  "Кришка",
  "Зарядка",
  "Плата",
  "Ковпачок",
  "Повна комплектація",
];

const initItem = {
  model: null,
  imei: "",
  service: null,
};

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

const OrderDeviceItem = ({ models, services }) => {
  const formik = useFormik({
    initialValues: initItem,
    //   onSubmit: handleSubmit,
  });

  const [options, setOptions] = useState(
    makeServiceOptions(formik.values.model, services)
  );

  useEffect(() => {
    if (formik.values.model === null) {
      formik.setFieldValue("service", null);
    }

    setOptions(makeServiceOptions(formik.values.model, services));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.model, services]);

  return (
    <div className={styles.container}>
      <Autocomplete
        className={styles.model}
        popupIcon={null}
        options={models.map((model) => model.model)}
        onChange={(e, value) => {
          formik.setFieldValue("model", value);
        }}
        value={formik.values.model}
        renderInput={(params) => (
          <TextField className={styles.modelTextField} required {...params} />
        )}
        size="small"
        noOptionsText={"Не знайдено"}
      />
      <TextField
        className={`${styles.imei} ${
          (formik.values.imei.length !== 15) & (formik.values.imei.length > 0)
            ? styles.imeiWarning
            : ""
        }`}
        name="imei"
        autoComplete="off"
        onChange={formik.handleChange}
        value={formik.values.imei}
        size="small"
        InputProps={{
          inputComponent: InvoiceNumberInputCustom,
          endAdornment: (
            <InputAdornment position="end">
              <Checkbox icon={icon} checkedIcon={checkedIcon} />
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
        className={styles.service}
        popupIcon={null}
        options={options}
        onChange={(e, value) => {
          formik.setFieldValue("service", value);
        }}
        value={formik.values.service}
        renderInput={(params) => <TextField required {...params} />}
        size="small"
        noOptionsText={"Не знайдено"}
      />

      <Autocomplete
        className={styles.complectation}
        multiple
        popupIcon={null}
        options={complectationOptions}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => <TextField {...params} />}
        size="small"
        noOptionsText={"Не знайдено"}
      />

      <TextField
        className={styles.amount}
        name="amount"
        autoComplete="off"
        // onChange={formik.handleChange}
        // value={formik.values.amount}
        size="small"
        InputProps={{
          inputComponent: AmountInputCustom,
        }}
      />
    </div>
  );
};

export default OrderDeviceItem;
