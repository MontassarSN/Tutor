"use client";

import useCurrentUser from "@/queries/useCurrentUser";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "@/api/auth/signOut";
import { useRouter } from "next/navigation";

export function DropdownMenuDemo() {
  const router = useRouter();
  const { data: user, isLoading, error } = useCurrentUser();

  const signOutMutation = useMutation({
    mutationFn: async () => SignOut(),
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleSignout = () => {
    signOutMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative h-[3rem] w-[3rem] cursor-pointer">
          <Image
            src={user?.pic || "/noAvatar.jpg"}
            fill
            alt="User Avatar"
            className="rounded-full border-2"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/account_settings" >
          <DropdownMenuItem asChild>
            <a>
              <span>Profile</span>
            </a>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <span>{user?.username}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignout}>
          <span className="text-customText">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
