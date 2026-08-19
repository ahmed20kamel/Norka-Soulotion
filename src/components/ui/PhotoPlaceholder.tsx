import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  /** Short label identifying which photo goes here (e.g. "Hero photo"). */
  label?: string;
  className?: string;
}

/**
 * Drop-in stand-in for a real <Image fill /> — every real photo on the site
 * was pulled out and swapped for this so the layout (aspect ratios, rounded
 * corners, overlays) stays exactly as-is while real photography is sourced.
 * Same `absolute inset-0` footprint as the Image it replaces.
 */
export default function PhotoPlaceholder({ label, className }: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800/70 border-2 border-dashed border-gray-300 dark:border-gray-700",
        className
      )}
      role="img"
      aria-label={label ?? "Photo placeholder"}
    >
      <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" aria-hidden="true" />
      {label && (
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 px-4 text-center">
          {label}
        </span>
      )}
    </div>
  );
}
