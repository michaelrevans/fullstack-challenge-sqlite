import { trpcReact } from "@/trpc/trpcReact";
import { List, ListItem, Paper, Typography, ListItemText } from "@mui/material";

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
