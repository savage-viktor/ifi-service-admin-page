import { getInitOutcome } from "../../redux/serviceOrder/selectors";
import { setOutcome } from "../../redux/serviceOrder/outcomeSlice";

import OrderLogisticForm from "../OrderLogisticForm/OrderLogisticForm";

import { useDispatch, useSelector } from "react-redux";

const OrderOutcomeForm = () => {
  const dispatch = useDispatch();
  const initOutcomeLogistic = useSelector(getInitOutcome);

  const handleChangeOutcome = (logistic) => {
    dispatch(setOutcome(logistic));
  };

  return (
    <div>
      <OrderLogisticForm
        initLogistic={initOutcomeLogistic}
        onChange={handleChangeOutcome}
      />
    </div>
  );
};

export default OrderOutcomeForm;
