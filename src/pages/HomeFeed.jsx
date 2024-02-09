import React, { useState } from 'react';
import Feed from '../components/Feed.jsx';
import Modal from '../components/Modal.jsx';
import Header from '../components/Header.jsx';

function HomeFeedPage() {
  const [selectedImg, setSelectedImg] = useState(null);
  
  return (
    <div className="HomeFeedPage">
      <Header/>
      <Feed setSelectedImg={setSelectedImg}/>
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
    </div>
  );
}

export default HomeFeedPage;