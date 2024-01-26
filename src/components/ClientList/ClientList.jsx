function ClientList({ clients, onEdit, onDelete }) {
  const sortedClients = clients.sort((firstClient, secondClient) =>
    firstClient.lastName.localeCompare(secondClient.lastName)
  );

  return (
    <div>
      {sortedClients.map((client) => {
        return (
          <div>
            {client.lastName} {client.firstName}
          </div>
        );
      })}
    </div>
  );
}

export default ClientList;
