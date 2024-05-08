import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import styles from "./OrderPaymentList.module.css";

import DeleteIcon from "@mui/icons-material/Delete";

function transformDate(incomeDate) {
  const date = new Date(incomeDate);
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${day}.${month}.${year}`;
}

const OrderPaymentList = ({ payments, onDelete }) => {
  return (
    <div>
      <Table>
        <TableBody className={styles.tableRow}>
          {payments.map((payment, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {payment.amount} грн
              </TableCell>
              <TableCell align="right">{transformDate(payment.date)}</TableCell>
              <TableCell align="right">{payment.paymentType}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    onDelete(index);
                  }}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderPaymentList;

// <IconButton
//   // onClick={() => {
//   //   onDelete(service._id);
//   // }}
//   aria-label="delete"
//   size="small"
// >
//   <DeleteIcon fontSize="inherit" />
// </IconButton>;
