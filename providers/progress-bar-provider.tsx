"use client";
import { useProgress } from "@/hooks/use-progress";
import { AnimatePresence, useMotionTemplate, motion } from "framer-motion";
import { createContext, ReactNode, useContext } from "react";

const ProgressBarContext = createContext<ReturnType<typeof useProgress> | null>(
  null
);

export function ProgressBarProvider({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  let progress = useProgress();
  let width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>

      {children}
    </ProgressBarContext.Provider>
  );
}

export function useProgressBar() {
  let progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}
