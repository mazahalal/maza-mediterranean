"use client";

import React from "react";
import { MAZA_MAPS_EMBED_SRC } from "@/lib/maza-maps";

interface MapEmbedProps {
  className?: string;
  height?: string;
}

export default function MapEmbed({ className = "", height }: MapEmbedProps) {
  const containerClass = height
    ? `relative w-full overflow-hidden rounded-lg border border-[rgba(211,171,94,0.15)] ${className}`
    : `relative w-full overflow-hidden rounded-lg border border-[rgba(211,171,94,0.15)] aspect-video ${className}`;

  const iframeStyle = height ? { border: 0, height } : { border: 0 };

  return (
    <div className={containerClass}>
      <iframe
        src={MAZA_MAPS_EMBED_SRC}
        className={height ? "w-full" : "absolute inset-0 w-full h-full"}
        style={iframeStyle}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Maza Mediterranean Cuisine location on Google Maps"
      />
    </div>
  );
}