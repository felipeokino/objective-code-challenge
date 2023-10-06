import React from "react";

const Header = () => {
  return (
    <header className="
        w-screen 
        h-24
        flex 
        justify-between
        items-center
        p-6
        fixed 
        top-0 
        left-0
        box-border
        bg-[#111]
        z-20
    ">
      <img src="https://www.objective.com.br/wp-content/uploads/2020/11/logo-2.svg" alt="objective logo" className="h-10 max-sm:h-7" />
      <div className='flex max-sm:flex-col '>
        <span>Felipe Okino</span>
        <span>Teste de front-end</span>
      </div>
    </header>
  );
};

export default Header;