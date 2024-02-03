import React from 'react';

const Lists = ({ listName, onManageList }) => {
  return (
    <div className="lists">
      <span>{listName}</span>
      <button onClick={() => onManageList(listName)} title='Gerenciar lista'>
        Gerenciar
      </button>
    </div>
  );
};

export default Lists;
