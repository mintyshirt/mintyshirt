import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <div className={`font-bold text-blue-400 ${sizeClasses[size]} ${className}`}>
      MintyShirt
    </div>
  );
};

export default Logo;
