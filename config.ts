
export const CONFIG = {
  // Connected to your live Google Sheet
  GOOGLE_SHEET_URL: "https://docs.google.com/spreadsheets/d/1ChFWtpVyOID9dZ6eW5jTyDD-YtgNe3rUeSchTWUavYk/export?format=csv",
  
  CONTACT: {
    EMAIL: "bmcurrie15@gmail.com",
    SUBJECT: "Custom 3D print request",
  },
  
  NAV_LINKS: [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Materials', path: '/materials' },
    { label: 'About', path: '/about' },
  ],
  
  CATEGORIES: ['All', 'Sports', 'Gifts', 'Functional', 'Decorative'] as const,
  
  AVATAR_URL: "https://public-cdn.bblmw.com/avatar/877296003/2025-04-27_4cb4c0f1cf19c.png?x-oss-process=image/resize,w_200/format,webp",
};

export const getEmailLink = () => 
  `mailto:${CONFIG.CONTACT.EMAIL}?subject=${encodeURIComponent(CONFIG.CONTACT.SUBJECT)}`;
