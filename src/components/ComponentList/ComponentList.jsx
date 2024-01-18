import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

function ComponentList({ components, onEdit, onDelete }) {
  return (
    <Grid container spacing={{ md: 2 }} columns={{ md: 12 }}>
      {components.map((component) => {
        return (
          <Grid item md={1.5} key={component._id}>
            <Card>
              <CardMedia
                component="img"
                alt="component"
                height="130"
                image={component.image}
                sx={{
                  // width: 100,
                  p: 1,
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="p" component="div">
                  {component.mark}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {component.type}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <NavLink to={component.id}>
                  <Button size="small">Детальніше</Button>
                </NavLink>

                <IconButton
                  onClick={() => {
                    onEdit(component);
                  }}
                  aria-label="delete"
                  size="small"
                  sx={{ ml: "auto" }}
                >
                  <ModeEditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    onDelete(component._id);
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

export default ComponentList;
