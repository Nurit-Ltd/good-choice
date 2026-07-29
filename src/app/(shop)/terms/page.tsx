import { ProductHeader } from "@/components/features/products/ProductHeader";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Good Choice Furniture",
  description:
    "Review the Terms & Conditions governing orders, delivery, custom handcrafted furniture, returns, warranty, and services at Good Choice Furniture Doha Qatar.",
};

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "products-orders", title: "2. Products & Handcrafted Orders" },
  { id: "pricing-payment", title: "3. Pricing & Payment Terms" },
  { id: "delivery-installation", title: "4. Shipping & Installation" },
  { id: "cancellations-returns", title: "5. Cancellations & Returns" },
  { id: "warranty-care", title: "6. Warranty & Product Care" },
  { id: "intellectual-property", title: "7. Intellectual Property" },
  { id: "governing-law", title: "8. Governing Law & Dispute" },
  { id: "contact-support", title: "9. Customer Support" },
];

export default function TermsConditionsPage() {
  return (
    <div className="w-full pb-24 bg-[#F8F6F4]">
      {/* Header Banner */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <ProductHeader
          title="Terms & Conditions"
          categoryParent="Home"
          categoryName="Terms & Conditions"
        />
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-secondary-200/80 rounded-2xl p-4 sm:px-6 shadow-xs mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-primary-950 bg-[#FAF7F2] shrink-0"
              style={{ color: "var(--color-primary-950, #62103A)" }}
            >
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-grey-950">
                Terms of Service Agreement
              </p>
              <p className="font-body text-xs text-grey-600">
                Good Choice Furniture & Trading W.L.L. (CR No: 82686, Qatar)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-body text-grey-600 bg-secondary-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-primary-950" />
            <span>Effective Date: July 2026</span>
          </div>
        </div>

        {/* Two-Column Layout (Desktop Sticky Sidebar / Hidden on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sticky Terms Navigation Sidebar (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 z-20">
            <div className="bg-white border border-secondary-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <h3
                className="font-heading text-base font-semibold text-grey-950 pb-2 border-b border-grey-100 flex items-center gap-2"
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                <FileText className="w-4 h-4 text-primary-950" />
                Terms Navigation
              </h3>

              {/* Scrollable list for desktop navigation */}
              <nav className="flex flex-col gap-2">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="font-body text-xs font-medium px-3.5 py-2.5 rounded-xl text-grey-700 hover:text-primary-950 hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-primary-950/10"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              {/* Need Help Box */}
              <div className="pt-4 border-t border-grey-100">
                <div className="bg-[#FAF7F2] rounded-2xl p-4 space-y-2 border border-primary-950/10">
                  <p className="font-heading text-xs font-semibold text-primary-950">
                    Questions about our terms?
                  </p>
                  <p className="font-body text-xs text-grey-600 leading-relaxed">
                    Contact our customer support team for any clarifications before placing an order.
                  </p>
                  <a
                    href="mailto:support@goodchoice.qa"
                    className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary-950 hover:underline pt-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    support@goodchoice.qa
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Content Column */}
          <main className="col-span-12 lg:col-span-8 space-y-8">
            {/* 1. Acceptance of Terms */}
            <section
              id="acceptance"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  1. Acceptance of Terms & Conditions
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                By accessing, browsing, or making a purchase on the <strong>Good Choice Furniture</strong> website (www.goodchoice.qa) or at our Doha showroom, you agree to be bound by these Terms & Conditions, all applicable laws, and regulations of the State of Qatar.
              </p>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                If you do not agree with any part of these terms, you should refrain from using our online services or placing orders. We reserve the right to modify these terms at any time.
              </p>
            </section>

            {/* 2. Products & Handcrafted Orders */}
            <section
              id="products-orders"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  2. Product Specifications & Custom Handcrafting
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                Good Choice specializes in handcrafted luxury furniture, sofas, Arabic majlis sets, dining tables, and bespoke woodwork.
              </p>
              <ul className="space-y-2.5 font-body text-sm text-grey-700 list-disc pl-5">
                <li>
                  <strong>Natural Variations:</strong> Wood grain patterns, marble veining, fabric texture hues, and hand-stitched details may show slight natural variations inherent to authentic artisan craftsmanship.
                </li>
                <li>
                  <strong>Custom Orders:</strong> Bespoke dimensions, specialized upholstery, or customized fabric requests must be confirmed in writing. Custom handcrafted items are non-refundable once production begins.
                </li>
                <li>
                  <strong>Dimensions & Display:</strong> Measurements provided online are approximate (with a standard tolerance of ±1-2 cm).
                </li>
              </ul>
            </section>

            {/* 3. Pricing & Payment Terms */}
            <section
              id="pricing-payment"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  3. Pricing & Payment Terms
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                All prices listed on our platform are in <strong>Qatari Riyals (QAR)</strong> unless explicitly stated otherwise.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-1.5">
                  <h4 className="font-heading text-xs font-semibold text-primary-950">
                    Payment Methods Accepted
                  </h4>
                  <p className="font-body text-xs text-grey-700">
                    Debit Cards (NAPS Qatar), Visa, MasterCard, Apple Pay, Bank Transfers, and Cash on Delivery (select Qatar zones).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-1.5">
                  <h4 className="font-heading text-xs font-semibold text-primary-950">
                    Price Changes
                  </h4>
                  <p className="font-body text-xs text-grey-700">
                    Prices are subject to revision without prior notice, but confirmed orders will be processed at the agreed price at checkout.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Shipping & Installation */}
            <section
              id="delivery-installation"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <Truck className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  4. Shipping, Delivery & Professional Installation
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                We provide white-glove delivery and assembly services across all municipalities in Qatar (Doha, Al Rayyan, Al Wakrah, Lusail, Al Khor, Muaither, etc.) and export shipping throughout the GCC region.
              </p>
              <ul className="space-y-2.5 font-body text-sm text-grey-700 list-disc pl-5">
                <li>
                  <strong>Delivery Windows:</strong> In-stock items are typically delivered within 24 to 72 hours. Custom manufactured pieces require 2-4 weeks depending on order scope.
                </li>
                <li>
                  <strong>Site Access:</strong> Customers are responsible for ensuring adequate doorway, elevator, and hallway clearance for large furniture items.
                </li>
                <li>
                  <strong>Assembly & Inspection:</strong> Our delivery crew will assemble the furniture and request your signed inspection upon successful installation.
                </li>
              </ul>
            </section>

            {/* 5. Cancellations & Returns */}
            <section
              id="cancellations-returns"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  5. Cancellations, Returns & Refunds
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                Your satisfaction is our priority. We handle returns and exchanges in compliance with Qatar Consumer Protection Laws:
              </p>

              <div className="space-y-3 font-body text-sm text-grey-700">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-1">
                  <strong className="text-primary-950 font-heading text-sm">
                    In-Stock Regular Items (7-Day Return Window):
                  </strong>
                  <p className="text-xs text-grey-700">
                    Unused standard items in original packaging can be returned or exchanged within 7 days of delivery. Delivery/restocking fees may apply.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-1">
                  <strong className="text-primary-950 font-heading text-sm">
                    Custom & Tailored Orders:
                  </strong>
                  <p className="text-xs text-grey-700">
                    Custom-sized furniture, specialized fabrics, or custom majlis designs cannot be canceled or returned after manufacturing has commenced unless a verified manufacturing defect exists.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Warranty & Product Care */}
            <section
              id="warranty-care"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  6. Warranty & Care Guidelines
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                Good Choice Furniture items come with a <strong>1-Year Limited Structural Warranty</strong> covering manufacturing defects in wooden frames, internal joinery, and structural integrity.
              </p>
              <p className="font-body text-xs text-grey-600 bg-secondary-50 p-3.5 rounded-xl">
                Note: Warranty excludes normal wear and tear, fabric staining, accidental damage, improper cleaning chemicals, or exposure to extreme moisture/sunlight.
              </p>
            </section>

            {/* 7. Intellectual Property */}
            <section
              id="intellectual-property"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  7. Intellectual Property & Brand Ownership
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                All contents on this website including logos, product photography, 3D renders, custom designs, text, graphics, and code are the exclusive property of Good Choice Furniture & Trading W.L.L. Unauthorized copying, distribution, or commercial reproduction is strictly prohibited.
              </p>
            </section>

            {/* 8. Governing Law & Dispute */}
            <section
              id="governing-law"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  8. Governing Law & Jurisdiction
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                These terms shall be governed, construed, and enforced in accordance with the laws of the <strong>State of Qatar</strong>. Any legal action or dispute arising from transactions with Good Choice Furniture shall be submitted to the competent courts of Doha, Qatar.
              </p>
            </section>

            {/* 9. Customer Support Contact */}
            <section
              id="contact-support"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6 scroll-mt-28"
            >
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                9. Contact Customer Support
              </h2>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                If you have any questions or need assistance regarding our Terms & Conditions, please contact us:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-primary-950 font-semibold text-xs font-body">
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </div>
                  <p className="font-body text-xs text-grey-800 font-medium">
                    support@goodchoice.qa
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-primary-950 font-semibold text-xs font-body">
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp / Call</span>
                  </div>
                  <p className="font-body text-xs text-grey-800 font-medium">
                    +974 4400 0000
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-primary-950 font-semibold text-xs font-body">
                    <MapPin className="w-4 h-4" />
                    <span>Doha Showroom</span>
                  </div>
                  <p className="font-body text-xs text-grey-800 font-medium leading-normal">
                    Muaither, Umm Al Dome St, Doha, Qatar
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
