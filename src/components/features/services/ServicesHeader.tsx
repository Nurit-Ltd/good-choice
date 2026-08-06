import Image from "next/image";
import Link from "next/link";

interface ServicesHeaderProps {
  title?: string;
  subtitle?: string;
  categoryParent?: string;
  currentSlug?: string;
}

export function ServicesHeader({
  title = "Our Craftsmanship & Services",
  subtitle = "Bespoke woodworking, 3D interior spatial architecture, fine upholstery, and heirloom restoration care.",
  categoryParent = "Home",
  currentSlug,
}: ServicesHeaderProps) {
  return (
    <div
      className="relative w-full py-16 sm:py-20 lg:py-24 px-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-xl border border-primary-900/40"
      style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
    >
      {/* Background Logo Watermark Overlay */}
      <div
        className="absolute pointer-events-none select-none z-0 opacity-80"
        style={{
          width: "396px",
          height: "535px",
          right: "-30px",
          bottom: "-140px",
        }}
      >
        <Image
          src="/icons/logo-watermark.svg"
          alt="Good Choice Logo Watermark"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md border border-white/20">
          ✨ Good Choice Bespoke Services
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[115%] text-white tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="font-body text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        <nav className="flex items-center justify-center gap-2 font-body text-xs sm:text-sm text-white/80 pt-2">
          <Link href="/" className="hover:text-white transition-colors">
            {categoryParent}
          </Link>
          <span>/</span>
          {currentSlug ? (
            <>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{title}</span>
            </>
          ) : (
            <span className="text-white font-medium">Services</span>
          )}
        </nav>
      </div>
    </div>
  );
}

export default ServicesHeader;
