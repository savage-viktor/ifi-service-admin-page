import OrderDeviceItem from "../OrderDeviceItem/OrderDeviceItem";
import styles from "./OrderDevicesList.module.css";

const OrderDevicesList = ({ items, models, services }) => {
  return (
    <div className={styles.container}>
      <OrderDeviceItem models={models} services={services} />
    </div>
  );
};

export default OrderDevicesList;
