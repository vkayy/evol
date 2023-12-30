import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface UserAvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
}

export const UserAvatar = ({
  src,
  className,
}: UserAvatarProps) => {
  return (
    <Avatar className={cn(
      "h-7 w-7 md:h-10 md:w-10",
      className
    )}>
      <AvatarImage src={src} />
      <AvatarFallback className="text-4xl text-stone-300"><User className="h-10 w-10" /></AvatarFallback>
    </Avatar>
  )
}