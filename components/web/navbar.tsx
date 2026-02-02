"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Blog<span className="text-blue-500">Pro</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blogs">
            Blogs
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/createblog"
          >
            Create Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/about">
            About
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("You have been logged out");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.messsage);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/auth/register"
            >
              Register
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
