import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useActiveLanguage } from '../../utils/localizedRoute';

export interface LocalizedLinkProps extends LinkProps {
  to: string;
}

export const LocalizedLink: React.FC<LocalizedLinkProps> = ({ to, children, ...rest }) => {
  const { localizePath } = useActiveLanguage();

  const resolvedTo = typeof to === 'string' && !to.startsWith('http') && !to.startsWith('mailto:') && !to.startsWith('tel:')
    ? localizePath(to)
    : to;

  return (
    <RouterLink to={resolvedTo} {...rest}>
      {children}
    </RouterLink>
  );
};
