import ClientCard from "../ClientCard/ClientCard";

import styles from "./ClientList.module.css";

function ClientList({ clients, onEdit, onDelete }) {
  const sortedClients = clients.sort((firstClient, secondClient) =>
    firstClient.lastName.localeCompare(secondClient.lastName)
  );

  return (
    <div className={styles.clientList}>
      {sortedClients.map((client) => (
        <ClientCard client={client} />
      ))}
    </div>
  );
}

export default ClientList;
