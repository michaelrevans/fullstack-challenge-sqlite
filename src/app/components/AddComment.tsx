import { ChangeEvent, FormEvent, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { trpcReact } from "@/trpc/trpcReact";

type Props = {
  postId: number;
};

const AddComment = ({ postId }: Props) => {
  const [newComment, setNewComment] = useState("");
  const { mutate, isLoading } = trpcReact.addComment.useMutation({
    onSuccess() {
      setNewComment("");
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
      >
        {isLoading ? <CircularProgress size={27} /> : "Add"}
      </Button>
    </Box>
  );
};

export default AddComment;
