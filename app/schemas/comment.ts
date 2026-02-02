import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const commentSchema = z.object({
  content: z.string().min(3),
  postId: z.custom<Id<"posts">>(),
});
