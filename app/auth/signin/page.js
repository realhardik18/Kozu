'use client'
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Updated import

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white selection:bg-blue-500/30 selection:text-white">
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/50 relative group">
          <div className="relative">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
              <p className="text-zinc-400">Sign in to continue to Kozu</p>
            </div>

            <div className="relative group">
              <button
                onClick={handleSignIn}
                className="relative w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg flex items-center justify-center gap-3 transition duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chrome"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

