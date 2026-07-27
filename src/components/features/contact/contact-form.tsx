"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Contact form submitted:", data);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="w-full py-16 sm:py-24 overflow-hidden">
      <div className="container">
        <div className="relative w-full min-h-0 lg:min-h-205 flex flex-col lg:block">
          {/* Left Visual Column: Showroom Image & "Get In Touch !" Heading */}
          <div className="w-full lg:w-[65%] xl:w-[70%] max-w-230 flex flex-col items-start">
            {/* Showroom Image */}
            <div className="relative w-full h-80 sm:h-115 lg:h-130 rounded-lg overflow-hidden shadow-md bg-secondary-100">
              <Image
                src="/images/contact/contact.png"
                alt="Good Choice Furniture Showroom"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Heading: Legquinne, 96px, line-height 110%, letter-spacing -0.96px, Grey-500 (#7C7C7C) */}
            <h2
              className="font-heading text-4xl sm:text-6xl lg:text-[80px] xl:text-[96px] font-normal leading-[110%] tracking-[-0.96px] text-grey-500 mt-8 sm:mt-12"
              style={{ color: "var(--color-grey-500, #7C7C7C)" }}
            >
              Get In Touch !
            </h2>
          </div>

          {/* Right Overlapping Maroon Form Card (Width 808px, Padding 96px, Gap 48px, #62103A bg, 8px rounded) */}
          <div className="w-full lg:w-140 xl:w-202 lg:absolute lg:right-0 lg:top-22.5 xl:top-15 bg-primary-950 rounded-lg p-6 sm:p-12 lg:p-16 xl:p-24 shadow-2xl z-20 mt-8 lg:mt-0">
            {isSuccess && (
              <div className="mb-6 p-4 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-sm font-body text-center">
                Thank you! Your message has been sent successfully. We will contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 xl:gap-12">
              {/* Field 1: Your Name */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs sm:text-sm text-white/90 font-normal">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder=""
                  {...register("name", { required: "Please enter your name" })}
                  className="w-full h-12 sm:h-14 px-4 rounded-md bg-transparent border border-white/20 text-white focus:outline-none focus:border-white/60 transition-colors font-body text-sm"
                />
                {errors.name && (
                  <span className="text-xs text-rose-300 font-body">{errors.name.message}</span>
                )}
              </div>

              {/* Field 2: E-mail Address */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs sm:text-sm text-white/90 font-normal">
                  E-mail Address
                </label>
                <input
                  type="email"
                  placeholder=""
                  {...register("email", {
                    required: "Please enter your email address",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address format",
                    },
                  })}
                  className="w-full h-12 sm:h-14 px-4 rounded-lg bg-transparent border border-white/20 text-white focus:outline-none focus:border-white/60 transition-colors font-body text-sm"
                />
                {errors.email && (
                  <span className="text-xs text-rose-300 font-body">{errors.email.message}</span>
                )}
              </div>

              {/* Field 3: Write Message */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs sm:text-sm text-white/90 font-normal">
                  Write Message
                </label>
                <textarea
                  rows={4}
                  placeholder=""
                  {...register("message", { required: "Please enter your message" })}
                  className="w-full h-[130px] sm:h-[160px] p-4 rounded-[6px] bg-transparent border border-white/20 text-white focus:outline-none focus:border-white/60 transition-colors font-body text-sm resize-none"
                />
                {errors.message && (
                  <span className="text-xs text-rose-300 font-body">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button: Book Now */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[48px] sm:h-[56px] rounded-full bg-[#F8F6F4] text-[#62103A] font-body text-base font-semibold hover:bg-white transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Book Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
