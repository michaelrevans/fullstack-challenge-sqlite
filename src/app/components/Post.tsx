import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import { Post, User } from "@prisma/client";
import { useState } from "react";
import Comments from "./Comments";

type Props = {
  post: Omit<Post, "published" | "authorId"> & {
    author: User | null;
    _count: {
      comments: number;
    };
  };
};

const PostComponent = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments((areCommentsShown) => !areCommentsShown);
  };

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

        {post._count.comments > 0 && (
          <Box>
            <Button onClick={handleToggleComments} size="small" sx={{ mt: 1 }}>
              {post._count.comments} comments
            </Button>

            <Collapse in={showComments}>
              <Comments postId={post.id} />
            </Collapse>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PostComponent;
