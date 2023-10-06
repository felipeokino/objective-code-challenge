export const getActualPage = (): number => +(window.location.search.match(/\d+/g)?.[0]||1)
export const getSearchParams = (): string => window.location.search.match(/q=([a-z]|[A-Z]).*/)?.[0] || ''

enum PaginationStep {
  MOBILE = 3,
  OTHER = 6
}
export const generatePaginationList = (startAt: number, size = 1) => {
  const isMobile = window.innerWidth <= 640;
  
    const startIndex = 0;
    let paginationSize = isMobile ? PaginationStep.MOBILE : PaginationStep.OTHER;

    if (size < paginationSize)
      paginationSize = size === 1 ? size-1 : size;
    
    const steps: Array<number | string> = [];
    steps.length = paginationSize;
        
    const pages =  [ 
      ...steps.fill(0, startIndex, paginationSize)
        .splice(startIndex, paginationSize)
        .map((_, idx) => startAt + idx+1 <= size ? startAt + idx : startAt-=1)
        .sort((a, b) => a - b), ...steps ];
        
    if (size - startAt > paginationSize)
      pages[paginationSize-1] = '...';
    pages[paginationSize] = size;
    return pages.filter(Boolean);
  };

