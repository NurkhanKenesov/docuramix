
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path 
          d="M7 18H17V16H7V18Z" 
          fill="currentColor"
        />
        <path 
          d="M17 14H7V12H17V14Z" 
          fill="currentColor"
        />
        <path 
          d="M7 10H11V8H7V10Z" 
          fill="currentColor"
        />
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" 
          fill="currentColor"
        />
      </svg>
      <span className="font-bold text-xl">ДокуМенеджер</span>
    </div>
  );
};

export default Logo;
