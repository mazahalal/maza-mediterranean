export const trackMeta = (event: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', event, params || {});
  }
};

// Common events for Maza
export const trackMenuView = (category?: string) => {
  trackMeta('ViewContent', {
    content_name: category ? `Menu - ${category}` : 'Menu',
    content_category: 'Menu',
    content_type: 'product',
  });
};

export const trackContact = () => {
  trackMeta('Contact');
};

export const trackPhoneClick = () => {
  trackMeta('Contact', {
    content_name: 'Phone Call',
  });
};
