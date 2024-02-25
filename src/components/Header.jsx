import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie, getUserData, getSavedCollections, updateListName, deleteSavedCollection } from '../utils';
import ConfirmationPopup from './ConfirmationPopup';
import Lists from './Lists';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const Header = () => {

  const [username, setUsername] = useState('');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  const [creatingList, setCreatingList] = useState(false);
  const [isRenamingList, setIsRenamingList] = useState(false);
  const [managingListIndex, setManagingListIndex] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isManageListOpen, setManageListOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
    setManageListOpen(false);
    setIsRenamingList(false);
  };

  const handleCreateListForm = () => {
    setCreatingList(!creatingList);
    setManageListOpen(false);
    setIsRenamingList(false);
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

    setCreatingList(false);
    setNewListName('');
  }

  const handleManageList = (managingListIndex) => {
    setManageListOpen(!isManageListOpen);
    setIsRenamingList(false);

    setManagingListIndex(managingListIndex);
  };

  const handleRenameList = () => {
    setIsRenamingList(true);
    setManageListOpen(false);
  }


  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    
    async function deleteList() {
      const listNameToDelete = lists[managingListIndex];
      
      await axios.delete(`http://localhost:8000/saved-collections/delete/${listNameToDelete}`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response.data.message);
        deleteSavedCollection(lists, listNameToDelete, setLists);
      })
      .catch(error => {
        console.error("Error deleting list:", error);
        alert(`Error: ${error.response.data.error}`);
      });
    }
    deleteList();

    setShowDeleteConfirmation(false);
    setManageListOpen(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
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
                <div key={index}>
                  <Lists
                    listName={listName}
                    handleManageList={handleManageList}
                    setDropdownPosition={setDropdownPosition}

                    managingListIndex={index}
                    isRenamingList={isRenamingList && managingListIndex === index}
                    setIsRenamingList={setIsRenamingList}
                    updateListName={(newName) => updateListName(listName, newName, lists, setLists)}
                  />
                  <div className="separator"> </div>
                </div>
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

              <div className="menu-button" onClick={handleRenameList}>
                <span className="material-symbols-outlined">edit</span>
                Editar
              </div>

              <div className="separator"> </div>

              <div className="menu-button delete" onClick={handleDeleteClick}>
                <span className="material-symbols-outlined">delete</span>
                Excluir
              </div>
              {showDeleteConfirmation && (
                <ConfirmationPopup
                  message="Tem certeza que deseja deletar a lista de imagens?"
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancelDelete}
                />
              )}
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
