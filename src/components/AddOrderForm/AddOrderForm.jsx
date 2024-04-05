import styles from "./AddOrderForm.module.css";

import OrderClientForm from "../OrderClientForm/OrderClientForm";
import OrderPaymentForm from "../OrderPaymentForm/OrderPaymentForm";
import OrderDevicesList from "../OrderDevicesList/OrderDevicesList";
import OrderIncomeForm from "../OrderIncomeForm/OrderIncomeForm";
import OrderOutcomeForm from "../OrderOutcomeForm/OrderOutcomeForm";

const initPayments = [];

const items = [
  {
    model: "",
    imei: "",
    innerImei: "",
    services: [],
    complectation: [],
    price: "",
  },
];

const AddOrderForm = ({ clients, models, services }) => {
  const handleChangePayment = (payments) => {
    // console.log(payments);
  };

  return (
    <div>
      <div className={styles.container}>
        <OrderClientForm clients={clients} />
        <OrderIncomeForm />
        <OrderOutcomeForm />
        <OrderPaymentForm
          onChange={handleChangePayment}
          initPayments={initPayments}
        />
      </div>
      <OrderDevicesList items={items} models={models} services={services} />
    </div>
  );
};

export default AddOrderForm;
