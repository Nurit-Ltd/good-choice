"use client";

import { ProductHeader } from "@/components/features/products/ProductHeader";
import { useContentPage } from "@/hooks/use-content-page";
import { CheckCircle2, Clock, CreditCard, FileCheck, FileText, Mail, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const DEFAULT_SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms & Conditions",
    text: "By accessing, browsing, or making a purchase on the Good Choice Furniture website or at our Doha showroom, you agree to be bound by these Terms & Conditions, all applicable laws, and regulations of the State of Qatar.",
  },
  {
    id: "products-orders",
    title: "2. Product Specifications & Custom Handcrafting",
    text: "Good Choice specializes in handcrafted luxury furniture, sofas, Arabic majlis sets, dining tables, and bespoke woodwork. Wood grain patterns, marble veining, fabric texture hues, and hand-stitched details may show slight natural variations inherent to authentic artisan craftsmanship.",
  },
  {
    id: "pricing-payment",
    title: "3. Pricing & Payment Terms",
    text: "All prices listed on our platform are in Qatari Riyals (QAR) unless explicitly stated otherwise. We accept Debit Cards (NAPS Qatar), Visa, MasterCard, Apple Pay, Bank Transfers, and Cash on Delivery.",
  },
  {
    id: "delivery-installation",
    title: "4. Shipping, Delivery & Professional Installation",
    text: "We provide white-glove delivery and assembly services across all municipalities in Qatar (Doha, Al Rayyan, Al Wakrah, Lusail, Al Khor, Muaither, etc.) and export shipping throughout the GCC region.",
  },
  {
    id: "cancellations-returns",
    title: "5. Cancellations, Returns & Refunds",
    text: "Unused standard items in original packaging can be returned or exchanged within 7 days of delivery. Custom-sized furniture or bespoke majlis designs cannot be canceled once production begins.",
  },
  {
    id: "warranty-care",
    title: "6. Warranty & Care Guidelines",
    text: "Good Choice Furniture items come with a 1-Year Limited Structural Warranty covering manufacturing defects in wooden frames, internal joinery, and structural integrity.",
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property & Brand Ownership",
    text: "All contents on this website including logos, product photography, 3D renders, custom designs, text, graphics, and code are the exclusive property of Good Choice Furniture & Trading W.L.L.",
  },
  {
    id: "governing-law",
    title: "8. Governing Law & Jurisdiction",
    text: "These terms shall be governed, construed, and enforced in accordance with the laws of the State of Qatar. Any legal action or dispute shall be submitted to the competent courts of Doha, Qatar.",
  },
  {
    id: "contact-support",
    title: "9. Customer Support Contact",
    text: "If you have any questions or need assistance regarding our Terms & Conditions, please contact us at support@goodchoice.qa or +974 4400 0000.",
  },
];

export default function TermsConditionsPage() {
  const { data: pageData } = useContentPage("terms");

  const title = pageData?.title || "Terms & Conditions";
  const subtitle = pageData?.subtitle || "Good Choice Furniture & Trading W.L.L. (CR No: 82686, Qatar)";
  const sections = pageData?.sectionData && pageData.sectionData.length > 0 ? pageData.sectionData : DEFAULT_SECTIONS;

  return (
    <div className="w-full pb-24 bg-[#F8F6F4]">
      {/* Header Banner */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <ProductHeader title={title} categoryParent="Home" categoryName={title} />
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-secondary-200/80 rounded-2xl p-4 sm:px-6 shadow-xs mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary-950 bg-[#FAF7F2] shrink-0" style={{ color: "var(--color-primary-950, #62103A)" }}>
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-grey-950">{title} Agreement</p>
              <p className="font-body text-xs text-grey-600">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-body text-grey-600 bg-secondary-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-primary-950" />
            <span>Effective Date: {pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "July 2026"}</span>
          </div>
        </div>

        {/* Two-Column Layout (Desktop Sticky Sidebar / Hidden on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sticky Terms Navigation Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 z-20">
            <div className="bg-white border border-secondary-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="font-heading text-base font-semibold text-grey-950 pb-2 border-b border-grey-100 flex items-center gap-2" style={{ color: "var(--color-grey-950, #292929)" }}>
                <FileText className="w-4 h-4 text-primary-950" />
                Terms Navigation
              </h3>

              {/* Scrollable list for desktop navigation */}
              <nav className="flex flex-col gap-2">
                {sections.map((sec) => (
                  <a
                    key={sec.id || sec.title}
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
                  <p className="font-heading text-xs font-semibold text-primary-950">Questions about our terms?</p>
                  <p className="font-body text-xs text-grey-600 leading-relaxed">Contact our customer support team for any clarifications before placing an order.</p>
                  <a href="mailto:support@goodchoice.qa" className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary-950 hover:underline pt-1">
                    <Mail className="w-3.5 h-3.5" />
                    support@goodchoice.qa
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Content Column */}
          <main className="col-span-12 lg:col-span-8 space-y-8">
            {sections.map((sec, idx) => (
              <section key={sec.id || `sec-${idx}`} id={sec.id || `sec-${idx}`} className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                    {idx === 0 ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : idx === 2 ? (
                      <CreditCard className="w-4 h-4" />
                    ) : idx === 3 ? (
                      <Truck className="w-4 h-4" />
                    ) : idx === 4 ? (
                      <RotateCcw className="w-4 h-4" />
                    ) : idx === 5 ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">{sec.title}</h2>
                </div>
                <p className="font-body text-sm text-grey-700 leading-relaxed whitespace-pre-line">{sec.text}</p>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
