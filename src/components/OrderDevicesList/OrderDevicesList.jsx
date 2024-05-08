import OrderDeviceItem from "../OrderDeviceItem/OrderDeviceItem";
import styles from "./OrderDevicesList.module.css";

import { getInitDevices } from "../../redux/serviceOrder/selectors";
import { useDispatch, useSelector } from "react-redux";
import { addDevice, deleteDevice } from "../../redux/serviceOrder/devicesSlice";

const OrderDevicesList = ({ models, services }) => {
  const dispatch = useDispatch();

  const devices = useSelector(getInitDevices);

  const onDelete = (index) => {
    dispatch(deleteDevice(index));
  };

  const addDeviceRow = () => {
    dispatch(addDevice());
  };

  return (
    <div className={styles.container}>
      <button onClick={addDeviceRow}>Додати</button>
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
      <div>
        <span>Всього </span>
        <span>
          {devices.reduce(
            (accumulator, device) => accumulator + Number(device.amount),
            0
          )}
          грн
        </span>
      </div>
    </div>
  );
};

export default OrderDevicesList;
