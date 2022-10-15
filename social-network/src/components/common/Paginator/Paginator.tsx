import React from "react";
import styles from "../Paginator/Paginator.module.css";
type UsersPropsType = {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
};
export const Paginator: React.FC<UsersPropsType> = ({totalCount,pageSize,currentPage,onPageChanged}) => {
    let pageCount = Math.ceil(totalCount / pageSize);
    let pages: number[] = [];
    for (let i: number = 1; i < pageCount; i++) {
        pages.push(i);
    }
    return (
            <div>
                {pages.map((el, i) => <span key={i}
                                            className={currentPage === el ? styles.pageSelected : ""}
                                            onClick={() => {
                                                onPageChanged(el)
                                            }}>{el}</span>)}
            </div>
    )
};