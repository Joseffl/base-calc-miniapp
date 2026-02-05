"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { sdk, type Context } from "@farcaster/miniapp-sdk";

interface MiniKitContextType {
  isReady: boolean;
  context: Context.MiniAppContext | null;
  isInMiniApp: boolean;
}

const MiniKitContext = createContext<MiniKitContextType>({
  isReady: false,
  context: null,
  isInMiniApp: false,
});

export function useMiniKit() {
  return useContext(MiniKitContext);
}

export function MiniKitProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [context, setContext] = useState<Context.MiniAppContext | null>(null);
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Check if we're in a mini app environment
        const inMiniApp = await sdk.isInMiniApp();
        setIsInMiniApp(inMiniApp);

        if (inMiniApp) {
          // Get context
          const ctx = await sdk.context;
          setContext(ctx);

          // Signal that the app is ready
          await sdk.actions.ready();
        }
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize MiniKit:", error);
        setIsReady(true);
      }
    };

    init();
  }, []);

  return (
    <MiniKitContext.Provider value={{ isReady, context, isInMiniApp }}>
      {children}
    </MiniKitContext.Provider>
  );
}
