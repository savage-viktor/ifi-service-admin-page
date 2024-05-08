import { getInitOutcome } from "../../redux/serviceOrder/selectors";

import {
  setOutcomeType,
  setInput,
  setDate,
} from "../../redux/serviceOrder/outcomeSlice";

import { useDispatch, useSelector } from "react-redux";

import styles from "./OrderOutcomeForm.module.css";

import LogisticTypeRadioGroup from "../LogisticTypeRadioGroup/LogisticTypeRadioGroup";
import PostTypeForm from "../PostTypeForm/PostTypeForm";
import CommentDateForm from "../CommentDateForm/CommentDateForm";
import { setIncomeType } from "../../redux/serviceOrder/incomeSlice";

const OrderOutcomeForm = () => {
  const dispatch = useDispatch();
  const { logisticType, invoiceNumber, invoicePrice, comment, date } =
    useSelector(getInitOutcome);

  const handleChangeLogisticType = (event) => {
    if (event.target.value === "remote") {
      dispatch(setIncomeType("remote"));
    } else {
      dispatch(setIncomeType("post"));
    }

    dispatch(setOutcomeType(event.target.value));
  };

  const handleInput = (event) => {
    dispatch(setInput({ name: event.target.name, value: event.target.value }));
  };

  const handleChangeDate = (date) => {
    dispatch(setDate(date));
  };

  return (
    <div className={styles.container}>
      <LogisticTypeRadioGroup
        initValue={logisticType}
        onChange={handleChangeLogisticType}
      />
      {logisticType === "post" && (
        <PostTypeForm
          invoiceNumber={invoiceNumber}
          invoicePrice={invoicePrice}
          onChange={handleInput}
        />
      )}
      <CommentDateForm
        comment={comment}
        initDate={date}
        onChange={handleInput}
        onChangeDate={handleChangeDate}
      />
    </div>
  );
};

export default OrderOutcomeForm;
