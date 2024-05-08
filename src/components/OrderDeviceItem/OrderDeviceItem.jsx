import {
  Autocomplete,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

import styles from "./OrderDeviceItem.module.css";
import React from "react";
import { NumericFormat } from "react-number-format";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeviceModel,
  setDeviceImei,
  setDeviceService,
  setDeviceComplectation,
  setDeviceAmount,
  clearDevice,
} from "../../redux/serviceOrder/devicesSlice";
import { getInitClient } from "../../redux/serviceOrder/selectors";

const filter = createFilterOptions();

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

const complectationOptions = [
  "АКБ",
  "Кришка",
  "Зарядка",
  "Плата",
  "Ковпачок",
  "Повна комплектація",
];

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

const OrderDeviceItem = ({ models, services, device, onDelete, index }) => {
  const dispatch = useDispatch();

  const client = useSelector(getInitClient);

  const makeServiceOptions = (model, services) => {
    let options = [];
    let allDevicePrices = [];

    let activeDevicePrices = {};

    services.map((service) => {
      service.prices.map((price) => {
        if (price.models.includes(model)) {
          allDevicePrices.push({ name: service.name, price });
        }

        return 0;
      });
      return 0;
    });

    allDevicePrices.forEach((price) => {
      if (price.price.dropshippers.includes(client.dropshipper?.label)) {
        activeDevicePrices[price.name] = price.price;
      }
      if (
        price.price.clients.includes(`${client.lastName} ${client.firstName}`)
      ) {
        activeDevicePrices[price.name] = price.price;
      }
      if (
        price.price.dropshippers.length === 0 &&
        price.price.clients.length === 0 &&
        !activeDevicePrices[price.name]
      ) {
        activeDevicePrices[price.name] = price.price;
      }
    });

    for (const key in activeDevicePrices) {
      options.push({
        label: key,
        price: activeDevicePrices[key].amount,
        value: key,
      });
    }

    return options;
  };

  const onChangeModel = (e, value) => {
    if (!value) {
      dispatch(
        clearDevice({
          id: device.id,
        })
      );
    }

    dispatch(
      setDeviceModel({
        id: device.id,
        value,
      })
    );
  };

  const onChangeImei = (e) => {
    dispatch(
      setDeviceImei({
        id: device.id,
        value: e.target.value,
      })
    );
  };

  const onChangeService = (e, value) => {
    dispatch(
      setDeviceService({
        id: device.id,
        value: value ? value.label : value,
      })
    );

    dispatch(
      setDeviceAmount({
        id: device.id,
        value: value ? value.price : 0,
      })
    );
  };

  const onChangeComplectation = (e, value) => {
    dispatch(
      setDeviceComplectation({
        id: device.id,
        value,
      })
    );
  };

  const onChangeAmount = (e) => {
    dispatch(
      setDeviceAmount({
        id: device.id,
        value: e.target.value,
      })
    );
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        className={styles.model}
        popupIcon={null}
        options={models.map((model) => model.model)}
        onChange={onChangeModel}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some((option) => inputValue === option);
          if (inputValue !== "" && !isExisting) {
            filtered.push(inputValue);
          }

          return filtered;
        }}
        value={device.model}
        renderInput={(params) => (
          <TextField className={styles.modelTextField} required {...params} />
        )}
        size="small"
        freeSolo
        noOptionsText={"Не знайдено"}
      />

      <TextField
        className={`${styles.imei} ${
          (device.imei.length !== 15) & (device.imei.length > 0)
            ? styles.imeiWarning
            : ""
        }`}
        name="imei"
        autoComplete="off"
        onChange={onChangeImei}
        value={device.imei}
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
        options={makeServiceOptions(device.model, services)}
        onChange={onChangeService}
        value={device.service}
        renderInput={(params) => <TextField required {...params} />}
        size="small"
        noOptionsText={"Не знайдено"}
        isOptionEqualToValue={(option, value) => {
          return option.label === value.label || option.label === value;
        }}
      />

      <Autocomplete
        className={styles.complectation}
        onChange={onChangeComplectation}
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
        onChange={onChangeAmount}
        value={device.amount}
        size="small"
        InputProps={{
          inputComponent: AmountInputCustom,
        }}
      />

      <IconButton
        onClick={() => {
          onDelete(index);
        }}
        aria-label="delete"
        size="small"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default OrderDeviceItem;
