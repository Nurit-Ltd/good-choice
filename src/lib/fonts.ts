import localFont from "next/font/local";

export const fontHeading = localFont({
  src: "../../public/fonts/legquinne/Legquinne-Regular.otf",
  variable: "--font-heading",
  display: "swap",
});

export const fontBody = localFont({
  src: [
    {
      path: "../../public/fonts/gotham/Gotham-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/gotham/Gotham-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gotham/Gotham-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/gotham/Gotham-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/gotham/Gotham-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
