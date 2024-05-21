import { IconButton } from "@mui/material";
import styles from "./OrderItem.module.css";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const OrderItem = ({ order, onEdit, onDelete }) => {
  return (
    <div className={styles.container} key={order._id}>
      <span>{order.orderNumber}</span>
      <span>{order.client.lastName}</span>
      <span>Пристроїв {order.devices.length}</span>
      <span>Дата {order.outcome.date}</span>
      <span>
        Сума
        {order.devices.reduce(
          (accumulator, device) => accumulator + Number(device.amount),
          0 +
            Number(order.income.invoicePrice) +
            Number(order.outcome.invoicePrice)
        )}
        грн
      </span>

      <div className={styles.icon}>
        <IconButton
          onClick={() => {
            onEdit(order);
          }}
          aria-label="edit"
          size="small"
        >
          <ModeEditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete(order._id);
          }}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

export default OrderItem;
