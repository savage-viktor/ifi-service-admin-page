import OrderDeviceItem from "../OrderDeviceItem/OrderDeviceItem";
import styles from "./OrderDevicesList.module.css";

import {
  getInitDevices,
  getInitIncome,
  getInitOutcome,
} from "../../redux/serviceOrder/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  addDevice,
  deleteDevice,
  setDeviceImeiArray,
} from "../../redux/serviceOrder/devicesSlice";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const OrderDevicesList = ({ models, services }) => {
  const dispatch = useDispatch();
  const [serialNumbers, setSerialNumbers] = useState("");

  const devices = useSelector(getInitDevices);
  const income = useSelector(getInitIncome);
  const outcome = useSelector(getInitOutcome);

  const onDelete = (index) => {
    dispatch(deleteDevice(index));
  };

  const addDeviceRow = (quantity) => {
    dispatch(addDevice(quantity));
  };

  const onChangeSN = (event) => {
    setSerialNumbers(event.target.value);
  };

  const addSNHandler = () => {
    dispatch(setDeviceImeiArray(serialNumbers));
    setSerialNumbers("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.panelBox}>
        <TextField
          name="comment"
          // label="Серійні номери"
          autoComplete="off"
          onChange={onChangeSN}
          value={serialNumbers}
          size="small"
          multiline
          maxRows={4}
        />
        <Button
          className={styles.addDeviceBtn}
          onClick={addSNHandler}
          variant="contained"
          size="small"
        >
          Додати серійні
        </Button>
        <Button
          className={styles.addDeviceBtn}
          onClick={() => {
            addDeviceRow(5);
          }}
          variant="contained"
          size="small"
        >
          Додати 5 пристроїв
        </Button>
        <Button
          className={styles.addDeviceBtn}
          onClick={() => {
            addDeviceRow(1);
          }}
          variant="contained"
          size="small"
        >
          Додати пристрій
        </Button>
      </div>
      {devices.map((device, index) => {
        return (
          <OrderDeviceItem
            onDelete={onDelete}
            key={device.id}
            index={index}
            models={models}
            services={services}
            device={device}
          />
        );
      })}
      <div className={styles.totalBox}>
        <span>Всього </span>
        <span>
          {devices.reduce(
            (accumulator, device) => accumulator + Number(device.amount),
            0 + Number(income.invoicePrice) + Number(outcome.invoicePrice)
          )}
          грн
        </span>
      </div>
    </div>
  );
};

export default OrderDevicesList;
