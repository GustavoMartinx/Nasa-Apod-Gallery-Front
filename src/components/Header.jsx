import React, { useEffect, useState } from 'react';
import Lists from './Lists';
import axios from 'axios';
import { getCookie, getUserData, getSavedCollections } from '../utils';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const Header = () => {

  const [username, setUsername] = useState('');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  const [creatingList, setCreatingList] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isManageListOpen, setManageListOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    async function fetchData() {

      // Obtendo os dados do usuário
      const userData = await getUserData();
      if (userData) {
        setUsername(userData.username);
        setUserName(userData.name);
        setUserPicture(userData.profile_picture);
      }

      // Obtendo as listas de imagens salvas do usuário
      const savedCollections = await getSavedCollections();
      if (savedCollections) {
        setLists(savedCollections);
      }
    }

    fetchData();
  }, [])

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setCreatingList(false);
  };

  const handleCreateListForm = () => {
    setCreatingList(!creatingList);
  };

  const handleCreateList = () => {

    const data = {
      collection_name: newListName,
    }

    axios.post('http://localhost:8000/saved-collections/create/', data, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log("Collection name sent:", data);
        console.log("response", response);

        setLists([...lists, newListName]);
        alert(`${response.data.message}`);
        setCreatingList(false);
      })
      .catch(error => {
        console.log("Collection name sent:", data);
        console.error(error);
        alert(`Error: ${error.response.data.error}`);
        setCreatingList(false);
      });

    setCreatingList(false); // Fecha o formulário de criação
    setNewListName('');    // Limpa o campo de texto
  }

  const handleManageList = (listName) => {
    setManageListOpen(!isManageListOpen);
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
                <>
                  <Lists
                    key={index}
                    listName={listName}
                    toggleManageList={handleManageList}
                    setDropdownPosition={setDropdownPosition}
                  />
                  <div className="separator"> </div>
                </>
              ))}
              {creatingList && (
                <div className="create-list-form">
                  <input
                    className="create-list-input"
                    type="text"
                    placeholder="Nome da lista"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                  <button onClick={handleCreateList} className="create-list-button" >Criar</button>
                </div>
              )}
              <div
                className='create-list'
                onClick={handleCreateListForm}
                title='Crie uma nova lista para salvar imagens'>
                <span className='create-list-icon material-symbols-outlined'>add</span>
                <h4>Criar lista</h4>
              </div>
            </div>
          )}
          {isManageListOpen && isDropdownOpen && (
            <div
              className="menu"
              style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>

              <div className="menu-button">
                <span className="material-symbols-outlined">edit</span>
                Editar
              </div>

              <div className="separator"> </div>

              <div className="menu-button delete">
                <span className="material-symbols-outlined">delete</span>
                Excluir
              </div>
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
