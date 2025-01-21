"use client";

import { trpcReact } from "@/trpc/trpcReact";
import { Container, Typography } from "@mui/material";
import Post from "./components/Post";

export default function Home() {
  const { data: posts } = trpcReact.getPosts.useQuery();

  return (
    <main>
      <Typography variant="h4" component={"h1"}>
        Posts
      </Typography>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Container>
    </main>
  );
}
