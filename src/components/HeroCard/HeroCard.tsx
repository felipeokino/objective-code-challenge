import React, { useState } from "react";
import { THero } from "../../mocks/resultsMock";
import { TDefaultInfo } from '../../types/hero';

type HeroCardProps = {
  hero: THero;
};
const HeroCard = ({ hero }: HeroCardProps) => {
  const {
    id,
    name,
    thumbnail: { path, extension },
    description,
    series,
    events,
  } = hero;
  const [clicked, setClicked] = useState(false);

  const FrontFace = (
    <>
      <img
        src={`${path}.${extension}`}
        alt={name}
        className={"min-h-[25rem] rounded-t-xl object-cover object-left-bottom max-sm:rounded-xl "}
      />
      <div className="bg-[#333] w-full h-[15rem] rounded-b-xl px-3 max-sm:hidden">
        <div className="mt-3 break-words overflow-hidden text-ellipsis line-clamp-[9]">
          {description || 'Description not found.'}
        </div>  
      </div>
    </>
  );

  const BackFace = (
    <div className='bg-[#333] w-[20rem] h-full max-sm:h-[25rem] rounded-b-xl max-sm:rounded-xl px-3 pt-16'>
      <div className="mt-3">
          Series:
          <ul className="mt-1">
            {series.items.slice(0, 5).map((serie: TDefaultInfo['items'][0]) => (
              <li key={serie.name} className="text-xs font-light">
                {serie.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          Events:
          <ul className="mt-1">
            {events.items.slice(0, 5).map((event: TDefaultInfo['items'][0]) => (
              <li key={event.name} className="text-xs font-light">
                {event.name}
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
  
  return (
    <div
      onClick={() => setClicked(!clicked)}
      className={`max-sm:h-[25rem] max-sm:w-full rounded-xl w-72  lg:h-[40rem] relative flex flex-col justify-start items-center hover:scale-105 transition-all duration-500 z-10 hover:z-[12] hover: shadow-black/90 hover:shadow-lg shadow-sm cursor-pointer`}
    >
      <div className="bg-[#333] text-white/80 w-[80%] text-center text-xl absolute top-4 left-1/2 -translate-x-1/2 rounded-tl-xl rounded-br-xl  shadow-black/75 shadow-lg p-2">
        {name}
      </div>

      {
        !clicked ? FrontFace : BackFace
      }
    </div>
  );
};

export default HeroCard;
