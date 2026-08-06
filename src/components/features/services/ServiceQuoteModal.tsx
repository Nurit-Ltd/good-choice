"use client";

import { useState } from "react";
import { ServiceItem } from "@/types/service";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Select } from "@/components/ui/select";

interface ServiceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem;
}

const ROOM_OPTIONS = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Commercial Office",
  "Entire Duplex / Villa",
];

const TIMBER_OPTIONS = [
  "Burma Teak Wood",
  "Sheesham / Rosewood",
  "American Red Oak",
  "Luxury Fabric / Leather",
];

export function ServiceQuoteModal({ isOpen, onClose, service }: ServiceQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    roomType: "Living Room",
    woodPreference: "Burma Teak Wood",
    budget: "৳25,000 - ৳50,000",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format WhatsApp query message
    const message = `Hello Good Choice Furniture!\nI would like to request a consultation for service: *${service.title}*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nRoom: ${formData.roomType}\nTimber Preference: ${formData.woodPreference}\nBudget: ${formData.budget}\nNotes: ${formData.notes || "None"}`;

    setTimeout(() => {
      window.open(`${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-secondary-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Dark Header */}
        <div
          className="p-6 text-white flex items-center justify-between"
          style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
        >
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Service Consultation
            </span>
            <h3 className="font-heading text-xl font-bold">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-heading text-xl font-bold text-grey-950">
              Consultation Request Received!
            </h4>
            <p className="font-body text-sm text-grey-650">
              Opening WhatsApp to connect directly with our principal furniture design team...
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary-950 text-white font-body text-sm font-semibold cursor-pointer"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 font-body text-sm">
            <div>
              <label className="block text-xs font-semibold text-grey-800 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Tanvir Ahmed"
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary-300 focus:outline-none focus:border-primary-950 focus:ring-1 focus:ring-primary-950/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-grey-800 mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 01700000000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary-300 focus:outline-none focus:border-primary-950 focus:ring-1 focus:ring-primary-950/30 transition-all"
              />
            </div>

            {/* Custom Branded Select Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-grey-800 mb-1">
                  Room / Space Type
                </label>
                <Select
                  options={ROOM_OPTIONS}
                  value={formData.roomType}
                  onChange={(val) => setFormData({ ...formData, roomType: val })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-grey-800 mb-1">
                  Timber / Material
                </label>
                <Select
                  options={TIMBER_OPTIONS}
                  value={formData.woodPreference}
                  onChange={(val) => setFormData({ ...formData, woodPreference: val })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-grey-800 mb-1">
                Additional Design Notes or Requirements
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Describe your dimensions, design ideas, or timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-secondary-300 focus:outline-none focus:border-primary-950 focus:ring-1 focus:ring-primary-950/30 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:opacity-95 active:scale-99 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
              style={{ backgroundColor: "var(--color-primary-950, #62103A)" }}
            >
              <Send className="w-4 h-4" />
              <span>Submit Consultation Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
