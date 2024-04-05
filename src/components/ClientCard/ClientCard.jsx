import styles from "./ClientCard.module.css";

function ClientCard({ client }) {
  return (
    <div className={styles.card}>
      {client.lastName} {client.firstName}
    </div>
  );
}

export default ClientCard;
