import React, { useContext } from 'react'
import { generatePaginationList, getActualPage, getSearchParams } from '../../utils';
import { Context } from '../../context/context';
import { ArrowLeft, ArrowRight } from '../../utils/icons';

const Pagination = () => {
  const pageLocation = getSearchParams()

    const {pageCount} = useContext(Context)
const actualPage = +(getActualPage() || 1);

const paginationSteps = generatePaginationList(actualPage, pageCount);

const handleNavigateStep = (goto: number) => {
    window.location.assign(`/?page=${goto}${pageLocation && `&${pageLocation}`}`)
}

  return (
    <div className='flex gap-3 font-light text-sm justify-center mt-10 pb-14'>
        <button disabled={actualPage===1} className="p-3 flex items-center justify-center w-10 h-10 rounded-xl bg-amber-700 cursor-pointer shadow shadow-black border-none disabled:bg-amber-900" onClick={() => handleNavigateStep(actualPage-1)}>
            <ArrowLeft  />
        </button>
        <div className='flex gap-3'>
            {
                paginationSteps.map((step, idx) => (
                    <NumericStep key={+step+idx} value={step} handleClick={handleNavigateStep} pageCount={pageCount}/>
                ))
            }
        </div>
        <button disabled={actualPage===pageCount} className={`p-3 flex items-center justify-center w-10 h-10 rounded-xl bg-amber-700 cursor-pointer shadow shadow-black border-none disabled:bg-amber-900`} onClick={() => handleNavigateStep(actualPage + 1)}>
            <ArrowRight />
        </button>
    </div>
  )
}

type StepProps = {
    value: number | string
    pageCount: number
    handleClick: (args1: number) => void
}

const NumericStep = ({value, handleClick, pageCount}: StepProps) => {
    const actualPage = getActualPage();
    return (
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-amber-700 cursor-pointer shadow shadow-black ${value === pageCount && 'disabled'} ${value === actualPage && 'bg-amber-400 text-gray-900'}`} onClick={typeof value === 'number' ? () => handleClick(value) : () => {}}>{value}</div>
    )
}

export default Pagination