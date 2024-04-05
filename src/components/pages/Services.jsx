import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";

import { GetServices } from "../../services/ServicesAPI";

import { SubmitService, DeleteService } from "../../services/ServicesAPI";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Button, Grid } from "@mui/material";
import FindInput from "../FindInput/FindInput";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import ControlPanel from "../ControlPanel/ControlPanel";
import Dashboard from "../Dashboard/Dashboard";
import ServiceList from "../ServiceList/ServiceList";
import SummaryPanel from "../SummaryPanel/SummaryPanel";

const initService = {
  page: "",
  name: "",
};

function Services() {
  const [status, setStatus] = useState("idle");
  const [services, setServices] = useState(false);
  const [update, setUpdate] = useState(1);

  const [findService, setFindService] = useState("");

  useEffect(() => {
    setStatus("loading");
    GetServices()
      .then((services) => {
        setServices(services);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [update]);

  function handleSearch(value) {
    setFindService(value);
  }

  const handleSubmit = async (values) => {
    await SubmitService(values);

    setUpdate((prevState) => prevState + 1);
  };

  const handleDeleteService = async (id) => {
    await DeleteService(id);
    setUpdate((prevState) => prevState + 1);
  };

  const filterServices = (services) => {
    return services.filter((service) => {
      return service.name.toLowerCase().includes(findService);
    });
  };

  return (
    <Dashboard>
      <ControlPanel>
        <FindInput onChange={handleSearch} label="Пошук послуги" />
        <Formik
          // validationSchema="erg"
          initialValues={initService}
          onSubmit={handleSubmit}
        >
          <Form autoComplete="off">
            <Field
              // component={TextField}
              name="name"
              label="Послуга"
            />
            <Field
              // component={TextField}
              name="page"
              label="Сторінка"
            />

            <Button type="submit" variant="contained">
              Додати послугу
            </Button>
          </Form>
        </Formik>
      </ControlPanel>
      <DashboardHeader text="Сервісні послуги" />
      <SummaryPanel array={services ? filterServices(services) : []} />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {services && (
        <ServiceList
          services={filterServices(services)}
          onDelete={handleDeleteService}
        />
      )}
    </Dashboard>
  );
}
export default Services;
