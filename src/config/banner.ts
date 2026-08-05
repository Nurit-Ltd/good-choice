export interface BannerSlide {
  id: string | number;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface BannerData {
  title: string;
  subtitle: string;
  slides: BannerSlide[];
}

export const bannerData: BannerData = {
  title: "Crafted Luxury for Elevated Living",
  subtitle: "Bespoke furniture designed with premium materials, timeless aesthetics, and precision craftsmanship for refined modern interiors.",
  slides: [
    {
      id: 1,
      image: "/images/home/banner/Img-1.webp",
      alt: "Crafted Luxury sofa living room",
    },
    {
      id: 2,
      image: "/images/home/banner/Img-2.webp",
      alt: "Minimalist wooden sofa living room",
    },
    {
      id: 3,
      image: "/images/home/banner/Img-3.webp",
      alt: "Cozy armchairs living room",
    },
  ],
};
