import React from 'react';

const Lists = ({ listName, onManageList }) => {
  return (
    <div className="lists">
      <span>{listName}</span>
      <button onClick={() => onManageList(listName)} title='Gerenciar lista' className="material-symbols-outlined">
      more_horiz
      </button>
    </div>
  );
};

export default Lists;
