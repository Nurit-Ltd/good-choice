import { SVGProps } from "react";

export const CustomArrowRight = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} className={className} xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
      <path d="M9 0L17 10L9 20C9.88889 18.3333 11.6667 14 11.6667 10C11.6667 6 9.88889 1.66667 9 0Z" fill="currentColor" />
      <path d="M0 10L12 10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};

export const CustomArrowLeft = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} className={className} xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
      <path d="M5 10L17 10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 0L0 10L8 20C7.11111 18.3333 5.33333 14 5.33333 10C5.33333 6 7.11111 1.66667 8 0Z" fill="currentColor" />
    </svg>
  );
};
