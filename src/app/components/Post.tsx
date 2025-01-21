import dynamic from "next/dynamic";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
// #Performance tree-shaking the material ui components
import CommentIcon from "@mui/icons-material/Comment";

import { EnhancedPost } from "@/types";

import AddComment from "./AddComment";

type Props = {
  post: EnhancedPost;
};

// use dynamic import to remove the component from the initial JS bundle

// #SSR this makes Comments a strictly client component, no SSR whatsoever
const Comments = dynamic(() => import("./Comments"), {
  ssr: false,
});

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
            <Button
              onClick={handleToggleComments}
              size="small"
              sx={{ mt: 1 }}
              startIcon={<CommentIcon />}
            >
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
