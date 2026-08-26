import Image from "next/image";
import Link from "next/link";

interface GalleryHeaderProps {
  title?: string;
  subtitle?: string;
}

export function GalleryHeader({ title = "Our Project Gallery" }: GalleryHeaderProps) {
  return (
    <div
      className="relative w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-xl border border-primary-900/40"
      style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
    >
      {/* Background Logo Watermark Overlay */}
      <div
        className="absolute pointer-events-none select-none z-0 opacity-75"
        style={{
          width: "360px",
          height: "480px",
          right: "-30px",
          bottom: "-140px",
        }}
      >
        <Image src="/icons/logo-watermark.svg" alt="Good Choice Logo Watermark" fill className="object-contain" priority />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 space-y-3 max-w-3xl mx-auto w-full px-2">
        <h1 className="font-heading text-2xl sm:text-4xl lg:text-[50px] font-bold leading-[120%] text-white tracking-tight line-clamp-2 max-w-2xl mx-auto">{title}</h1>

        {/* Subtitle Single/Double Line */}
        {/*     <p className="font-body text-xs sm:text-sm lg:text-base text-white/80 max-w-xl mx-auto line-clamp-2">
          {subtitle}
        </p>
 */}
        {/* Breadcrumb Single Line */}
        <nav className="flex items-center justify-center gap-1.5 sm:gap-2 font-body text-[11px] sm:text-sm text-white/80 pt-2 max-w-full overflow-hidden whitespace-nowrap">
          <Link href="/" className="hover:text-white transition-colors shrink-0">
            Home
          </Link>
          <span className="shrink-0 text-white/60">/</span>
          <span className="text-white font-medium shrink-0">Gallery</span>
        </nav>
      </div>
    </div>
  );
}

export default GalleryHeader;
