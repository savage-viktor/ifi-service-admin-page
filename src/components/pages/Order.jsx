import AddOrderForm from "../AddOrderForm/AddOrderForm";
import Dashboard from "../Dashboard/Dashboard";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { useEffect, useState } from "react";
import { GetClients } from "../../services/ClientsAPI";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { GetModels } from "../../services/ModelsAPI";
import { GetServices } from "../../services/ServicesAPI";

function Order(params) {
  const [status, setStatus] = useState("idle");
  const [clients, setClients] = useState(false);
  const [models, setModels] = useState(false);
  const [services, setServices] = useState(false);

  const [update, setUpdate] = useState(1);

  useEffect(() => {
    setStatus("loading");

    Promise.all([GetClients(), GetModels(), GetServices()])
      .then((value) => {
        setClients(value[0]);
        setModels(value[1]);
        setServices(value[2]);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [update]);

  return (
    <Dashboard>
      <DashboardHeader text="Заявка на сервісні послуги" />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {clients && (
        <AddOrderForm clients={clients} models={models} services={services} />
      )}
    </Dashboard>
  );
}

export default Order;
