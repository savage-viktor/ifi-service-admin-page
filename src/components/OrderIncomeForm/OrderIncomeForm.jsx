import {
  setIncomeType,
  setInput,
  setDate,
} from "../../redux/serviceOrder/incomeSlice";

import styles from "./OrderIncomeForm.module.css";

import { getInitIncome } from "../../redux/serviceOrder/selectors";
import LogisticTypeRadioGroup from "../LogisticTypeRadioGroup/LogisticTypeRadioGroup";

import { useDispatch, useSelector } from "react-redux";
import PostTypeForm from "../PostTypeForm/PostTypeForm";
import CommentDateForm from "../CommentDateForm/CommentDateForm";
import { setOutcomeType } from "../../redux/serviceOrder/outcomeSlice";

const OrderIncomeForm = () => {
  const dispatch = useDispatch();
  const { logisticType, invoiceNumber, invoicePrice, comment, date } =
    useSelector(getInitIncome);

  const handleChangeLogisticType = (event) => {
    if (event.target.value === "remote") {
      dispatch(setOutcomeType("remote"));
    } else {
      dispatch(setOutcomeType("post"));
    }

    dispatch(setIncomeType(event.target.value));
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

export default OrderIncomeForm;
