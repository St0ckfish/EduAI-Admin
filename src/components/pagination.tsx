import React from 'react';

type PaginationProps = {
    totalRows: number;
    rowsPerPage: number;
    setRowsPerPage: (rows: number) => void;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ totalRows, rowsPerPage, setRowsPerPage, currentPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const handleRowsPerPageChange = (event: { target: { value: string; }; }) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        onPageChange(0);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        
        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        className={`px-3 py-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {i + 1}
                    </button>
                );
            }
        } else {
            pageNumbers.push(
                <button
                    key={0}
                    onClick={() => handlePageClick(0)}
                    className={`px-3 py-1 border rounded ${currentPage === 0 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    1
                </button>
            );

            if (currentPage > 2) {
                pageNumbers.push(<span key="dots1" className="px-3 py-1">...</span>);
            }

            for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 2); i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        className={`px-3 py-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {i + 1}
                    </button>
                );
            }

            if (currentPage < totalPages - 3) {
                pageNumbers.push(<span key="dots2" className="px-3 py-1">...</span>);
            }

            pageNumbers.push(
                <button
                    key={totalPages - 1}
                    onClick={() => handlePageClick(totalPages - 1)}
                    className={`px-3 py-1 border rounded ${currentPage === totalPages - 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-between items-center mt-4 text-nowrap bg-[#daeafb] shadow-xl p-4 rounded-lg">
            <div>
                <span className="mr-2 font-semibold">Rows per page:</span>
                <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="border rounded px-3 py-1 outline-none"
                >
                    {[1, 5, 10, 15, 20, 25, 50].map(value => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={handlePreviousPage}
                    className="px-3 py-1 border rounded bg-white text-blue-500"
                    disabled={currentPage === 0}
                >
                    <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="15 6 9 12 15 18" /></svg>
                </button>
                {renderPageNumbers()}
                <button
                    onClick={handleNextPage}
                    className="px-3 py-1 border rounded bg-white text-blue-500"
                    disabled={currentPage === totalPages - 1}
                >
                    <svg className="h-6 w-6"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="9 18 15 12 9 6" /></svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
