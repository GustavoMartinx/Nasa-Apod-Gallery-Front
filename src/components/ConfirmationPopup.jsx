import React from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup backdrop">
      <div className="popup-content">
        <div className="mini-header">
          <h4>Excluir Lista</h4>
          <span onClick={onCancel} className="close material-symbols-outlined">close</span>
        </div>
        <p className="description">{message}</p>
        <div className="popup-buttons">
          <button className="cancel-button" onClick={onCancel}>Cancelar</button>
          <button className="delete-button" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;