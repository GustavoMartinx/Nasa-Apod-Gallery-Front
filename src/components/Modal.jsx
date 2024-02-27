import { React, useState, useRef } from "react";
import Lists from './Lists';
import { formatDate } from "../utils";

const Modal = ({ selectedImg, setSelectedImg, savedCollections }) => {

  const [isChoosing, setIsChoosing] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const [dropdownPosition, setDropdownPosition] = useState({ bottom: 0, right: 0 });
  const modalRef = useRef(null);

  const handleClickOut = (e) => {
    // verifica se o elemento clicado tem a classe 'backdrop': se sim, fechará a img ampliada
    // se não, isto é, se o elemento clicado for a img, a img não será fechada
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }

  const handleSaveImage = (e) => {
    setIsChoosing(!isChoosing);

    const buttonRect = e.target.getBoundingClientRect();
    const modalRect = modalRef.current.getBoundingClientRect();

    const bottom = modalRect.bottom - buttonRect.bottom + buttonRect.height;
    const right = modalRect.left;

    setDropdownPosition({ bottom, right });

  }

  const toggleSelection = (listName) => {
    if (selectedCollections.includes(listName)) {
      setSelectedCollections(selectedCollections.filter(name => name !== listName));
    } else {
      setSelectedCollections([...selectedCollections, listName]);
    }
  };
  
  const handleFinishChoice = () => {
    const selectedCollectionsToSave = savedCollections.filter(listName => selectedCollections.includes(listName));
    // console.log("selectedCollectionsToSave", selectedCollectionsToSave);
    // enviar selectedCollectionsToSave
  };
  

  const formattedDate = formatDate(selectedImg.date);

  return (
    <div className="backdrop" onClick={handleClickOut}>
      <div className="modal-content" ref={modalRef}>
        <img src={selectedImg.hdurl ? selectedImg.hdurl : selectedImg.url} alt="enlarged picture" />

        <div className="info">
          <p className="selected-img-title">{selectedImg.title}</p>
          <p className="date">{formattedDate}</p>
          <div className="description">{selectedImg.description}</div>
          {selectedImg.copyright && <p className="copyright">Copyright: {selectedImg.copyright}</p>}

          <div className="modal-footer">
            <button onClick={handleSaveImage}>Salvar</button>
            <button>Download</button>
          </div>

        </div>
        {isChoosing && (
          <div
            className="choosing-collections"
            style={{ bottom: dropdownPosition.bottom, right: dropdownPosition.right }}>
            <div className="mini-header">
              <h4>Adicionar à lista</h4>
              <span onClick={() => setIsChoosing(false)} className="close material-symbols-outlined">close</span>
            </div>
            {savedCollections.map((listName, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(listName)}
                    onChange={() => toggleSelection(listName)}
                  />
                  {listName}
                </label>
                <div className="separator"> </div>
              </div>
            ))}
            <button onClick={handleFinishChoice}>Concluir</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Modal;