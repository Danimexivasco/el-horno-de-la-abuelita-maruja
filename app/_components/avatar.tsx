import { User as FirebaseUser } from "firebase/auth";
import { LogoIcon } from "../_icons";
import { combine } from "../_utils/combineClassnames";
import Image from "next/image";
import { User } from "@/types";

type AvatarProps = {
  user: User | FirebaseUser
  className?: string
};

export default function Avatar({ user, className }: AvatarProps) {

  if (user.photoURL) return (
    <Image
      src={user.photoURL}
      alt="Avatar"
      width={48}
      height={48}
      className="w-10 h-10 lg:min-w-14 lg:w-14 lg:h-14 object-cover rounded-full shadow-md"
    />
  );

  return (
    <div className={combine("w-10 h-10 lg:w-14 lg:h-14 p-1.5 lg:p-2 flex grid place-items-center bg-cake-300 rounded-full shadow-md", className && className)}>
      <LogoIcon className="w-4/5 h-auto"/>
    </div>
  );
}