"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: session, status, update } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  console.log("Session data:", session?.user, "Status:", status);

  const navLinkClasses =
    "text-gray-700 hover:text-orange-500 dark:text-gray-200";

  return (
    <nav className="bg-white shadow-md dark:border-b dark:border-b-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex w-11/12 max-w-7xl items-center justify-between py-3">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          Recipe Book
        </Link>

        <div className="hidden items-center gap-6 md:flex ">
          <Link href="/" className={navLinkClasses}>
            Home
          </Link>
          <Link href="/recipes" className={navLinkClasses}>
            All Recipes
          </Link>
          {session && session.user && (
            <>
              <Link href="/dashboard/addRecipe" className={navLinkClasses}>
                Add Recipe
              </Link>
              <Link href="/dashboard/myRecipe" className={navLinkClasses}>
                My Recipes
              </Link>
            </>
          )}
        </div>
        <DarkModeToggle />
        {/* User Auth */}
        <div className="hidden md:block">
          {!session ? (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded border border-orange-500 px-4 py-2 text-orange-500 hover:bg-orange-50"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <img
                src={
                  !imgError
                    ? session.user?.image || "/default-avatar.png"
                    : "/default-avatar.png"
                }
                alt="avatar"
                className="h-10 w-10 cursor-pointer rounded-full border-2 border-orange-500 object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onError={(e) => {
                  console.log("Image load error:", e);
                  setImgError(true);
                  e.target.src = "/default-avatar.png";
                }}
              />
              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded border border-orange-200 bg-white shadow-lg">
                  <div className="border-b border-b-orange-200 px-4 py-2 text-gray-800">
                    {session.user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mx-auto w-11/12 max-w-7xl border-t border-orange-100 bg-white px-4 pb-4 md:hidden">
          <div className="mt-2 flex flex-col gap-3">
            <Link
              href="/"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              All Recipes
            </Link>
            <Link
              href="/dashboard/addRecipe"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Recipe
            </Link>
            <Link
              href="/dashboard/myRecipe"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Recipes
            </Link>
            {!session ? (
              <>
                <button
                  onClick={() => signIn("google")}
                  className="rounded bg-orange-500 px-4 py-2 text-center text-white"
                  // onClick={() => setMobileMenuOpen(false)}
                >
                  Login with Google
                </button>
                <button
                  onClick={() => signIn()}
                  className="rounded border border-orange-500 px-4 py-2 text-center text-orange-500"
                  // onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={
                      !imgError
                        ? session.user?.image || "/default-avatar.png"
                        : "/default-avatar.png"
                    }
                    alt="avatar"
                    className="h-8 w-8 rounded-full border border-orange-500 object-cover"
                    onError={(e) => {
                      console.log("Image load error:", e);
                      setImgError(true);
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                  <span className="text-gray-800">{session.user.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full rounded py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
