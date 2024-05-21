import styles from "./AddOrderForm.module.css";

import OrderClientForm from "../OrderClientForm/OrderClientForm";
import OrderPaymentForm from "../OrderPaymentForm/OrderPaymentForm";
import OrderDevicesList from "../OrderDevicesList/OrderDevicesList";
import OrderIncomeForm from "../OrderIncomeForm/OrderIncomeForm";
import OrderOutcomeForm from "../OrderOutcomeForm/OrderOutcomeForm";
import { useDispatch, useSelector } from "react-redux";
import { getServiceOrder } from "../../redux/serviceOrder/selectors";
import { EditOrder, SubmitOrder } from "../../services/OrdersAPI";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setOrderNumber } from "../../redux/serviceOrder/orderNumberSlice";
import { toastSettings } from "../../data/common";

const AddOrderForm = ({ clients, models, services }) => {
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const order = useSelector(getServiceOrder);

  const handleSubmit = () => {
    setStatus("loading");

    if (order.orderNumber) {
      EditOrder(order)
        .then((createdOrder) => {
          setStatus("idle");
          toast.success("Збережено успішно", toastSettings);
        })
        .catch((error) => {
          console.log(error.message);
          setStatus("error");
          toast.error(`Помилка збереження ${error.message}`, toastSettings);
        });
    } else {
      SubmitOrder(order)
        .then((createdOrder) => {
          dispatch(setOrderNumber(createdOrder.orderNumber));

          setStatus("idle");
          toast.success("Збережено успішно", toastSettings);
        })
        .catch((error) => {
          console.log(error.message);
          setStatus("error");
          toast.error(`Помилка збереження ${error.message}`, toastSettings);
        });
    }
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

      <Link to="/orders">
        <Button variant="contained" size="middle">
          Повернутись
        </Button>
      </Link>

      <Button
        disabled={status === "loading" ? true : false}
        onClick={handleSubmit}
        variant="contained"
        size="middle"
      >
        Зберегти
      </Button>
    </div>
  );
};

export default AddOrderForm;
