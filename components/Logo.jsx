import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.png" alt="Picture of brand" width={40} height={40} />
      <span className="text-2xl font-extrabold tracking-tight text-orange-600 ml-3 hidden lg:flex">
        Recipe Book
      </span>
    </Link>
  );
};

export default Logo;
