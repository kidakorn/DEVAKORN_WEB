"use client";

import { ReactNode } from "react";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  // Reverted back to normal browser scrolling
  return <>{children}</>;
}
