import usePagination from "@/hooks/usePagination";
import {useEffect} from "react";

export default function PaginationBar({data, totalPagesCount}:
                                          { data: Product[], totalPagesCount: number }) {
    const {
        next, prev, jump, currentData, currentPage, maxPage
    } = usePagination(data, totalPagesCount);

    useEffect(() => {
        // onProductFetch(currentData);
    }, [currentPage]);

    return <>
        <button onClick={prev}>Previous</button>
        <p>{currentPage}</p>
        <button onClick={next}>Next</button>
    </>
}
