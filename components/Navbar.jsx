"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const navLinkClasses =
    "text-gray-700 hover:text-orange-600 transition-colors dark:text-gray-200";

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-orange-100 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex w-11/12 max-w-7xl items-center justify-between py-3">
        <Logo/>
        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex ">
          <NavLink href="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink href="/recipes" className={navLinkClasses}>
            Recipes
          </NavLink>
          {session?.user && (
            <>
              <NavLink href="/dashboard/addRecipe" className={navLinkClasses}>
                Add Recipe
              </NavLink>
              <NavLink href="/dashboard/myRecipe" className={navLinkClasses}>
                My Recipes
              </NavLink>
            </>
          )}
        </div>
        {/* Right side: theme + auth */}
        <div className="hidden items-center gap-4 md:flex">
          <DarkModeToggle />
          {!session?.user ? (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="rounded bg-orange-500 px-4 py-2 text-white shadow-sm transition hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded border border-orange-500 px-4 py-2 text-orange-600 transition hover:bg-orange-50 dark:hover:bg-gray-800"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={
                  !imgError
                    ? session.user?.image || "/default-avatar.png"
                    : "/default-avatar.png"
                }
                alt="avatar"
                className="h-10 w-10 cursor-pointer rounded-full ring-2 ring-orange-600 dark: ring-o  object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onError={(e) => {
                  setImgError(true);
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-orange-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-3 border-b border-orange-200 px-4 py-3 text-gray-800 dark:border-gray-700 dark:text-gray-200">
                    <img
                      src={session.user?.image || "/default-avatar.png"}
                      alt="avatar-mini"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {session.user.name}
                      </p>
                      {session.user.email && (
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 transition hover:bg-red-50 dark:hover:bg-gray-700"
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
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mx-auto w-11/12 max-w-7xl border-t border-orange-100 bg-white pb-4 dark:border-gray-700 dark:bg-gray-900 md:hidden">
          <div className="mt-2 flex flex-col gap-3 px-4">
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
            {session?.user && (
              <>
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
              </>
            )}
            <div className="my-2">
              <DarkModeToggle />
            </div>
            {!session?.user ? (
              <>
                <button
                  onClick={() => signIn("google")}
                  className="rounded bg-orange-500 px-4 py-2 text-center text-white"
                  // onClick={() => setMobileMenuOpen(false)}
                >
                  Login with Google
                </button>
                <Link
                  href="/login"
                  className="rounded border border-orange-500 px-4 py-2 text-center text-orange-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded border border-orange-500 px-4 py-2 text-center text-orange-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-3 rounded-lg border border-orange-200 p-3 dark:border-gray-700">
                  <img
                    src={
                      !imgError
                        ? session.user?.image || "/default-avatar.png"
                        : "/default-avatar.png"
                    }
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(e) => {
                      setImgError(true);
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />
                  <span className="truncate text-gray-800 dark:text-gray-200">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full rounded py-2 text-red-600 transition hover:bg-red-50 dark:hover:bg-gray-800"
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
