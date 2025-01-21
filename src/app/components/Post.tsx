import { Card, CardContent, Typography } from "@mui/material";
import { Post } from "@prisma/client";

type Props = {
  post: Post;
};

const PostComponent = ({ post }: Props) => {
  return (
    <Card sx={{ mb: 2, width: "60%", mx: "auto" }}>
      <CardContent>
        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 0 }}>
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostComponent;
