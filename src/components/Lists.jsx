import { useState, React } from 'react';
import axios from 'axios';
import { getCookie } from '../utils';

const Lists = ({
  listName,
  handleManageList,
  setDropdownPosition,

  isRenamingList,
  setIsRenamingList,
  updateListName,

  managingListIndex,
}) => {

  const [newListName, setNewListName] = useState(listName);

  async function renameList() {

    const data = {
      current_collection_name: listName,
      new_collection_name: newListName,
    }

    await axios.put('http://localhost:8000/saved-collections/rename/', data, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        // console.log("Collections sent:", data);
        // console.log("response", response);
        updateListName(newListName);
      })
      .catch(error => {
        // console.log("Collections sent:", data);
        // console.error(error);
        alert(`Error: ${error.response.data.error}`);
      })
      .finally(() => {
        setIsRenamingList(false);
      });
  }

  return (
    <div className="lists">
      {!isRenamingList ? (
        <>
          <span>{listName}</span>
          <button
            onClick={(e) => {
              const buttonRect = e.target.getBoundingClientRect();
              setDropdownPosition({ top: buttonRect.bottom + 5, left: buttonRect.left });
              handleManageList(managingListIndex);
            }}
            title='Gerenciar lista'
            className="material-symbols-outlined">
            more_horiz
          </button>
        </>

      ) : (
        <input
          className="rename-input"
          key={managingListIndex}
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              renameList();
              setIsRenamingList(false);
            }
          }} />
      )}

    </div>
  );
};

export default Lists;
