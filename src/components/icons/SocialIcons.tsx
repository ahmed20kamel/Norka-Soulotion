// lucide-react doesn't ship a TikTok mark — hand-rolled to match its 24x24
// viewBox convention so it sizes identically alongside the lucide icons
// used for the other social links.
export const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.5 0h-3.3v15.5c0 1.65-1.32 3-2.95 3s-2.95-1.35-2.95-3 1.32-3 2.95-3c.3 0 .58.05.85.13V9.28a6.2 6.2 0 0 0-.85-.06C6.6 9.22 4 11.86 4 15.5S6.6 21.78 10.25 21.78s6.25-2.64 6.25-6.28V8.4a8.6 8.6 0 0 0 4.5 1.28V6.35a5.3 5.3 0 0 1-2.9-1.14A5.4 5.4 0 0 1 16.5 0Z" />
  </svg>
);
