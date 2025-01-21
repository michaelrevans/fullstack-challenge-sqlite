import { prismaClient } from "../../prisma/prismaClient";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

const t = initTRPC.create({
  transformer: superjson,
});

export const trpcRouter = t.router({
  getPosts: t.procedure
    .input(z.object({ cursor: z.number().nullish() }))
    .query(async ({ input }) => {
      const cursor = input.cursor;
      const limit = 20;

      const posts = await prismaClient.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          author: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: 0,
        orderBy: { id: "asc" },
        where: {
          published: true,
        },
      });

      // add some provision for exhausting posts in DB
      const nextCursor = posts.pop()?.id;

      return {
        posts,
        nextCursor,
      };
    }),
  getComments: t.procedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      return await prismaClient.comment.findMany({
        where: { postId: input.postId },
      });
    }),
  addComment: t.procedure
    .input(z.object({ content: z.string(), postId: z.number() }))
    .mutation(async ({ input }) => {
      return await prismaClient.comment.create({ data: input });
    }),
});

export type TrpcRouter = typeof trpcRouter;
