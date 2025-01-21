import { trpcReact } from "@/trpc/trpcReact";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
// #Performance tree-shaking the material ui components

type Props = {
  postId: number;
};

const Comments = ({ postId }: Props) => {
  const { data: comments } = trpcReact.getComments.useQuery({
    postId,
  });

  if (!comments) return null;

  return (
    <List>
      {comments?.map((comment) => (
        <ListItem key={comment.id}>
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              mb: 1,
              backgroundColor: "grey.50",
            }}
          >
            <Typography variant="body2"></Typography>
            <ListItemText primary={comment.content} />
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default Comments;
