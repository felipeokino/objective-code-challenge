import React, { useEffect, useRef, useState } from "react";
import { Search } from "../../utils/icons";
import { getSearchParams } from '../../utils';

const SearchHero = () => {
  const searchText = getSearchParams().split('=')[1]
  const [search, setSearch] = useState(searchText||'')
  const searchboxRef = useRef<HTMLInputElement>(null);
  const pageLocation = window.location.search.match(/page=\d/)?.[0] || 'page=1'
 
  const handleSearch = () => {
    window.location.assign(`?${pageLocation}&q=${searchboxRef.current?.value}`)
  }

  return (
    <div
      className="
        flex 
        flex-col 
        items-start 
        justify-center
        max-sm:items-center 
        max-sm:justify-center
        gap-6
        "
    >
      <span className="text-3xl text-white/80">Nome do personagem</span>
      <div className="relative flex items-center justify-center h-fit w-96 max-sm:w-11/12 ">
        <input
          type="text"
          className="w-full rounded-lg outline-none bg-[#444] px-2 h-8 placeholder:text-gray-300 border border-amber-600"
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchboxRef}
        />
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer fill-amber-600"
          onClick={handleSearch}
          data-testid="searchBtn"
        ><Search /></div>
      </div>
    </div>
  );
};

export default SearchHero;
