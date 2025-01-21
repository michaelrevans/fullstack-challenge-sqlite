import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Comments from "./Comments";
import { EnhancedPost } from "@/types";
import AddComment from "./AddComment";

type Props = {
  post: EnhancedPost;
};

const Post = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments((areCommentsShown) => !areCommentsShown);
  };

  const commentCount = post._count.comments;

  return (
    <Card sx={{ mb: 2, width: "60%", mx: "auto" }}>
      <CardContent>
        {post.author && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Posted by {post.author.name}
          </Typography>
        )}

        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 0 }}>
          {post.content}
        </Typography>

        {commentCount > 0 && (
          <Box>
            <Button onClick={handleToggleComments} size="small" sx={{ mt: 1 }}>
              {commentCount} comments
            </Button>

            {/* looks like duplication here with `in` and the conditional logic below */}
            {/* but it's required to not fetch the comments for every post that is loaded */}
            <Collapse in={showComments}>
              {showComments && <Comments postId={post.id} />}
            </Collapse>
          </Box>
        )}
        <AddComment postId={post.id} />
      </CardContent>
    </Card>
  );
};

export default Post;
