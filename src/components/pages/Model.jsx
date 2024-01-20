import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import {
  Button,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GetModel } from "../../services/ModelsAPI";

function Model() {
  const [status, setStatus] = useState("idle");
  const [model, setModel] = useState(false);

  const { modelId } = useParams();

  useEffect(() => {
    setStatus("loading");
    GetModel(modelId)
      .then((model) => {
        setModel(model);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [modelId]);

  console.log(model);

  return (
    <>
      {model && (
        <Grid
          container
          spacing={2}
          backgroundColor="#fff"
          // display="flex"
          // justifyContent="center"
          // alignItems="center"
        >
          <Grid xs={12}>
            <Typography variant="h4" display="flex" justifyContent="center">
              {model.model}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography
              variant="h5"
              display="flex"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              Характеристики
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Тип пристрою
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.type}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Тип SIM карти
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.typeOfSim}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Розмір, мм
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.size}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Акумулятор
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.battery}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Підтримка частот 4G
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.bands}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Антенний роз'єм
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.antena}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Wi-Fi
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    {model.details.wifi}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      borderBottom: "none",
                    }}
                  >
                    Тип мобільної мережі
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      borderLeft: "1px solid rgba(224, 224, 224, 1)",
                      borderBottom: "none",
                    }}
                  >
                    {model.details.mobileNetwork}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid xs={6}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="400"
              image={model.image.slice(1, model.image.length)}
              sx={{
                // width: 100,
                p: 4,
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h5"
              display="flex"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              Список послуг
            </Typography>
            <Button color="primary" variant="outlined">
              Прирівм
            </Button>
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h5"
              display="flex"
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              Компоненти
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
export default Model;
