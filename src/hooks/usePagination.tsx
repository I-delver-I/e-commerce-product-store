import {useCallback, useState} from "react";
import {number} from "prop-types";

export default function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    function jump(page: number) {
        const pageNumber = Math.max(1, page)
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    }

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    return {next, prev, jump, currentData, currentPage, maxPage};
};
