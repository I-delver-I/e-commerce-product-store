import {useState, useCallback, Dispatch, SetStateAction} from 'react';

type HandleProductFetch<T> = (onProductsFetch: Dispatch<SetStateAction<T[]>>) => Promise<void>;

type UsePaginationProps<T> = {
    initialData: T[];
    pagesCount: number;
    itemsPerPage: number;
    onDataFetch: HandleProductFetch<T>;
};

export function usePagination<T>({initialData, pagesCount, itemsPerPage, onDataFetch}: UsePaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(() => initialData);

    const prev = useCallback(() => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }, []);

    const allDataIsFetched = data.length === itemsPerPage * pagesCount;

    const next = useCallback(() => {
        const newCurrentPage = currentPage + 1;
        setCurrentPage(prev => Math.min(newCurrentPage, pagesCount));

        if (!allDataIsFetched && data.length === itemsPerPage * (currentPage + 1)) {
            onDataFetch(setData);
        }
    }, [currentPage]);

    const jump = useCallback(async (page: number) => {
        const pageNumber = Math.max(1, page);
        const newCurrentPage = Math.min(pageNumber, pagesCount)
        setCurrentPage(() => newCurrentPage);

        if (!allDataIsFetched) {
            const limit = initialData.length;
            const fetchesCountToMake = Math.ceil((newCurrentPage * itemsPerPage - data.length) / limit);

            for (let i = 0; i < fetchesCountToMake; i++) {
                await onDataFetch(setData);
            }
        }
    }, [currentPage]);

    const currentData = useCallback(() => {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;

        return data.slice(begin, end);
    }, [currentPage, data, itemsPerPage]);

    return {
        currentPage,
        maxPage: pagesCount,
        next,
        prev,
        jump,
        currentData,
    };
}