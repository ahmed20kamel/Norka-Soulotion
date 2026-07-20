import Image from "next/image";
import { images } from "@/lib/images.config";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background dark:bg-background-dark">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-accent/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
        <div className="absolute inset-[9px] rounded-full overflow-hidden bg-white shadow-sm">
          <Image src={images.brand.logo.src} alt="Norka Solution" fill className="object-contain p-1.5" />
        </div>
      </div>
      <div className="skeleton w-40 h-2 rounded-full" aria-hidden="true" />
    </div>
  );
}
