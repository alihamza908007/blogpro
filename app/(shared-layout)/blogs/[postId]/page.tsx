import { buttonVariants } from "@/components/ui/button";
import { CommentSection } from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostIdRouteProps {
  params: Promise<{
    postId: Id<"posts">;
  }>;
}
export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { Id: postId });
  const PreLoadedComments = await preloadQuery(
    api.comments.getCommentsByPostId,
    {
      postId: postId,
    },
  );

  if (!post) {
    return (
      <h1 className="text-6xl font-extrabold text-red-500 py-20">
        Post not found
      </h1>
    );
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
        href="/blogs"
      >
        <ArrowLeft className="size-4" />
        Back to blogs
      </Link>
      <div className="relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1530039468321-c3a6c1b53a93?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Posted on :{new Date(post._creationTime).toLocaleDateString("en-US")}
        </p>
        <Separator className="my-8" />
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {post.content}
        </p>
        <Separator className="my-8 " />
        <CommentSection preLoadedComments={PreLoadedComments} />
      </div>
    </div>
  );
}
