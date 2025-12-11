import React from 'react';

export const Avatar: React.FC<{ type?: 'ai' | 'user' | 'agent' }> = ({ type = 'ai' }) => {
  if (type === 'ai') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Column 1 - Darkest */}
          <circle cx="6" cy="4.5" r="2" className="fill-gray-900"/>
          <circle cx="6" cy="9.5" r="2" className="fill-gray-900"/>
          <circle cx="6" cy="14.5" r="2" className="fill-gray-900"/>
          <circle cx="6" cy="19.5" r="2" className="fill-gray-900"/>
          
          {/* Column 2 - Medium */}
          <circle cx="12" cy="4.5" r="2" className="fill-gray-400"/>
          <circle cx="12" cy="9.5" r="2" className="fill-gray-400"/>
          <circle cx="12" cy="14.5" r="2" className="fill-gray-400"/>
          <circle cx="12" cy="19.5" r="2" className="fill-gray-400"/>
          
          {/* Column 3 - Lightest */}
          <circle cx="18" cy="4.5" r="2" className="fill-gray-200"/>
          <circle cx="18" cy="9.5" r="2" className="fill-gray-200"/>
          <circle cx="18" cy="14.5" r="2" className="fill-gray-200"/>
          <circle cx="18" cy="19.5" r="2" className="fill-gray-200"/>
        </svg>
      </div>
    );
  }
  
  if (type === 'agent') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
        AI
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
      MS
    </div>
  );
};