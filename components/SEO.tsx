import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: 'WebSite' | 'Person' | 'Article' | 'Product';
  image?: string;
  path?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  name = "Brandon",
  type = 'WebSite',
  image,
  path = ''
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Open Graph (Social) Tags
    const setMeta = (property: string, content: string) => {
        let element = document.querySelector(`meta[property='${property}']`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    if (image) setMeta('og:image', image);
    setMeta('og:type', type === 'Person' ? 'profile' : 'website');

    // 4. Inject JSON-LD Structured Data (The "Secret Weapon" for SEO)
    // This tells Google exactly who you are, suppressing ambiguous results.
    const schema = {
      "@context": "https://schema.org",
      "@type": type,
      "name": name,
      "url": window.location.href,
      "description": description,
      ...(type === 'Person' && {
        "jobTitle": "3D Modeler & Maker",
        "email": "bmcurrie15@gmail.com",
        "knowsAbout": ["3D Printing", "CAD Design", "Prototyping", "Additive Manufacturing"]
      }),
      ...(image && { "image": image })
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    // Cleanup: We don't remove tags on unmount to avoid flickering, 
    // as the next page's SEO component will overwrite them immediately.
  }, [title, description, name, type, image, path]);

  return null;
};

export default SEO;