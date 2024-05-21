import { useEffect, useState } from "react";
import { DeleteOrder, GetOrders } from "../../services/OrdersAPI";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import ControlPanel from "../ControlPanel/ControlPanel";
import FindInput from "../FindInput/FindInput";
import AddElementButton from "../AddElementButton/AddElementButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderList from "../OrderList/OrderList";
import { toastSettings } from "../../data/common";
import { useDispatch, useSelector } from "react-redux";

import {
  orderNumberInitialState,
  setOrderNumber,
} from "../../redux/serviceOrder/orderNumberSlice";
import {
  clientInitialState,
  setClient,
} from "../../redux/serviceOrder/clientSlice";
import {
  incomeInitialState,
  setIncome,
} from "../../redux/serviceOrder/incomeSlice";
import {
  outcomeInitialState,
  setOutcome,
} from "../../redux/serviceOrder/outcomeSlice";
import {
  paymentsInitialState,
  setPayments,
} from "../../redux/serviceOrder/paymentsSlice";
import {
  devicesInitialState,
  setDevices,
} from "../../redux/serviceOrder/devicesSlice";
import { getServiceOrder } from "../../redux/serviceOrder/selectors";
import { setOrderID } from "../../redux/serviceOrder/orderIDSlice";

function Orders(params) {
  const [status, setStatus] = useState("idle");
  const [orders, setOrders] = useState(false);
  const [findOrder, setFindOrder] = useState("");

  const [update, setUpdate] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderNumber } = useSelector(getServiceOrder);

  useEffect(() => {
    setStatus("loading");
    GetOrders()
      .then((orders) => {
        setOrders(orders);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [update]);

  const onAddOrder = () => {
    if (orderNumber) {
      dispatch(setOrderNumber(orderNumberInitialState));
      dispatch(setClient(clientInitialState));
      dispatch(setIncome(incomeInitialState));
      dispatch(setOutcome(outcomeInitialState));
      dispatch(setPayments(paymentsInitialState));
      dispatch(setDevices(devicesInitialState));
    }
    navigate("/order");
  };

  const onEditOrder = (order) => {
    dispatch(setOrderID(order._id));
    dispatch(setOrderNumber(order.orderNumber));
    dispatch(setClient(order.client));
    dispatch(setIncome(order.income));
    dispatch(setOutcome(order.outcome));
    dispatch(setPayments(order.payments));
    dispatch(setDevices(order.devices));

    navigate("/order");
  };

  const onDeleteOrder = (id) => {
    DeleteOrder(id)
      .then((order) => {
        setUpdate((prevState) => prevState + 1);
        toast.success("Видалено успішно", toastSettings);
      })
      .catch((error) => {
        toast.error(`Помилка видалення ${error.message}`, toastSettings);
      });
  };

  return (
    <div>
      <ControlPanel>
        <FindInput onChange={setFindOrder} label="Пошук" />
        <AddElementButton onClick={onAddOrder} label="Додати замовлення" />
      </ControlPanel>

      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {orders && (
        <OrderList
          orders={orders}
          onEditOrder={onEditOrder}
          onDeleteOrder={onDeleteOrder}
        />
      )}
    </div>
  );
}

export default Orders;
