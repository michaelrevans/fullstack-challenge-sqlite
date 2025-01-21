import { prismaClient } from "../../prisma/prismaClient";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

const t = initTRPC.create({
  transformer: superjson,
});

export const trpcRouter = t.router({
  getPosts: t.procedure.query(async ({ ctx, input }) => {
    return await prismaClient.post.findMany({
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
      take: 100,
      where: {
        published: true,
      },
    });
  }),
  getComments: t.procedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      return await prismaClient.comment.findMany({
        where: { postId: input.postId },
      });
    }),
});

export type TrpcRouter = typeof trpcRouter;
