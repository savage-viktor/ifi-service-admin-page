import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";

import styles from "./ServiceCard.module.css";

import DeleteIcon from "@mui/icons-material/Delete";

function ServiceCard({ service, onDelete }) {
  return (
    <div className={styles.card}>
      <Link className={styles.name} to={service._id}>
        <span>{service.name}</span>
      </Link>
      <span className={styles.page}>{service.page}</span>
      <div className={styles.icon}>
        <IconButton
          onClick={() => {
            onDelete(service._id);
          }}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

export default ServiceCard;

// <Grid item md={1.5} key={service._id}>
//   <Card>
//     <CardContent>
// <NavLink to={service._id}>
//   <Typography gutterBottom variant="p" component="div">
//     {service.name}
//   </Typography>
// </NavLink>

//       <Typography gutterBottom variant="p" component="div">
//         {service.page}
//       </Typography>
//     </CardContent>
// <CardActions disableSpacing>
//   <IconButton
//     onClick={() => {
//       onDelete(service._id);
//     }}
//     aria-label="delete"
//     size="small"
//   >
//     <DeleteIcon fontSize="inherit" />
//   </IconButton>
// </CardActions>
//   </Card>
// </Grid>;
