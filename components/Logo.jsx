import { ChefHat } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
        <ChefHat className="h-5 w-5 text-white" />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-orange-600 ml-3 hidden lg:flex ">
        Recipe Book
      </span>
    </Link>
  );
};

export default Logo;
