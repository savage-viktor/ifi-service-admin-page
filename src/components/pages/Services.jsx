import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";

import { GetServices } from "../../services/ServicesAPI";

import { SubmitService, DeleteService } from "../../services/ServicesAPI";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FindInput from "../FindInput/FindInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

const initService = {
  page: "",
  name: "",
};

function Services() {
  const [status, setStatus] = useState("idle");
  const [services, setServices] = useState(false);
  const [update, setUpdate] = useState(1);

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

  const handleSubmit = async (values) => {
    await SubmitService(values);

    setUpdate((prevState) => prevState + 1);
  };

  const handleDeleteService = async (id) => {
    await DeleteService(id);
    setUpdate((prevState) => prevState + 1);
  };

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
        </Paper>
      </Grid>
      <div>
        Сервісні послуги
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        <Grid container spacing={{ md: 2 }} columns={{ md: 12 }}>
          {services &&
            services
              .sort((firstService, secondService) =>
                firstService.name.localeCompare(secondService.name)
              )
              .map((service) => {
                return (
                  <Grid item md={1.5} key={service._id}>
                    <Card>
                      <CardContent>
                        <NavLink to={service._id}>
                          <Typography gutterBottom variant="p" component="div">
                            {service.name}
                          </Typography>
                        </NavLink>

                        <Typography gutterBottom variant="p" component="div">
                          {service.page}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton
                          onClick={() => {
                            handleDeleteService(service._id);
                          }}
                          aria-label="delete"
                          size="small"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>

                  // <div key={service._id}>
                  //   {service.name} {service.page}{" "}
                  //   <button
                  //     onClick={() => {
                  //       handleDeleteService(service._id);
                  //     }}
                  //     type="button"
                  //   >
                  //     Видал
                  //   </button>
                  // </div>
                );
              })}
        </Grid>
      </div>
    </>
  );
}
export default Services;
