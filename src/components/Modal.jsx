import React from "react";

const Modal = ({ selectedImg, setSelectedImg }) => {

    const handleClick = (e) => {
        // verifica se o elemento clicado tem a classe 'backdrop': se sim, fechará a img ampliada
        // se não, isto é, se o elemento clicado for a img, a img não será fechada
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={selectedImg} alt="enlarged picture" />
        </div>
    )
}

export default Modal;