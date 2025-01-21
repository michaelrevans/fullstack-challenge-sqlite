import { ChangeEvent, FormEvent, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { trpcReact } from "@/trpc/trpcReact";
import SendIcon from '@mui/icons-material/Send';

type Props = {
  postId: number;
};

const AddComment = ({ postId }: Props) => {
  const utils = trpcReact.useUtils();

  const [newComment, setNewComment] = useState("");
  const { mutate, isLoading } = trpcReact.addComment.useMutation({
    onSuccess(data) {
      setNewComment("");

      utils.getComments.setData({ postId }, (existingComments) => {
        if (!existingComments) return undefined;

        return [...existingComments, data];
      });

      // I removed the update to the post data after introducing useInfiniteQuery
      // since it changed the shape of the data and introduced a complication
      // with the cursor.
      // This breaks the functionality that incremenets the comment count when
      // a new comment is added, but of course I would add this back in
      // given some more time to figure it out.
    },
  });

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      content: newComment,
      postId,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 2,
        display: "flex",
        gap: 1,
        alignItems: "start",
      }}
    >
      <TextField
        size="small"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
        variant="outlined"
        sx={{ flex: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!newComment.trim()}
        endIcon={isLoading ? null : <SendIcon />}
      >
        {isLoading ? <CircularProgress size={27} /> : "Add"}
      </Button>
    </Box>
  );
};

export default AddComment;
