"use client";

import { useContactPage } from "@/hooks/use-contact";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";

export function ContactInfo() {
  const { data: contact } = useContactPage();
  const { data: settings } = useSiteSettings();

  const address = contact?.addressLine || settings?.storeAddress || settings?.address || "C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan";
  const email = contact?.supportEmail || settings?.supportEmail || "goodchoicefurniture@gmail.com";
  const phone = contact?.supportPhone || settings?.supportPhone || "1234-5678";
  const whatsapp = contact?.whatsappPhone || settings?.whatsappNumber || "1234-5678";
  const cleanWhatsapp = whatsapp.replace(/[^\d+]/g, '');

  const contactItems = [
    {
      icon: MapPin,
      title: contact?.addressTitle || "Office Location",
      content: (
        <p className="font-body text-xs sm:text-sm text-grey-950/80 leading-relaxed">
          {address}
        </p>
      ),
    },
    {
      icon: Mail,
      title: "Send a Message",
      content: (
        <a
          href={`mailto:${email}`}
          className="font-body text-xs sm:text-sm text-grey-950/80 hover:text-primary-950 transition-colors leading-relaxed break-all"
        >
          {email}
        </a>
      ),
    },
    {
      icon: Phone,
      title: "Call Us Directly",
      content: (
        <a
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className="font-body text-xs sm:text-sm text-grey-950/80 hover:text-primary-950 transition-colors leading-relaxed"
        >
          {phone}
        </a>
      ),
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Us",
      content: (
        <a
          href={`https://wa.me/${cleanWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs sm:text-sm text-grey-950/80 hover:text-primary-950 transition-colors leading-relaxed"
        >
          {whatsapp}
        </a>
      ),
    },
  ];

  return (
    <section className="w-full py-8 sm:py-12 lg:pt-24">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-start">
                {/* Icon + Title Header with Maroon Underline Accent */}
                <div className="w-full flex items-center gap-2.5 pb-2.5 border-b border-primary-950">
                  <Icon
                    className="w-5 h-5 shrink-0"
                    style={{ color: "var(--color-primary-950, #62103A)" }}
                  />
                  <h3
                    className="text-lg sm:text-xl font-medium tracking-tight"
                    style={{ color: "var(--color-primary-950, #62103A)" }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Details Content */}
                <div className="pt-2">{item.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;
