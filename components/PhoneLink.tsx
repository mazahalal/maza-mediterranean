'use client';

import { trackPhoneClick } from '@/lib/meta-pixel';

interface PhoneLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PhoneLink({ className, children }: PhoneLinkProps) {
  const phoneNumber = '4805346550';
  const display = '(480) 534-6550';

  const handleClick = () => {
    trackPhoneClick();
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleClick}
      className={className}
    >
      {children || display}
    </a>
  );
}
