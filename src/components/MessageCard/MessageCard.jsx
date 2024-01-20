import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

function MessageCard({ message, onDelete }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="p">
          {message.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="p">
          {message.phone}
        </Typography>
        <Typography gutterBottom variant="h6" component="p">
          {message.email}
        </Typography>
        <Typography gutterBottom variant="h7" component="p">
          {message.date}
        </Typography>
        <Typography gutterBottom variant="h6" component="p">
          {message.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => {
            onDelete(message._id);
          }}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default MessageCard;
