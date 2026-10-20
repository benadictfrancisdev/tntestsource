import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND_NAME, SITE_URL } from '../../config/site';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = 'Connect with potential manufacturers and suppliers across Tamil Nadu, India. Submit your product requirements for sourcing support, supplier research and quotation coordination.',
  path = '',
  noindex = false
}) => {
  const fullTitle = title || BRAND_NAME;
  const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
