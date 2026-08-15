import { cn } from "@/lib/utils";

// Branded initials avatar — replaces stock/placeholder headshots for
// testimonials and team members. Deliberately not another fake photo: a
// clearly-a-monogram avatar is more honest than a stock photo standing in
// for a real person, and needs no image asset at all.
const PALETTE = [
  ["#3B62FC", "#6384FF"],
  ["#7C5CFC", "#3B62FC"],
  ["#22D3EE", "#3B62FC"],
  ["#2848D8", "#7C5CFC"],
] as const;

function hashName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h;
}

// Strips common English/Arabic honorifics ("Eng.", "Dr.", "م.", "د.", ...)
// so e.g. "Eng. Nourhan" reads as "N", not "EN".
const TITLE_RE = /^(eng\.?|dr\.?|mr\.?|mrs\.?|ms\.?|prof\.?|م\.?|د\.?|أ\.?)$/i;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter((p) => p && !TITLE_RE.test(p));
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface MonogramAvatarProps {
  name: string;
  className?: string;
}

export default function MonogramAvatar({ name, className }: MonogramAvatarProps) {
  const [from, to] = PALETTE[hashName(name) % PALETTE.length];
  return (
    <div
      className={cn("flex items-center justify-center font-black text-white select-none", className)}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role="img"
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}
