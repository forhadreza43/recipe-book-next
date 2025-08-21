"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // First check if user exists
        const checkUser = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const userData = await checkUser.json();

        if (!userData.exists) {
          setError("No user found. Register first or continue with Google");
          toast.error("No user found");
        } else {
          setError("Password is incorrect");
          toast.error("Password is incorrect");
        }
      } else {
        // Success - update router
        router.refresh();
        router.push("/");
        setEmail("");
        setPassword("");
        toast.success("Login successful!");
        router.push("/recipes");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/recipes" });
    } catch (err) {
      setError("Google login failed");
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-orange-300 bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-3xl font-bold text-orange-600">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-0 top-0 mr-2 translate-y-2 p-1 text-sm"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <LuEye size={18} className="text-gray-700" />
              ) : (
                <LuEyeClosed size={18} className="text-gray-700" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-orange-500 py-2 text-white hover:bg-orange-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white py-2 text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-200">
          Don't have an account?{" "}
          <Link href="/register" className="text-orange-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
