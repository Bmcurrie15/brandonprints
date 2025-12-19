
export const CONFIG = {
  // Replace this with your published Google Sheet CSV URL
  GOOGLE_SHEET_URL: "",
  
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
