import { useState } from "react";

export default function useDial(phone) {
  const [copied, setCopied] = useState(false);

  const Copy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard error", e);
    }
  };

  const telephone = () => {
    const cleaned = phone.replace(/[^\d+]/g, "");
    return `tel:${cleaned}`;
  };

  return { copied, Copy, telephone };
}
