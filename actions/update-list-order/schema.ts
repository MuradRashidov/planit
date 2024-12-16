import { z } from "zod";

export const UpdateListOrder = z.object({
    items: z.array(z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
      //boardId: z.string().optional(),
    //   cards: z.array(z.object({
    //     id: z.string(),
    //     title: z.string(),
    //     order: z.number(),
    //     createdAt: z.date(),
    //     updatedAt: z.date(),
    //     description: z.string(),
    //     listId: z.string(),
    //   })).optional(),
    })),
    boardId: z.string(),
  });
  