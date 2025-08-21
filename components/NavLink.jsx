import Link from "next/link";
import React from "react";

const NavLink = ({ to, children }) => {
  return (
    <Link href={to}>
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;
