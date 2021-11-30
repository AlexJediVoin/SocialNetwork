import React from "react";
import s from "./ProfileInfo.module.css";

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6r0BJokCLDfJfqE8rlDmhQzHI-81mL6h07Q&usqp=CAU"
                    alt="img-content"/>
            </div>
            <div className={s.descriptionBlock}> ava + description</div>
        </div>
    )
}