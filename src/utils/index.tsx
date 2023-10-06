export const getActualPage = (): number => +(window.location.search.match(/\d+/g)?.[0]||1)
export const getSearchParams = (): string => window.location.search.match(/q=([a-z]|[A-Z]).*/)?.[0] || ''

export const generatePaginationList = (startAt: number, size = 1) => {
    const startIndex = 0;
    let paginationSize = 3;
    if (size < paginationSize)
      paginationSize = size === 1 ? size-1 : size;
    
    const homes: Array<number | string> = [];
    homes.length = paginationSize;
        
    const pages =  [ 
      ...homes.fill(0, startIndex, paginationSize)
        .splice(startIndex, paginationSize)
        .map((_, idx) => startAt + idx+1 <= size ? startAt + idx : startAt-=1)
        .sort((a, b) => a - b), ...homes ];
        
    if (size - startAt > paginationSize)
      pages[paginationSize-1] = '...';
    pages[paginationSize] = size;
    return pages.filter(Boolean);
  };

