"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children, className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeClasses = isActive
    ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
    : "text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400";

  return (
    <Link
      href={href}
      className={`transition-colors duration-200 ${activeClasses} ${className}`}
    >
      <span className="pb-1">{children}</span>
    </Link>
  );
};

export default NavLink;
