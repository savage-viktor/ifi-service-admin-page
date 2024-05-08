import styles from "./AddOrderForm.module.css";

import OrderClientForm from "../OrderClientForm/OrderClientForm";
import OrderPaymentForm from "../OrderPaymentForm/OrderPaymentForm";
import OrderDevicesList from "../OrderDevicesList/OrderDevicesList";
import OrderIncomeForm from "../OrderIncomeForm/OrderIncomeForm";
import OrderOutcomeForm from "../OrderOutcomeForm/OrderOutcomeForm";
import { useSelector } from "react-redux";
import { getServiceOrder } from "../../redux/serviceOrder/selectors";

const AddOrderForm = ({ clients, models, services }) => {
  const order = useSelector(getServiceOrder);

  const handleSubmit = () => {
    console.log(order);
  };

  return (
    <div>
      <div className={styles.container}>
        <OrderClientForm clients={clients} />
        <OrderIncomeForm />
        <OrderOutcomeForm />
        <OrderPaymentForm />
      </div>
      <OrderDevicesList models={models} services={services} />
      <button onClick={handleSubmit}>Зберегти</button>
    </div>
  );
};

export default AddOrderForm;
