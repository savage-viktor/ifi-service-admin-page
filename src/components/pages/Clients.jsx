import { useEffect, useState } from "react";
import AddElementButton from "../AddElementButton/AddElementButton";
import ControlPanel from "../ControlPanel/ControlPanel";
import FindInput from "../FindInput/FindInput";
import Modal from "../Modal/Modal";
import AddClientForm from "../AddClientForm/AddClientForm";
import { GetClients, SubmitClient } from "../../services/ClientsAPI";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import ClientList from "../ClientList/ClientList";
import Dashboard from "../Dashboard/Dashboard";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import SummaryPanel from "../SummaryPanel/SummaryPanel";

function Clients() {
  const [status, setStatus] = useState("idle");
  const [clients, setClients] = useState(false);

  const [modal, setModal] = useState(false);
  const [findClient, setFindClient] = useState("");

  const [update, setUpdate] = useState(1);

  useEffect(() => {
    setStatus("loading");
    GetClients()
      .then((clients) => {
        setClients(clients);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [update]);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    // setModel(false);
  };

  const handleSubmit = (values) => {
    setModal(false);

    SubmitClient(values)
      .then(() => {
        setUpdate((prevState) => prevState + 1);
        toast.success("Додано успішно", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(`Помилка додавання ${error.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const filterClients = (clients) => {
    return clients.filter((client) => {
      return client.lastName.toLowerCase().includes(findClient);
    });
  };

  return (
    <Dashboard>
      <ControlPanel>
        <FindInput onChange={setFindClient} label="Пошук клієнта" />
        <AddElementButton onClick={handleOpenModal} label="Додати клієнта" />
      </ControlPanel>
      <DashboardHeader text="Клієнти" />
      <SummaryPanel array={clients ? filterClients(clients) : []} />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {clients && (
        <ClientList
          clients={filterClients(clients)}
          // onEdit={handleEditModel}
          // onDelete={handleDeleteModel}
        />
      )}
      {modal && (
        <Modal onClose={handleCloseModal}>
          <AddClientForm onSubmit={handleSubmit} />
        </Modal>
      )}
    </Dashboard>
  );
}

export default Clients;
