"use client";

import { Calculator } from "@/components/Calculator";
import { useMiniKit } from "@/providers/MiniKitProvider";

export default function Home() {
  const { isReady, context, isInMiniApp } = useMiniKit();

  if (!isReady) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4 safe-area-inset">
      {isInMiniApp && context?.user && (
        <div className="mb-4 text-zinc-400 text-sm">
          Welcome, {context.user.displayName || context.user.username || "User"}!
        </div>
      )}
      <Calculator />
      {!isInMiniApp && (
        <p className="mt-6 text-zinc-500 text-sm text-center max-w-sm">
          Open this app in Base to get the full experience
        </p>
      )}
    </main>
  );
}
