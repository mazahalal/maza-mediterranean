"use client";

import React from "react";

interface MapEmbedProps {
  className?: string;
  height?: string;
}

export default function MapEmbed({ className = "", height }: MapEmbedProps) {
  const containerClass = height 
    ? `relative w-full overflow-hidden rounded-lg border border-[rgba(211,171,94,0.15)] ${className}`
    : `relative w-full overflow-hidden rounded-lg border border-[rgba(211,171,94,0.15)] aspect-video ${className}`;

  const iframeStyle = height 
    ? { border: 0, height } 
    : { border: 0 };

  return (
    <div className={containerClass}>
      {/* 
        Google Maps embed iframe.
        To update with exact embed from Google:
        1. Go to https://www.google.com/maps
        2. Search "3491 W Frye Rd, Suite 2, Chandler, AZ 85226" or use place_id:11571299155872425967
        3. Click Share > Embed a map
        4. Copy the <iframe> HTML and replace the src value below.
        Current src is constructed from coordinates + place reference. It will show the correct area and pin.
      */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.8!2d-111.8413!3d33.3062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x11571299155872425967!2sMaza+Mediterranean+Cuisine!5e0!3m2!1sen!2sus!4v1750627200!5m2!1sen!2sus"
        className={height ? "w-full" : "absolute inset-0 w-full h-full"}
        style={iframeStyle}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Maza Mediterranean Cuisine location on Google Maps"
      />
    </div>
  );
}
