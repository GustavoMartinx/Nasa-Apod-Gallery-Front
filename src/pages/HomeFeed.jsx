import React, { useState } from 'react';
import Feed from '../components/Feed.jsx';
import Modal from '../components/Modal.jsx';
import Header from '../components/Header.jsx';

function HomeFeedPage() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [savedCollections, setSavedCollections] = useState([]);
  
  return (
    <div className="HomeFeedPage">
      <Header savedCollections={savedCollections} setSavedCollections={setSavedCollections}/>
      <Feed setSelectedImg={setSelectedImg}/>
      {selectedImg &&
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          savedCollections={savedCollections}
        />
      }
    </div>
  );
}

export default HomeFeedPage;