import React, { useState } from 'react';

interface ProfilePhotoProps {
  size?: number;
  className?: string;
}

export const PROFILE_IMG = '/profile.jpg';

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ size = 112, className = '' }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-accent/40 ${className}`}
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <img
          src={PROFILE_IMG}
          alt="Rajeet Nair — AI Engineer"
          width={size}
          height={size}
          loading="eager"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full bg-accent/10 flex items-center justify-center">
          <span className="font-display font-bold text-accent" style={{ fontSize: size * 0.4 }}>
            RN
          </span>
        </div>
      )}
      {/* CRT scanlines over portrait */}
      <div className="absolute inset-0 scanlines-overlay opacity-40 pointer-events-none"></div>
      {/* Subtle accent tint */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-accent/10 pointer-events-none"></div>
    </div>
  );
};
