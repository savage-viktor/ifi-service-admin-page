import { CardActions, IconButton } from "@mui/material";
import styles from "./PriceCard.module.css";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function PriceCard({ price, onEdit, onDelete }) {
  function sortArray(models) {
    return models.sort((firstModel, secondModel) =>
      firstModel.localeCompare(secondModel)
    );
  }

  return (
    <div className={styles.card}>
      <span className={styles.amount}>{price.amount}грн</span>
      <span className={styles.comment}>{price.comment}</span>
      <br />
      <span className={styles.header}>Моделі</span>
      <div className={styles.list}>
        {sortArray(price.models).map((model) => (
          <span className={styles.item}>{model}</span>
        ))}
      </div>
      {price.models.length === 0 && <span className={styles.none}>Немає</span>}
      <br />
      <span className={styles.header}>Клієнти</span>
      <div className={styles.list}>
        {sortArray(price.clients).map((client) => (
          <span className={styles.item}>{client}</span>
        ))}
      </div>
      {price.clients.length === 0 && <span className={styles.none}>Немає</span>}
      <br />
      <span className={styles.header}>Дропшиппери</span>
      <div className={styles.list}>
        {sortArray(price.dropshippers).map((dropshipper) => (
          <span className={styles.item}>{dropshipper}</span>
        ))}
      </div>
      {price.dropshippers.length === 0 && (
        <span className={styles.none}>Немає</span>
      )}
      <CardActions className={styles.cardActions} disableSpacing>
        <IconButton
          onClick={() => {
            onEdit(price);
          }}
          aria-label="delete"
          size="small"
          sx={{ ml: "auto" }}
        >
          <ModeEditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete(price);
          }}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </CardActions>
    </div>
  );
}

export default PriceCard;
