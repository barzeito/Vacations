import React from 'react';
import './Pagination.css';

interface PaginationProps {
    nPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push(i);
    }

    const goToNextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="Pagination">
            <nav>
                <ul className='pagination justify-content-center'>
                    <li className="page-item">
                        <a className="page-link"
                            onClick={goToPrevPage}
                            href='#'>

                            Previous
                        </a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                            className={`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                            <a onClick={() => setCurrentPage(pgNumber)}
                                className='page-link'
                                href='#'>

                                {pgNumber}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link"
                            onClick={goToNextPage}
                            href='#'>

                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
