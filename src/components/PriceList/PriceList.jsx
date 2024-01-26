import PriceCard from "../PriceCard/PriceCard";
import styles from "./PriceList.module.css";

function PriceList({ prices, onEdit, onDelete }) {
  return (
    <div className={styles.priceList}>
      {prices.map((price) => (
        <PriceCard price={price} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PriceList;
