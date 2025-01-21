"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { trpcReact } from "@/trpc/trpcReact";

import Post from "./components/Post";

export default function Home() {
  const { data, fetchNextPage, isLoading } =
    trpcReact.getPosts.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const posts = data?.pages?.flatMap((page) => page.posts) ?? [];

  return (
    <main>
      <Typography variant="h4" component={"h1"}>
        Posts
      </Typography>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {/* replace with IntersectionObserver for infinite scroll functionality */}
        {!isLoading && posts?.length && posts?.length > 0 && (
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => fetchNextPage()}
              variant="contained"
              size="medium"
              sx={{ mx: "auto" }}
            >
              Load more
            </Button>
          </Container>
        )}
      </Container>
    </main>
  );
}
