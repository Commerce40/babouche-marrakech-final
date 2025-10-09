import React from 'react';

export const Toast = ({ message, show }) => {
  const baseClasses = "fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 z-50 font-medium";
  const activeClasses = show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none";

  return (
    <div className={`${baseClasses} ${activeClasses}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      {message}
    </div>
  );
};