import React, { useState, useEffect } from "react";
const ImgBlockError = ({ status }) => {

    return (
        <div className="showBlock" style={{ display: status }}>
            <div className="showBlock_container">
                <h4 className="showBlock__heading">Размер изображения превышает 1 Мб, выберите другую картинку, либо уменьшите размер и повторите попытку.</h4>
                <a className="showBlock__link" href="https://imagecompressor.com/ru/" target="_blank"> Сервис для оптимизации фотографии</a>
            </div>
        </div >
    );
}

export default ImgBlockError;