import {Box, Button} from '@mui/material';
import React, { useEffect } from 'react';

type PaginationBarProps = {
    currentPage: number;
    maxPage: number;
    onNext: () => void;
    onPrev: () => void;
};

const PaginationBar: React.FC<PaginationBarProps> =
    ({currentPage, maxPage, onNext, onPrev,}) => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [currentPage]);

        return (
            <Box className="pagination-bar" display={"flex"} flexDirection={"column"} alignItems={"center"}
                 maxWidth={1000}>
                <Button sx={{backgroundColor: "green", color: "#fff"}} className="pagination-button" onClick={onPrev}
                        disabled={currentPage === 1}>
                    Previous
                </Button>
                <Box padding="10px" display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
                    {Array.from({length: maxPage}, (_, index) => (
                        <Button
                            key={index + 1}
                            disabled={currentPage === index + 1}
                            className={`${currentPage === index + 1 ? 'active-button' : ''}`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Box>
                <Button sx={{backgroundColor: "green", color: "#fff"}} className="pagination-button" onClick={onNext}
                        disabled={currentPage === maxPage}>
                    Next
                </Button>
            </Box>
        );
    };

export default PaginationBar;
