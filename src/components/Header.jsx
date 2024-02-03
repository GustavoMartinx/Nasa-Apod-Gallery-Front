import React, { useState } from 'react';
import Lists from './Lists';

const Header = () => {
    
  const lists = ['Lista 1', 'Lista 2', 'Lista 3'];
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleManageList = (listName) => {
    console.log(`Gerenciar lista: ${listName}`);
    // lógica para abrir o menu de gerenciamento da lista
  };

  return (
    <div className="header">
      <div className="logo">Nasa Apod Gallery</div>

      <div className="favorites">
      <span onClick={toggleDropdown} role="img" title="Favoritos">⭐</span>
      {isDropdownOpen && (
          <div className="favoritos-dropdown">
            {lists.map((listName, index) => (
                <Lists
                key={index}
                listName={listName}
                onManageList={handleManageList}
                />
                ))}
            {/* componente para criar nova lista aqui */}
        </div>
      )}
      </div>

      <div className="settings">Configurações</div>
      <div className="account">Conta</div>

    </div>
  );
};

export default Header;
