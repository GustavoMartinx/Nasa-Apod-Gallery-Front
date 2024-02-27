import { React, useState, useEffect } from "react";
import Lists from './Lists';
import { formatDate } from "../utils";

const Modal = ({ selectedImg, setSelectedImg, savedCollections }) => {

  const [isChoosing, setIsChoosing] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const handleClickOut = (e) => {
    // verifica se o elemento clicado tem a classe 'backdrop': se sim, fechará a img ampliada
    // se não, isto é, se o elemento clicado for a img, a img não será fechada
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }

  const handleSaveImage = (e) => {
    setIsChoosing(!isChoosing);
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

  useEffect(() => {
    let button = document.querySelectorAll('.call-to-action');
    button.forEach(button => {
      button.onmousemove = function (e) {
        let x = e.pageX - button.offsetLeft;
        let y = e.pageY - button.offsetTop;

        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
      }
    });
  }, []);

  const formattedDate = formatDate(selectedImg.date);

  return (
    <div className="backdrop" onClick={handleClickOut}>
      <div className="modal-content">
        <img src={selectedImg.hdurl ? selectedImg.hdurl : selectedImg.url} alt="enlarged picture" />

        <div className="info">
          <p className="selected-img-title">{selectedImg.title}</p>
          <p className="date">{formattedDate}</p>
          <div className="description">{selectedImg.description}</div>
          {selectedImg.copyright && <p className="copyright">Copyright: {selectedImg.copyright}</p>}

          <div className="modal-footer">
            <button onClick={handleSaveImage} title="Salvar esta imagem em suas listas" className="modal-button call-to-action"> <span>SALVAR</span> </button>
            <button title="Baixar esta imagem em seu dispositivo" className="modal-button call-to-action"> <span>DOWNLOAD</span> </button>
          </div>

        </div>
        {isChoosing && (
          <div className="backdrop">
            <div className="choosing-collections">
            <div className="mini-header">
              <h4>Adicionar à lista</h4>
              <span onClick={() => setIsChoosing(false)} className="close material-symbols-outlined">close</span>
            </div>
            <div className="choosing-collections-list">
            {savedCollections.map((listName, index) => (
              <div key={index} className="checkbox-container">
                <label className="checkbox-listname">
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
            </div>
            <div className="choises-footer">
              <button className="cancel-choice cancel-button" onClick={() => setIsChoosing(false)}>Cancelar</button>
              <button className="save-button call-to-action" onClick={handleFinishChoice}> <span>Salvar</span> </button>
            </div>
          </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Modal;