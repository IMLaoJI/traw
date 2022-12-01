import React from 'react';
import Logo from '../../icons/Logo';

const Header = () => {
  return (
    <div className="flex flex-row h-14 pl-3 bg-traw-purple items-center">
      <div className="flex h-9 w-9 rounded-full bg-white items-center justify-center text-xl">
        <Logo />
      </div>
    </div>
  );
};

export { Header };
