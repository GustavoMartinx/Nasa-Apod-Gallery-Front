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
            <img src={selectedImg.hdurl} alt="enlarged picture" />

            <div>
                <p>{selectedImg.title}</p>
                <p>{selectedImg.date}</p>
                <p>{selectedImg.description}</p>
                <p>{selectedImg.copyright}</p>
            </div>
        </div>
    )
}

export default Modal;