import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";

import { GetServices } from "../../services/ServicesAPI";

import { SubmitService, DeleteService } from "../../services/ServicesAPI";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Button, Grid, Paper, TextField } from "@mui/material";
import FindInput from "../FindInput/FindInput";

const initService = {
  page: "",
  label: "",
  isPage: false,
};

function Services() {
  const [status, setStatus] = useState("idle");
  const [services, setServices] = useState(false);

  useEffect(() => {
    setStatus("loading");
    GetServices()
      .then((result) => {
        setServices(result);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
    // SubmitService(values);
  };

  const handleDeleteService = async (id) => {
    DeleteService(id);
  };

  // const handleEditService = service => {
  //   setEditService(service);
  // };

  return (
    <>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            // height: 100,
          }}
        >
          <FindInput onChange="" />
          <Formik
            // validationSchema="erg"
            initialValues={initService}
            onSubmit={handleSubmit}
          >
            <Form autoComplete="off">
              <Field
                // component={TextField}
                name="label"
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
        </Paper>
      </Grid>
      <div>
        Сервісні послуги
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {services &&
          services
            .sort((firstService, secondService) =>
              firstService.label.localeCompare(secondService.label)
            )
            .map((service) => {
              return (
                <div>
                  {service.label} {service.page}{" "}
                  {/* <button
                  onClick={() => {
                    handleEditService(service);
                  }}
                  type="button"
                >
                  Ред
                </button> */}
                  <button
                    onClick={() => {
                      handleDeleteService(service.id);
                    }}
                    type="button"
                  >
                    Видал
                  </button>
                </div>
              );
            })}
      </div>
    </>
  );
}
export default Services;
