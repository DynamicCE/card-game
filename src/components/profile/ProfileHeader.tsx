
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarFallback className="text-4xl">
          <User />
        </AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold">Misafir Kullanıcı</h2>
    </div>
  );
};
