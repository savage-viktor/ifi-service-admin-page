import { Grid } from "@mui/material";
import MessageCard from "../MessageCard/MessageCard";

function MassageList({ messages, onDelete }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {messages.map((message) => {
        return (
          <Grid item xs={2} sm={4} md={3} key={message._id}>
            <MessageCard message={message} onDelete={onDelete} />
          </Grid>
        );
      })}
    </Grid>
  );
}
export default MassageList;
