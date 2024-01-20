import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link, NavLink } from "react-router-dom";

function ModelsList({ models, onEdit, onDelete }) {
  const sortedModels = models.sort((firstModel, secondModel) =>
    firstModel.model.localeCompare(secondModel.model)
  );

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {sortedModels.map((model) => {
        return (
          <Grid item xs={2} sm={4} md={3} key={model._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="router"
                height="180"
                image={model.image}
                sx={{
                  // width: 100,
                  p: 4,
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {model.model}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <NavLink to={model._id}>
                  <Button size="small">Детальніше</Button>
                </NavLink>

                <IconButton
                  onClick={() => {
                    onEdit(model);
                  }}
                  aria-label="delete"
                  size="small"
                  sx={{ ml: "auto" }}
                >
                  <ModeEditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    onDelete(model._id);
                  }}
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ModelsList;
