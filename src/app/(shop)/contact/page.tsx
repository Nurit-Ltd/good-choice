import { Metadata } from "next";
import { ContactHeader } from "@/components/features/contact/contact-header";
import { ContactInfo } from "@/components/features/contact/contact-info";
import { ContactForm } from "@/components/features/contact/contact-form";
import { ContactMap } from "@/components/features/contact/contact-map";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Good Choice Furniture for bespoke design consultations, orders, and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Top Banner Header Section */}
      <section className="px-4 pt-4">
        <ContactHeader />
      </section>

      {/* 4-Column Quick Contact Cards */}
      <ContactInfo />

      {/* Get In Touch Overlapping Form Section */}
      <ContactForm />

      {/* Interactive React Leaflet Map Section */}
      <ContactMap />
    </div>
  );
}