import { useState, React } from 'react';

const Lists = ({ listName, toggleManageList, setDropdownPosition }) => {
  
  
  return (
    <div className="lists">
      <span>{listName}</span>
      <button 
        onClick={(e) => {
          const buttonRect = e.target.getBoundingClientRect();
          setDropdownPosition({ top: buttonRect.bottom+5, left: buttonRect.left });
          toggleManageList();
        }}
        title='Gerenciar lista'
        className="material-symbols-outlined">
        more_horiz
      </button>
    </div>
  );
};

export default Lists;
