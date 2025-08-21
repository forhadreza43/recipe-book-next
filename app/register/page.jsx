"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // // Client-side password validation
    // const hasUppercase = /[A-Z]/.test(password);
    // const hasLowercase = /[a-z]/.test(password);
    // const isLongEnough = password.length >= 6;

    // if (!hasUppercase || !hasLowercase || !isLongEnough) {
    //   setError(
    //     "Password must be at least 6 characters long and include both uppercase and lowercase letters."
    //   );
    //   return;
    // }

    try {
      // Step 1: Register user in backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            photoURL,
          }),
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Registration failed");
      }

      const data = await res.json();
      console.log("Registration successful:", data);

      // Step 2: Automatically sign in with credentials
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-orange-300 bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-3xl font-bold text-orange-600">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input
            type="url"
            placeholder="Photo URL"
            className="input-field"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded bg-orange-500 py-2 text-white hover:bg-orange-600"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-200">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
