import React from "react";
import preloader from "../../../assets/images/preloader.gif";

const Preloader = () => {
    return (
        <>
            <img src={preloader} alt={"Загрузка старницы"}/>
        </>
    );
};

export default Preloader;