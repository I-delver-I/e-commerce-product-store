import React from 'react';

type PaginationBarProps = {
    currentPage: number;
    maxPage: number;
    onNext: () => void;
    onPrev: () => void;
    onJump: (page: number) => void;
};

const PaginationBar: React.FC<PaginationBarProps> =
    ({
         currentPage,
         maxPage,
         onNext,
         onPrev,
         onJump,
     }) => {
        return (
            <div className={"pagination-bar"}>
                <button className="pagination-button direction" onClick={onPrev} disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({length: maxPage}, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => onJump(index + 1)}
                        disabled={currentPage === index + 1}
                        className={`${currentPage === index + 1 ? 'active-button' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="pagination-button direction" onClick={onNext} disabled={currentPage === maxPage}>
                    Next
                </button>
            </div>
        );
    };

export default PaginationBar;
