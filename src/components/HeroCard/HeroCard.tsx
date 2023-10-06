import { memo, useContext, useEffect, useRef, useState } from "react";
import { THero } from "../../types/hero";
import { TDefaultInfo } from "../../types/hero";
import { Context } from "../../context/context";
import { AxiosResponse } from "axios";

type HeroCardProps = {
  hero: THero;
};
type BackFaceProps = {
  series: TDefaultInfo
}
const BackFace = ({series}: BackFaceProps) => {
  const { http } = useContext(Context);

  const imageRef = useRef<HTMLImageElement[]>([]);

  const fetchSerieImage = async (url: string, index: number): Promise<void> => {
    let imageUrl = "";
    
    await http.get<
        AxiosResponse<{
          data: {
            results: { thumbnail: { path: string; extension: string } }[];
          };
        }>
      >(url)
      .then(({ data }) => {
        const series = data.data.results[0];

        imageUrl = `${series.thumbnail.path}.${series.thumbnail.extension}`;
        imageRef.current[index].src = imageUrl;
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    series.items.slice(0, 1).forEach((serie, index) => fetchSerieImage(serie.resourceURI, index))
  }, [])

  return (
  <div className="bg-[#333] w-full h-full relative max-sm:h-[25rem] rounded-b-xl rounded-xl px-3 pt-4">
      <span className='text-3xl text-center w-full block rounded-xl bg-amber-600'>Series</span>
    <div className="mt-3 max-h-[30rem] overflow-y-auto ">
      <ul className="mt-1 ">
        {series.items
          .slice(0, 1)
          .map((serie: TDefaultInfo["items"][0], index: number) => (
            <li
              key={serie.name}
              className="flex items-center text-xs font-light my-4 gap-4"
            >
              <img
                loading="eager"
                alt=""
                ref={(ref) => imageRef.current.push(ref!)}
                className="w-20 h-20 object-cover rounded-xl"
              />
              {serie.name}
            </li>
          ))}
      </ul>
    </div>
  </div>
)};

const HeroCard = ({ hero }: HeroCardProps) => {
  const {
    name,
    thumbnail: { path, extension },
    description,
    series,
  } = hero;
  const [clicked, setClicked] = useState(false);

  
  const FrontFace = (
    <>
      <img
        src={`${path}.${extension}`}
        alt={name}
        className={
          "min-h-[25rem] rounded-t-xl object-cover object-left-bottom max-sm:rounded-xl "
        }
      />
      <div className="bg-[#333] w-full h-[15rem] rounded-b-xl px-3 max-sm:hidden">
        <div className="mt-3 break-words overflow-hidden text-ellipsis line-clamp-[9]">
          {description || "Description not found."}
        </div>
      </div>
    </>
  );

  

  return (
    <>
      <div
        onClick={() => setClicked(!clicked)}
        className={`max-sm:h-[25rem] max-sm:w-[75vw] rounded-xl w-72  lg:h-[40rem] relative flex flex-col justify-start items-center hover:scale-105 transition-all duration-500 z-10 hover:z-[12] hover: shadow-black/90 hover:shadow-lg shadow-sm cursor-pointer`}
      >
        <div className="bg-[#333] text-white/80 w-[80%] text-center text-xl absolute top-4 left-1/2 -translate-x-1/2 rounded-tl-xl rounded-br-xl  shadow-black/75 shadow-lg p-2">
          {name}
        </div>

        {!clicked ? FrontFace : <BackFace series={series} />}
      </div>
    </>
  );
};

export default memo(HeroCard);
