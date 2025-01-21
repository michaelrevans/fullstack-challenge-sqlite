import { Post, User } from "@prisma/client";

export type EnhancedPost = Omit<Post, "published" | "authorId"> & {
  author: User | null;
  _count: {
    comments: number;
  };
};
