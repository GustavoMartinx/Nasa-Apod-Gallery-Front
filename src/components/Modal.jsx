import React from "react";
import { formatDate } from "../utils";

const Modal = ({ selectedImg, setSelectedImg }) => {

    const handleClick = (e) => {
        // verifica se o elemento clicado tem a classe 'backdrop': se sim, fechará a img ampliada
        // se não, isto é, se o elemento clicado for a img, a img não será fechada
        if (e.target.classList.contains('backdrop')) {
            setSelectedImg(null);
        }
    }

    const formattedDate = formatDate(selectedImg.date);

    return (
        <div className="backdrop" onClick={handleClick}>
            <div className="modal-content">
                <img src={selectedImg.hdurl ? selectedImg.hdurl : selectedImg.url} alt="enlarged picture" />

                <div className="info">
                    <p className="selected-img-title">{selectedImg.title}</p>
                    <p className="date">{formattedDate}</p>
                    <div className="description">{selectedImg.description}</div>
                    {selectedImg.copyright && <p className="copyright">Copyright: {selectedImg.copyright}</p>}
                        
                    {/* <div className="modal-footer"> */}
                        {/* <button>Save to my List</button>
                        <button>Download</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Modal;