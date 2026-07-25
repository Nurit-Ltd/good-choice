export interface BannerSlide {
  id: number;
  image: string;
  alt: string;
}

export interface BannerData {
  title: string;
  subtitle: string;
  slides: BannerSlide[];
}

export const bannerData: BannerData = {
  title: "Crafted Luxury for Elevated Living",
  subtitle:
    "Bespoke furniture designed with premium materials, timeless aesthetics, and precision craftsmanship for refined modern interiors.",
  slides: [
    {
      id: 1,
      image: "/images/home/banner/slide-1.jpg",
      alt: "Crafted Luxury sofa living room",
    },
    {
      id: 2,
      image: "/images/home/banner/slide-2.png",
      alt: "Minimalist wooden sofa living room",
    },
    {
      id: 3,
      image: "/images/home/banner/slide-3.png",
      alt: "Cozy armchairs living room",
    },
  ],
};
