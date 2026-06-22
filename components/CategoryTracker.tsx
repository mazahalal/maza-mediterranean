"use client";

import { useEffect } from "react";
import { trackMenuView } from "@/lib/meta-pixel";

interface CategoryTrackerProps {
  category: string;
}

export default function CategoryTracker({ category }: CategoryTrackerProps) {
  useEffect(() => {
    trackMenuView(category);
  }, [category]);
  return null;
}
