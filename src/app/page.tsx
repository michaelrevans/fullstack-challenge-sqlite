"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { trpcReact } from "@/trpc/trpcReact";

import Post from "./components/Post";

// SSR: Complete SSR is not possible due to a stateful child component, but Next will pre-render as much as possible on the server in any case
// The browser then hydrates the components once loaded using the server-side rendered file and the remaining client-side JavaScript
// If SSR were possible, we could remove the "use client" directive at the top of the file and the whole page would be pre-rendered at run-time

// SSG: Next generates a static HTML file for the page (excluding dynamic components) at build-time
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
