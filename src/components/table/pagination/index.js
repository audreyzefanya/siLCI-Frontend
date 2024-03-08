import React from 'react';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

const Pagination = ({ 
    firstData = 0, 
    lastData = 0, 
    totalCount = 0, 
    currentPage = 1, 
    totalPage = 10,
    onChangePages
}) => {
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

  function handleChangePages(pages) {
    onChangePages(pages)
  }

  return (
    <div className='w-full bg-white rounded-b-lg border-t border-neutral40'>
      <div className='flex justify-between items-center'>
        <div>
            <p className='text-sm text-black font-normal p-4'>
                From {firstData} to {lastData} of total : {totalCount}
            </p>
        </div>
        <div className='flex px-4 py-2'>
        <div
            className={`m-1 w-10 h-10 rounded-full ${
                currentPage === 1
                    ? 'bg-neutral20 cursor-default'
                    : 'bg-white cursor-pointer border border-neutral40'
            } flex items-center justify-center`}
            onClick={() => {
                if (currentPage !== 1) {
                    handleChangePages(currentPage - 1);
                }
            }}
        >
            <PiCaretLeft size={16} className='text-neutral300' />
        </div>
            {totalPage < 4 ?
                pageNumbers.map((pageNumber) => (
                    <div
                        key={pageNumber}
                        className={`m-1 w-10 h-10 rounded-full cursor-pointer ${
                            currentPage === pageNumber
                            ? 'bg-primary500 text-white'
                            : 'bg-white text-black border border-neutral40'
                        } flex items-center justify-center font-semibold`}
                        onClick={() => handleChangePages(currentPage)}
                    >
                        <p>{pageNumber}</p>
                    </div>
                ))
                :
                <>
                    {
                        currentPage == 1 && (
                            <>
                                <div
                                    key={currentPage}
                                    className="m-1 w-10 h-10 rounded-full bg-primary500 text-white cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(currentPage)}
                                >
                                    <p>{currentPage}</p>
                                </div>
                                <div
                                    key={currentPage + 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(currentPage + 1)}
                                >
                                    <p>{currentPage + 1}</p>
                                </div>
                                <div
                                    key={totalPage + 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-default flex items-center justify-center font-semibold"
                                >
                                    <p>...</p>
                                </div>
                                <div
                                    key={totalPage}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(totalPage)}
                                >
                                    <p>{totalPage}</p>
                                </div>
                            </>
                        )
                    }
                    {
                        (currentPage > 1 && currentPage != totalPage - 1 && currentPage != totalPage) && (
                            <>
                                <div
                                    key={currentPage - 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(currentPage - 1)}
                                >
                                    <p>{currentPage - 1}</p>
                                </div>
                                <div
                                    key={currentPage}
                                    className="m-1 w-10 h-10 rounded-full bg-primary500 text-white cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(currentPage)}
                                >
                                    <p>{currentPage}</p>
                                </div>
                                <div
                                    key={totalPage + 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-default flex items-center justify-center font-semibold"
                                >
                                    <p>...</p>
                                </div>
                                <div
                                    key={totalPage}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(totalPage)}
                                >
                                    <p>{totalPage}</p>
                                </div>
                            </>
                        )
                    }
                    {
                        (currentPage == totalPage - 1) && (
                            <>
                                <div
                                    key={totalPage - 2}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(totalPage - 2)}
                                >
                                    <p>{totalPage - 2}</p>
                                </div>
                                <div
                                    key={totalPage + 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-default flex items-center justify-center font-semibold"
                                >
                                    <p>...</p>
                                </div>
                                <div
                                    key={currentPage}
                                    className="m-1 w-10 h-10 rounded-full bg-primary500 text-white cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(currentPage)}
                                >
                                    <p>{currentPage}</p>
                                </div>
                                <div
                                    key={totalPage}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(totalPage)}
                                >
                                    <p>{totalPage}</p>
                                </div>
                            </>
                        )
                    }
                    {
                        (currentPage == totalPage) && (
                            <>
                                <div
                                    key={totalPage - 2}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(totalPage - 2)}
                                >
                                    <p>{totalPage - 2}</p>
                                </div>
                                <div
                                    key={totalPage + 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-default flex items-center justify-center font-semibold"
                                >
                                    <p>...</p>
                                </div>
                                <div
                                    key={totalPage - 1}
                                    className="m-1 w-10 h-10 rounded-full bg-white text-black border border-neutral40 cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(totalPage - 1)}
                                >
                                    <p>{totalPage - 1}</p>
                                </div>
                                <div
                                    key={currentPage}
                                    className="m-1 w-10 h-10 rounded-full bg-primary500 text-white cursor-pointer flex items-center justify-center font-semibold"
                                    onClick={() => handleChangePages(currentPage)}
                                >
                                    <p>{currentPage}</p>
                                </div>
                            </>
                        )
                    }
                </>
            }
            <div
                className={`m-1 w-10 h-10 rounded-full ${
                currentPage === totalPage
                    ? 'bg-neutral20 cursor-default'
                    : 'bg-white cursor-pointer border border-neutral40'
                } flex items-center justify-center`}
                onClick={() => {
                    if (currentPage !== totalPage) {
                        handleChangePages(currentPage + 1)
                    }
                }}
            >
                <PiCaretRight size={16} className='text-neutral300' />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;