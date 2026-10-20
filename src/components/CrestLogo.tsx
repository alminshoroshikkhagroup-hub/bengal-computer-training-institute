import React from 'react';
import { BengalInstituteLogo } from './BengalInstituteLogo';

interface CrestLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'neon' | 'light' | 'gold';
  showText?: boolean;
  showTagline?: boolean;
}

/**
 * CrestLogo wrapper delegating to BengalInstituteLogo
 * with 100% transparent background (no black box background).
 */
export const CrestLogo: React.FC<CrestLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const mappedSize = (size === '2xl' ? 'xl' : size) as 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  return (
    <BengalInstituteLogo
      className={className}
      size={mappedSize}
      showText={showText}
    />
  );
};
