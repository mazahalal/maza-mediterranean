"use client";

import { useEffect, useState } from "react";
import { getActiveSiteNotice } from "@/lib/site-notices";

const DEFAULT_HOURS = "Mon Closed · Tue–Thu 11am–8pm · Fri–Sat 10am–11pm · Sun 10am–8pm";

/** Hours line that swaps in temporary closure copy while a site notice is live. */
export default function FooterHours() {
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [isTemp, setIsTemp] = useState(false);

  useEffect(() => {
    const notice = getActiveSiteNotice();
    if (notice) {
      setIsTemp(true);
      setHours(
        notice.detail
          ? `${notice.headline} · ${notice.detail}`
          : notice.headline,
      );
    } else {
      setIsTemp(false);
      setHours(DEFAULT_HOURS);
    }
  }, []);

  return (
    <p className={isTemp ? "font-semibold text-[#D3AB5E]" : undefined}>
      {hours}
    </p>
  );
}
