import React, { useState } from 'react';
import Lists from './Lists';

const Header = () => {

  const lists = ['Lista 1', 'Lista 2', 'Lista 3', 'Lista 4', 'Lista 5', 'Lista 6', 'Lista 7', 'Lista 8', 'Lista 9', 'Lista 10'];
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

      <div className="header-right">

        <div className="favorites">
          <span onClick={toggleDropdown} className="favorites-icon material-symbols-outlined" role="img" title="Suas listas de imagens salvas">star <span className='material-symbols-outlined'>expand_more</span> </span>
          {isDropdownOpen && (
            <div className="favorites-dropdown">
              <div className="mini-header">
                <h4>Suas Listas</h4>
                <span onClick={toggleDropdown} className="close material-symbols-outlined">close</span>
              </div>
              {lists.map((listName, index) => (
                <Lists
                  key={index}
                  listName={listName}
                  onManageList={handleManageList}
                />
              ))}
              <div className='create-list'> <span className='create-list-icon material-symbols-outlined'>add</span> <h4>Criar lista</h4></div>
            </div>
          )}
        </div>

        <div className="settings material-symbols-outlined" title='Configurações'>settings</div>
        <div className="account material-symbols-outlined" title='Conta'>account_circle</div>
      </div>

    </div>
  );
};

export default Header;
