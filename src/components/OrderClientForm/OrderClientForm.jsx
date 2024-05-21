import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./OrderClientForm.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getInitClient } from "../../redux/serviceOrder/selectors";

import { useDispatch } from "react-redux";

import {
  changeClientType,
  checkDropshipper,
  clearDropshipper,
  clearRegularClient,
  setInput,
  setDropshipper,
  setRegularClient,
} from "../../redux/serviceOrder/clientSlice";

function makeClientOptions(clients) {
  return clients
    .map((client) => {
      return {
        label: `${client.lastName} ${client.firstName}`,
        value: `${client.lastName} ${client.firstName}`,
        ...client,
      };
    })
    .sort((firstClient, secondClient) =>
      firstClient.lastName.localeCompare(secondClient.lastName)
    );
}

function makeDefaultOption(clientOptions, firstName, lastName) {
  let defaultOption = null;
  clientOptions.map((option) => {
    if (option.label === `${lastName} ${firstName}`) {
      defaultOption = option;
    }
    return null;
  });

  return defaultOption;
}

const OrderClientForm = ({ clients }) => {
  const {
    firstName,
    clientType,
    lastName,
    city,
    phone,
    dropshipper,
    isDropshipper,
  } = useSelector(getInitClient);

  const [clientOptions] = useState(makeClientOptions(clients));
  const [activeClientOption, setActiveClientOption] = useState(
    makeDefaultOption(clientOptions, firstName, lastName)
  );

  const dispatch = useDispatch();

  const handleChangeClientType = (event) => {
    dispatch(changeClientType(event.target.value));
    setActiveClientOption(null);
  };

  const handleInput = ({ target: { name, value } }) => {
    dispatch(setInput({ name, value }));
  };

  const handleCheckDropshipper = ({ target: { checked } }) => {
    dispatch(checkDropshipper(checked));
  };

  const onChangeClient = (event, newValue) => {
    if (newValue) {
      dispatch(setRegularClient(newValue));
      setActiveClientOption(newValue);
    } else {
      dispatch(clearRegularClient());
      setActiveClientOption(null);
    }
  };

  const onChangeDropshipper = (event, newValue) => {
    newValue
      ? dispatch(setDropshipper(newValue))
      : dispatch(clearDropshipper());
  };

  return (
    <div className={styles.container}>
      <RadioGroup
        className={styles.radioGroup}
        row
        value={clientType}
        onChange={handleChangeClientType}
      >
        <FormControlLabel
          value="retail"
          control={<Radio size="small" />}
          label={
            <Typography className={styles.formControlLabel}>Роздріб</Typography>
          }
        />
        <FormControlLabel
          value="regular"
          control={<Radio size="small" />}
          label={
            <Typography className={styles.formControlLabel}>
              Постійний
            </Typography>
          }
        />
      </RadioGroup>

      {clientType === "regular" && (
        <div className={styles.regularClientBox}>
          <Autocomplete
            popupIcon={null}
            value={activeClientOption}
            onChange={onChangeClient}
            options={clientOptions}
            renderInput={(params) => <TextField {...params} label="Клієнт" />}
            size="small"
            noOptionsText={"Не знайдено"}
          />
          {city && (
            <TextField
              fullWidth
              label="Місто"
              value={city}
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />
          )}
          {phone && (
            <TextField
              fullWidth
              label="Номер"
              value={phone}
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />
          )}
        </div>
      )}

      {clientType === "retail" && (
        <div className={styles.retailClientBox}>
          <TextField
            fullWidth
            name="lastName"
            label="Прізвище"
            autoComplete="off"
            onChange={handleInput}
            value={lastName}
            size="small"
          />
          <TextField
            fullWidth
            name="firstName"
            label="Ім'я"
            autoComplete="off"
            onChange={handleInput}
            value={firstName}
            size="small"
          />
          <TextField
            fullWidth
            name="city"
            label="Місто"
            autoComplete="off"
            onChange={handleInput}
            value={city}
            size="small"
          />
          <TextField
            fullWidth
            name="phone"
            label="Номер"
            autoComplete="off"
            onChange={handleInput}
            value={phone}
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isDropshipper}
                onChange={handleCheckDropshipper}
              />
            }
            label={
              <Typography className={styles.formControlLabel}>
                Дропшиппер
              </Typography>
            }
          />
          {isDropshipper && (
            <Autocomplete
              popupIcon={null}
              onChange={onChangeDropshipper}
              options={clientOptions}
              value={dropshipper}
              renderInput={(params) => (
                <TextField {...params} label="Дропшиппер" required />
              )}
              size="small"
              noOptionsText={"Не знайдено"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderClientForm;
