import { ChangeEvent, FormEvent, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { trpcReact } from "@/trpc/trpcReact";

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

      utils.getPosts.setData(undefined, (posts) => {
        if (!posts) return undefined;

        return [...posts!].map((post) => {
          if (post.id !== postId) return post;

          const newCommentCount = (post!._count!.comments ?? 0) + 1;
          return {
            ...post,
            _count: {
              ...post!._count,
              comments: newCommentCount,
            },
          };
        });
      });
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
