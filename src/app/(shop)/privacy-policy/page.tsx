"use client";

import { ProductHeader } from "@/components/features/products/ProductHeader";
import { useContentPage } from "@/hooks/use-content-page";
import { Clock, Database, Eye, FileText, Lock, Mail, ShieldCheck, UserCheck } from "lucide-react";

const DEFAULT_SECTIONS = [
  {
    id: "overview",
    title: "1. Overview & Scope",
    text: "This Privacy Policy explains how Good Choice Furniture collects, uses, and safeguards your personal data when visiting our website or ordering custom furniture services.",
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    text: "We collect personal information provided directly by you, including contact details, delivery address, order preferences, and payment verification records.",
  },
  {
    id: "how-we-use-info",
    title: "3. How We Use Your Data",
    text: "Your information is used strictly to process orders, schedule white-glove deliveries, provide customer care, and send relevant account notifications.",
  },
  {
    id: "sharing-security",
    title: "4. Data Sharing & Third Parties",
    text: "We do not sell or rent personal information to third parties. Data is shared only with verified logistics partners and secure payment gateways for order fulfillment.",
  },
  { id: "cookies-tracking", title: "5. Cookies & Analytics", text: "Our website uses essential cookies to remember shopping cart items and anonymous analytics cookies to optimize user experience." },
  { id: "data-protection", title: "6. Security & Storage", text: "We implement SSL encryption, strict data access controls, and PCI-DSS compliant payment processing to protect your information." },
  { id: "user-rights", title: "7. Your Rights & Choices", text: "You have the right to access, update, or request deletion of your personal records at any time by contacting support." },
  { id: "contact-privacy", title: "8. Contact Privacy Team", text: "For any privacy concerns or data requests, contact our privacy compliance team at privacy@goodchoice.qa or +974 4400 0000." },
];

export default function PrivacyPolicyPage() {
  const { data: pageData } = useContentPage("privacy-policy");

  const title = pageData?.title || "Privacy Policy";
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
        {/* Effective Date & Trust Badge Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-secondary-200/80 rounded-2xl p-4 sm:px-6 shadow-xs mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary-950 bg-[#FAF7F2] shrink-0" style={{ color: "var(--color-primary-950, #62103A)" }}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-grey-950">Your Privacy Matters to Us</p>
              <p className="font-body text-xs text-grey-600">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-body text-grey-600 bg-secondary-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-primary-950" />
            <span>Last Updated: {pageData?.updatedAt ? new Date(pageData.updatedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "July 2026"}</span>
          </div>
        </div>

        {/* Two-Column Layout (Desktop Sticky Sidebar / Hidden on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 z-20">
            <div className="bg-white border border-secondary-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="font-heading text-base font-semibold text-grey-950 pb-2 border-b border-grey-100 flex items-center gap-2" style={{ color: "var(--color-grey-950, #292929)" }}>
                <FileText className="w-4 h-4 text-primary-950" />
                Table of Contents
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
                  <p className="font-heading text-xs font-semibold text-primary-950">Privacy Inquiries?</p>
                  <p className="font-body text-xs text-grey-600 leading-relaxed">Contact our privacy officer for data access or deletion requests.</p>
                  <a href="mailto:privacy@goodchoice.qa" className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary-950 hover:underline pt-1">
                    <Mail className="w-3.5 h-3.5" />
                    privacy@goodchoice.qa
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
                      <Eye className="w-4 h-4" />
                    ) : idx === 1 ? (
                      <Database className="w-4 h-4" />
                    ) : idx === 5 ? (
                      <Lock className="w-4 h-4" />
                    ) : idx === 6 ? (
                      <UserCheck className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
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
