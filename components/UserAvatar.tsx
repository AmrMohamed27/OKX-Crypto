"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { dropdownLinks } from "@/constants";

const UserAvatar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    session?.user?.image !== null && (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg bg-white dark:bg-background-gray  border-2 border-theme-gray/20 mt-2 mr-8 z-[60] group">
            {dropdownLinks.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="hover:bg-theme-blue dark:hover:bg-hover-gray"
              >
                <div
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    router.push(item.link);
                  }}
                  className="flex flex-row gap-2 px-2 py-4 cursor-pointer"
                >
                  <div className="flex items-start justify-start">
                    <item.iconComponent.type className="text-xl mt-1" />
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-theme-gray">
                      {item.description}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  );
};

export default UserAvatar;