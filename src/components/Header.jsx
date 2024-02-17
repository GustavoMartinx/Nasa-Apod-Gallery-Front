import React, { useEffect, useState } from 'react';
import Lists from './Lists';
import axios from 'axios';
import { getCookie } from '../utils';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const Header = () => {

  const [username, setUsername] = useState('');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const lists = ['Lista 1', 'Lista 2', 'Lista 3', 'Lista 4'];
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [creatingList, setCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    getUserData();
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
        alert(`${response.data.message}`);
        setCreatingList(false);
      })
      .catch(error => {
        console.log("Collection name sent:", data);
        console.error(error);
        setCreatingList(false);
      });

    setCreatingList(false); // Fecha o formulário de criação
    setNewListName('');    // Limpa o campo de texto
  }

  const handleManageList = (listName) => {
    console.log(`Gerenciar lista: ${listName}`);
  };

  const getUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/profile/', {
        withCredentials: true,
      });
      const userData = response.data;
      setUsername(userData.username);
      setUserName(userData.name);
      setUserPicture(userData.picture);
      console.log("User Data:", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
                onClick={handleCreateListForm}
                className='create-list'>
                <span className='create-list-icon material-symbols-outlined'>add</span>
                <h4>Criar lista</h4>
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
