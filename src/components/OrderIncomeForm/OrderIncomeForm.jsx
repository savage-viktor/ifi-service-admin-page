import { setIncome } from "../../redux/serviceOrder/incomeSlice";
import { setOutcome } from "../../redux/serviceOrder/outcomeSlice";

import { getInitIncome } from "../../redux/serviceOrder/selectors";
import OrderLogisticForm from "../OrderLogisticForm/OrderLogisticForm";

import { useDispatch, useSelector } from "react-redux";

const OrderIncomeForm = () => {
  const dispatch = useDispatch();
  const initIncomeLogistic = useSelector(getInitIncome);

  const handleChangeIncome = (logistic) => {
    dispatch(setIncome(logistic));
  };

  return (
    <div>
      <OrderLogisticForm
        initLogistic={initIncomeLogistic}
        onChange={handleChangeIncome}
      />
    </div>
  );
};

export default OrderIncomeForm;
