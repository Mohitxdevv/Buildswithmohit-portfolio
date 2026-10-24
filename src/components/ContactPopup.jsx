
"use client";

import { useEffect, useState } from "react";
import {
  FiX,
  FiMail,
  FiArrowLeft,
  FiSend,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { useGeoDialCode } from "@/hooks/useGeoDialCode";
import { COUNTRIES } from "@/app/contact/content";

export default function ContactPopup({ isOpen, onClose }) {
  const [step, setStep] = useState("choose");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("idle");
  const [selectedCC, setSelectedCC] = useState(
    COUNTRIES?.[0] || { code: "91", flag: "🇮🇳" }
  );

  const geoCode = useGeoDialCode();

  useEffect(() => {
    if (geoCode) setSelectedCC(geoCode);
  }, [geoCode]);

  useEffect(() => {
    if (isOpen) {
      setStep("choose");
      setName("");
      setPhone("");
      setReason("");
      setStatus("idle");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-[#ff6b1a]/60 transition-colors text-sm";

  const handleEmail = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: "",
          message: reason.trim(),
        }),
      });

      if (!res.ok) throw new Error("Message could not be sent");

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();

    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!number || !/^\d{8,15}$/.test(number)) {
      setStatus("error");
      return;
    }

    const fullPhone = phone
      ? `+${selectedCC.code} ${phone}`
      : "Not provided";

    const message = encodeURIComponent(
      `Hi! My name is ${name.trim()}.\n\nMy number: ${fullPhone}\n\nMessage: ${reason.trim()}`
    );

    window.open(
      `https://wa.me/${number}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );

    onClose();
  };

  const closePopup = () => {
    setStatus("idle");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
    >
      <button
        type="button"
        aria-label="Close contact popup"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closePopup}
      />

      <div className="relative max-h-[90dvh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 max-w-md w-full shadow-2xl">
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close"
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
        >
          <FiX size={20} />
        </button>

        {step !== "choose" && (
          <button
            type="button"
            onClick={() => {
              setStep("choose");
              setStatus("idle");
            }}
            className="absolute top-5 left-5 text-white/50 hover:text-white transition-colors flex items-center gap-1.5 text-xs uppercase tracking-widest"
          >
            <FiArrowLeft size={13} />
            Back
          </button>
        )}

        {step === "choose" && (
          <>
            <p className="text-[#ff6b1a] text-xs uppercase tracking-[0.25em] mb-3">
              BuildsWithMohit
            </p>

            <h3
              id="contact-popup-title"
              className="text-3xl font-black text-white tracking-tight mb-2"
            >
              Let&apos;s Connect.
            </h3>

            <p className="text-white/55 text-sm mb-7 leading-relaxed">
              Have a project idea, collaboration, or just want to talk about
              technology and creativity? Choose how you would like to connect.
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setStep("email");
                }}
                className="flex items-center gap-4 bg-[#ff6b1a]/5 hover:bg-[#ff6b1a]/10 border border-[#ff6b1a]/20 p-4 rounded-2xl transition-all group text-left"
              >
                <span className="w-11 h-11 rounded-full bg-[#ff6b1a]/15 text-[#ff6b1a] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <FiMail size={18} />
                </span>

                <span>
                  <span className="block text-white font-bold text-sm">
                    Email
                  </span>
                  <span className="block text-white/50 text-xs mt-1">
                    Send a project or collaboration message
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setStep("whatsapp");
                }}
                className="flex items-center gap-4 bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 p-4 rounded-2xl transition-all group text-left"
              >
                <span className="w-11 h-11 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <IoLogoWhatsapp size={20} />
                </span>

                <span>
                  <span className="block text-white font-bold text-sm">
                    WhatsApp
                  </span>
                  <span className="block text-white/50 text-xs mt-1">
                    Start a direct conversation
                  </span>
                </span>
              </button>
            </div>
          </>
        )}

        {step === "email" && (
          <>
            <div className="flex items-center gap-3 mb-6 mt-6">
              <span className="w-10 h-10 rounded-full bg-[#ff6b1a]/15 text-[#ff6b1a] flex items-center justify-center shrink-0">
                <FiMail size={17} />
              </span>

              <div>
                <h3 className="text-white font-black text-lg">
                  Send a Message
                </h3>
                <p className="text-white/50 text-xs">
                  Tell me what you have in mind.
                </p>
              </div>
            </div>

            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <span className="w-14 h-14 rounded-full bg-[#ff6b1a]/15 flex items-center justify-center">
                  <FiCheck size={24} className="text-[#ff6b1a]" />
                </span>
                <p className="text-white font-bold">Message submitted!</p>
                <p className="text-white/55 text-sm">
                  Your message was accepted by the contact endpoint.
                </p>
                <button
                  type="button"
                  onClick={closePopup}
                  className="mt-3 px-5 py-3 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmail} className="flex flex-col gap-3">
                <label className="sr-only" htmlFor="contact-name">
                  Your name
                </label>
                <input
                  id="contact-name"
                  className={inputCls}
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="sr-only" htmlFor="contact-message">
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  className={`${inputCls} resize-none`}
                  rows={4}
                  placeholder="Tell me about your idea or project..."
                  maxLength={3000}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />

                {status === "error" && (
                  <p className="text-red-400 text-xs" role="alert">
                    Message could not be sent. Please try again later.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 bg-[#ff6b1a] text-black font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
                >
                  <FiSend size={14} />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </>
        )}

        {step === "whatsapp" && (
          <>
            <div className="flex items-center gap-3 mb-6 mt-6">
              <span className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                <IoLogoWhatsapp size={19} />
              </span>

              <div>
                <h3 className="text-white font-black text-lg">
                  WhatsApp
                </h3>
                <p className="text-white/50 text-xs">
                  Prepare a message to start a chat.
                </p>
              </div>
            </div>

            <form onSubmit={handleWhatsApp} className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="whatsapp-name">
                Your name
              </label>
              <input
                id="whatsapp-name"
                className={inputCls}
                placeholder="Your name"
                autoComplete="name"
                maxLength={100}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (!COUNTRIES?.length) return;

                    const index = COUNTRIES.indexOf(selectedCC);
                    setSelectedCC(
                      COUNTRIES[(index + 1) % COUNTRIES.length]
                    );
                  }}
                  className="shrink-0 flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  title="Change country code"
                >
                  <span>{selectedCC.flag}</span>
                  <span>+{selectedCC.code}</span>
                </button>

                <label className="sr-only" htmlFor="whatsapp-phone">
                  Your phone number
                </label>
                <input
                  id="whatsapp-phone"
                  className={inputCls}
                  placeholder="Your number (optional)"
                  autoComplete="tel-national"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))
                  }
                  type="tel"
                  inputMode="numeric"
                />
              </div>

              <label className="sr-only" htmlFor="whatsapp-message">
                Your message
              </label>
              <textarea
                id="whatsapp-message"
                className={`${inputCls} resize-none`}
                rows={3}
                placeholder="What's your message about?"
                maxLength={3000}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              {status === "error" && (
                <p className="text-red-400 text-xs" role="alert">
                  WhatsApp is not configured yet. Add your real number in
                  the project environment settings.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#25D366] text-black font-bold rounded-xl text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 mt-1"
              >
                <IoLogoWhatsapp size={17} />
                Open WhatsApp
              </button>
            </form>
          </>
        )}

        <p className="text-center text-white/30 text-[11px] mt-6">
          BuildsWithMohit · Student, Developer &amp; Creator
        </p>
      </div>
    </div>
  );
}
