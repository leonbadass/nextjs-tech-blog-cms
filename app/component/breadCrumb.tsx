// app/components/Breadcrumb.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // remove empty segments

  // Build cumulative paths for each segment
  const crumbs = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = decodeURIComponent(segment.replace(/-/g, " ")); // nicer label
    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="text-xl  p-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-[#00ffc6] hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, idx) => (
          <li key={crumb.href} className="flex items-center space-x-2 ">
            <span className="text-[#00ffc6] ">/</span>
            {idx === crumbs.length - 1 ? (
              <span className="font-medium text-[#ff6b35]">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[#00ffc6] hover:underline"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
