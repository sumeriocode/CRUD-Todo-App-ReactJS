

type FetchTodosResponse = {
    items: Todo[];
    meta: Pagination;
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
    };
};