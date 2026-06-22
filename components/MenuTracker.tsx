"use client";

import { useEffect } from "react";
import { trackMenuView } from "@/lib/meta-pixel";

export default function MenuTracker() {
  useEffect(() => {
    trackMenuView();
  }, []);
  return null;
}
