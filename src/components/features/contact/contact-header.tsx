import Image from "next/image";
import Link from "next/link";

interface ContactHeaderProps {
  title?: string;
  categoryParent?: string;
}

export function ContactHeader({
  title = "Contact Us",
  categoryParent = "Home",
}: ContactHeaderProps) {
  return (
    <div
      className="relative w-full py-16 sm:py-20 lg:py-24 px-6 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center shadow-lg"
      style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
    >
      {/* Background Logo Watermark Overlay */}
      <div
        className="absolute pointer-events-none select-none z-0"
        style={{
          width: "396px",
          height: "535px",
          right: "0",
          bottom: "-130px",
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
      <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[110%] text-white tracking-wide">
          {title}
        </h1>

        <nav className="flex items-center justify-center gap-2 font-body text-sm text-white/80">
          <Link href="/" className="hover:text-white transition-colors">
            {categoryParent}
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{title}</span>
        </nav>
      </div>
    </div>
  );
}

export default ContactHeader;
