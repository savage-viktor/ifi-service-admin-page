import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/uk";
import dayjs from "dayjs";

import styles from "./CommentDateForm.module.css";

const CommentDateForm = ({ comment, initDate, onChange, onChangeDate }) => {
  return (
    <div className={styles.dateBox}>
      <TextField
        className={styles.comment}
        name="comment"
        label="Коментар"
        autoComplete="off"
        onChange={onChange}
        value={comment}
        size="small"
        multiline
        maxRows={4}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
        <DatePicker
          label="Дата"
          slotProps={{ textField: { size: "small" } }}
          className={styles.date}
          autoComplete="off"
          onChange={(newValue) =>
            onChangeDate(dayjs(newValue).format("MM.DD.YYYY"))
          }
          value={dayjs(initDate)}
          size="small"
        />
      </LocalizationProvider>
    </div>
  );
};

export default CommentDateForm;
