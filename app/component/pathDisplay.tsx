// app/components/PathDisplay.tsx
"use client";
import { usePathname } from "next/navigation";

export function PathDisplay() {
  const pathname = usePathname();
  return <span >{pathname}</span>;
}
