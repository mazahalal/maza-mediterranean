/** Truck icon for Slice delivery CTAs. */
export default function DeliveryIcon({
  className = "w-4 h-4",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h2m8 0h2m-2 0h-4m6 0h4a1 1 0 001-1v-3.586a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0016.586 8H15"
      />
    </svg>
  );
}
