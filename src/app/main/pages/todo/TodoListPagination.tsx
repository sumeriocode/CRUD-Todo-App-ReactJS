import React from 'react';

type TodoListPaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

function TodoListPagination({ totalPages, currentPage, onPageChange }: TodoListPaginationProps) {
    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage > totalPages - 3) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers.map((page, index) => {
            const isCurrentPage = page === currentPage;
            const buttonClassName = `py-2 px-4 rounded-md ${isCurrentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } hover:bg-blue-600 hover:text-white`;

            return (
                <li key={index}>
                    {isCurrentPage ? (
                        <span className={buttonClassName}>{page}</span>
                    ) : (
                        <a
                            href="#"
                            className={buttonClassName}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </a>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="flex justify-center mt-4">
            <ul className="flex space-x-2">
                {renderPageNumbers()}
            </ul>
        </div>
    );
}

export default TodoListPagination;
