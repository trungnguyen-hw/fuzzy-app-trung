import { useEffect, useState } from 'react';

export default function Iconsax({ icon, className = '', ...props }) {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    if (!icon) return;
    let isMounted = true;
    fetch(`https://glenthemes.github.io/iconsax/icons/${icon.toLowerCase().trim()}.svg`)
      .then((res) => res.text())
      .then((data) => {
        if (isMounted && !data.includes("Content-Security-Policy")) {
          setSvgContent(data);
        }
      })
      .catch((err) => console.error(err));
    return () => { isMounted = false; };
  }, [icon]);

  return (
    <i
      className={`iconsax ${className}`}
      data-icon={icon}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
}
