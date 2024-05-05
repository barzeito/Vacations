import React from 'react';
import './Pagination.css';

interface PaginationControlsProps {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationControlsProps> = ({
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Generate an array of page numbers from 1 to totalPages
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="Pagination">
            <button
                className={`page-link ${hasPrevPage ? '' : 'disabled'}`}
                onClick={handlePrevPage}
                disabled={!hasPrevPage}>
                Prev
            </button>

            <div className="pagination-text">
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        className={`page-link ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageClick(page)}>
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={`page-link ${hasNextPage ? '' : 'disabled'}`}
                onClick={handleNextPage}
                disabled={!hasNextPage}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
