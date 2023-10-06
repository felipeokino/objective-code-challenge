import React, { useContext, useEffect, useState } from "react";

import HeroCard from "../HeroCard";
import { Context } from "../../context/context";
import { AxiosResponse } from "axios";
import { LIMIT_PER_PAGE } from "../../utils/constants";
import { getActualPage, getSearchParams } from "../../utils";
import Pagination from "../Pagination";
import { THero, TResponse } from '../../types/hero';

const HeroList = () => {
  const { http, pageCount, setPageCount } = useContext(Context);
  const actualPage = getActualPage();
  const searchParams = getSearchParams();

  const [results, setResults] = useState<THero[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params:{[key: string]: string|number|undefined} = {
        offset: +(actualPage && actualPage-1) * LIMIT_PER_PAGE,
        limit: LIMIT_PER_PAGE,
        nameStartsWith: searchParams.split('=')[1]||''
      }
      if (!searchParams)
        delete params.nameStartsWith

      const response = await http.get<AxiosResponse<TResponse>>("characters", params).catch((err) => err);
      
      if (response && response.status === 200) {
        setResults(response.data.data.results);
  
        if (pageCount === 0) setPageCount(Math.ceil((response.data.data.total)/LIMIT_PER_PAGE));
  
        setTimeout(() => {
            setLoading(false)
        }, 300)
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center absolute top-0 left-0 bg-zinc-900/90 w-screen h-screen z-20">
        <div className="animate-bounce w-12 h-12 bg-slate-300 rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="w-full mt-10">
      <ul className="w-full grid grid-cols-5 gap-10 max-sm:flex max-sm:flex-col items-center justify-between max-sm:justify-center flex-wrap gap-7">
        {results.map((hero, idx) => (
          <li key={hero.name} className={`${idx === results.length-1 && 'flex-grow'}`}>
            <HeroCard hero={hero} />
          </li>
        ))}
      </ul>
      <Pagination />
    </section>
  );
};

export default HeroList;
