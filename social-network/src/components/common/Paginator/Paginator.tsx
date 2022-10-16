import React from "react";
import styles from "../Paginator/Paginator.module.css";
import {useState} from "react";
import cn from 'classnames'

type UsersPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize: number,
};
export const Paginator: React.FC<UsersPropsType> = ({
                                                        totalCount,
                                                        pageSize,
                                                        currentPage,
                                                        onPageChanged,
                                                        portionSize = 10
                                                    }) => {
    let pageCount = Math.ceil(totalCount / pageSize);
    let pages: number[] = [];
    for (let i: number = 1; i < pageCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(totalCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            <div>
                {
                    portionNumber > 1 &&
                    <button onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>Prev</button>
                }
                {pages.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => <span className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                                      key={p} onClick={(e) => {
                        onPageChanged(p)
                    }}>{p}</span>)
                }

                {
                    portionCount > portionNumber &&
                    <button onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>Next</button>
                }
            </div>
        </div>
    )
}
