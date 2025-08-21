// lib/backend.js
import { auth } from "@/auth";

export async function backendFetch(path, init) {
  const session = await auth();
  const headers = new Headers(init?.headers);

  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers,
    // If your backend requires cookies/CORS, configure here as needed
  });

  if (!res.ok) {
    // Optional: handle 401 → refresh flow here if you wire refreshToken
  }

  return res;
}
