import './styles.css'
import React, { useState, useEffect } from "react";
const Modal = ({ msg, yes, no }) => {
    const [isValid, setIsValid] = useState(true);

    const handleBtn = (e) => {
        if (e.target.id === "yes") {

        } else {

        }
    }

    return (

        <div class="modal-w" style={{ display: !isValid ? "block" : "none" }}>
            <div class="modal__background-w"></div>
            <div class="modal__content-w">

                <div class="logo-w"></div>
                <p class="modal__copy-w">{msg}</p>

                <div class="modal__action-buttons-w modal__action-buttons--stacked-w">
                    <button id="yes" onClick={handleBtn}>{yes}</button>
                    <button id="no" onClick={handleBtn}>{no}</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;