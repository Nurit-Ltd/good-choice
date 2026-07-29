import { ProductHeader } from "@/components/features/products/ProductHeader";
import {
  Clock,
  Database,
  Eye,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Good Choice Furniture",
  description:
    "Learn about how Good Choice Furniture collects, protects, and handles your personal information with complete transparency and highest security standards.",
};

const SECTIONS = [
  { id: "overview", title: "1. Overview & Scope" },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "how-we-use-info", title: "3. How We Use Your Data" },
  { id: "sharing-security", title: "4. Data Sharing & Third Parties" },
  { id: "cookies-tracking", title: "5. Cookies & Analytics" },
  { id: "data-protection", title: "6. Security & Storage" },
  { id: "user-rights", title: "7. Your Rights & Choices" },
  { id: "contact-privacy", title: "8. Contact Privacy Team" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full pb-24 bg-[#F8F6F4]">
      {/* Header Banner */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <ProductHeader
          title="Privacy Policy"
          categoryParent="Home"
          categoryName="Privacy Policy"
        />
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        {/* Effective Date & Trust Badge Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-secondary-200/80 rounded-2xl p-4 sm:px-6 shadow-xs mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-primary-950 bg-[#FAF7F2] shrink-0"
              style={{ color: "var(--color-primary-950, #62103A)" }}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold text-grey-950">
                Your Privacy Matters to Us
              </p>
              <p className="font-body text-xs text-grey-600">
                Good Choice Furniture & Trading W.L.L. (CR No: 82686, Qatar)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-body text-grey-600 bg-secondary-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-primary-950" />
            <span>Last Updated: July 2026</span>
          </div>
        </div>

        {/* Two-Column Layout (Desktop Sticky Sidebar / Hidden on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sticky Table of Contents Sidebar (Hidden on Mobile) */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 z-20">
            <div className="bg-white border border-secondary-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
              <h3
                className="font-heading text-base font-semibold text-grey-950 pb-2 border-b border-grey-100 flex items-center gap-2"
                style={{ color: "var(--color-grey-950, #292929)" }}
              >
                <FileText className="w-4 h-4 text-primary-950" />
                Table of Contents
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
                    Have privacy concerns?
                  </p>
                  <p className="font-body text-xs text-grey-600 leading-relaxed">
                    Our team is here to assist with any data protection or information inquiries.
                  </p>
                  <a
                    href="mailto:info@goodchoice.qa"
                    className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary-950 hover:underline pt-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    info@goodchoice.qa
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Detailed Content Column */}
          <main className="col-span-12 lg:col-span-8 space-y-8">
            {/* 1. Overview & Scope */}
            <section
              id="overview"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <Eye className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  1. Overview & Scope
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                Welcome to <strong>Good Choice Furniture & Trading W.L.L.</strong> (&quot;Good Choice&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We operate in Qatar and across the GCC region, offering luxury handcrafted furniture, bespoke majlis designs, dining sets, and interior products through our online store and Doha showroom.
              </p>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                This Privacy Policy describes how we collect, use, store, share, and protect your personal information when you visit our website, place an order, contact customer support, or engage with our services. By using our website, you consent to the data practices described in this policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section
              id="information-collected"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <Database className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  2. Information We Collect
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <h3 className="font-heading text-sm font-semibold text-primary-950">
                    A. Personal Identity Data
                  </h3>
                  <p className="font-body text-xs text-grey-700 leading-relaxed">
                    Full name, email address, phone number, Qatar ID / Passport details (where required for high-value orders or customs clearance).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <h3 className="font-heading text-sm font-semibold text-primary-950">
                    B. Delivery & Address Data
                  </h3>
                  <p className="font-body text-xs text-grey-700 leading-relaxed">
                    Physical delivery address, zone, street, building number in Qatar or GCC shipping address, and delivery preferences.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <h3 className="font-heading text-sm font-semibold text-primary-950">
                    C. Payment Information
                  </h3>
                  <p className="font-body text-xs text-grey-700 leading-relaxed">
                    Payment status, transaction history, and encrypted tokenized billing data via secure certified payment gateways (Debit/Credit card processing).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <h3 className="font-heading text-sm font-semibold text-primary-950">
                    D. Technical & Usage Data
                  </h3>
                  <p className="font-body text-xs text-grey-700 leading-relaxed">
                    IP address, browser type, device information, operating system, page views, session duration, and referral URLs.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Data */}
            <section
              id="how-we-use-info"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  3. How We Use Your Information
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                We process your personal information strictly for legitimate commercial purposes, including:
              </p>
              <ul className="space-y-2.5 font-body text-sm text-grey-700 list-disc pl-5">
                <li>Processing, crafting, and fulfilling custom furniture orders and deliveries.</li>
                <li>Communicating order status updates, delivery schedules, and installation logistics.</li>
                <li>Providing customer support and responding to inquiries via WhatsApp, email, or phone.</li>
                <li>Processing secure payments, preventing fraudulent transactions, and managing billing records.</li>
                <li>Improving website functionality, product offerings, user experience, and tailored recommendations.</li>
                <li>Sending promotional updates or new collection announcements (only with your explicit opt-in consent).</li>
              </ul>
            </section>

            {/* 4. Data Sharing & Third Parties */}
            <section
              id="sharing-security"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <Lock className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  4. Data Sharing & Third Parties
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                <strong>We never sell, rent, or trade your personal information.</strong> We only share necessary data with trusted service partners under strict confidentiality agreements:
              </p>
              <div className="space-y-3 font-body text-sm text-grey-700">
                <div className="p-3.5 rounded-xl border border-secondary-200/60 bg-[#FAF7F2]">
                  <strong>Logistics & Installation Partners:</strong> Delivery details provided to authorized drivers and installation technicians in Qatar and GCC.
                </div>
                <div className="p-3.5 rounded-xl border border-secondary-200/60 bg-[#FAF7F2]">
                  <strong>Payment Gateway Providers:</strong> Payment information processed through PCI-DSS compliant financial institutions.
                </div>
                <div className="p-3.5 rounded-xl border border-secondary-200/60 bg-[#FAF7F2]">
                  <strong>Legal & Regulatory Authorities:</strong> Data disclosed when required by Qatari law, court orders, or government mandates.
                </div>
              </div>
            </section>

            {/* 5. Cookies & Analytics */}
            <section
              id="cookies-tracking"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <Eye className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  5. Cookies & Analytics Technologies
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                Our website uses essential cookies to enable core functionality (such as shopping cart persistence and session management) and optional analytical cookies to help us understand visitor interactions. You can manage or disable cookie preferences through your browser settings.
              </p>
            </section>

            {/* 6. Security & Storage */}
            <section
              id="data-protection"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  6. Security & Data Protection
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                We implement robust technical and organizational security measures, including SSL encryption, access controls, secure cloud storage, and regular vulnerability audits to protect your data against unauthorized access, loss, or alteration.
              </p>
            </section>

            {/* 7. Your Rights & Choices */}
            <section
              id="user-rights"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-4 scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary-100/80 flex items-center justify-center text-primary-950">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                  7. Your Rights & Choices
                </h2>
              </div>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                You have the right to request access to your personal data, request corrections to inaccurate information, request deletion of your account records, or opt out of marketing communications at any time by contacting our support team.
              </p>
            </section>

            {/* 8. Contact Privacy Team */}
            <section
              id="contact-privacy"
              className="bg-white border border-secondary-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6 scroll-mt-28"
            >
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-grey-950">
                8. Contact Our Privacy Officer
              </h2>
              <p className="font-body text-sm text-grey-700 leading-relaxed">
                For any questions, requests, or concerns regarding your privacy or data protection practices, please contact us through the details below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-primary-950 font-semibold text-xs font-body">
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </div>
                  <p className="font-body text-xs text-grey-800 font-medium">
                    info@goodchoice.qa
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-primary-950 font-semibold text-xs font-body">
                    <Phone className="w-4 h-4" />
                    <span>Customer Hotline</span>
                  </div>
                  <p className="font-body text-xs text-grey-800 font-medium">
                    +974 4400 0000 / WhatsApp
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-secondary-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-primary-950 font-semibold text-xs font-body">
                    <MapPin className="w-4 h-4" />
                    <span>Showroom Address</span>
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
