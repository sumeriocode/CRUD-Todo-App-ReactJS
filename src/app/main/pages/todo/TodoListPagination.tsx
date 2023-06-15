import { PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import React from 'react';

type TodoListPaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

function TodoListPagination({ totalPages, currentPage, onPageChange }: TodoListPaginationProps) {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
      };

    return (
        <div className="flex justify-center mt-4">
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </div>
    );
}

export default TodoListPagination;
