"use server";

import z from "zod";
import { blogSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(values: z.infer<typeof blogSchema>) {
  try {
    const parsed = blogSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }
    const token = await getToken();

    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token },
    );
    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });
    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image",
      };
    }
    const { storageId } = await uploadResult.json();
    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        imageStorageId: storageId,
      },
      { token },
    );
  } catch {
    return {
      error: "Failed to create post",
    };
  }

  return redirect("/blogs");
}
