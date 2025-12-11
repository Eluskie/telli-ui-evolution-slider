import React from 'react';

export const Avatar: React.FC<{ type?: 'ai' | 'user' | 'agent' }> = ({ type = 'ai' }) => {
  if (type === 'ai') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 p-1.5">
        <img src="/chat/telli-logo.svg" alt="Telli" className="w-full h-full" />
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