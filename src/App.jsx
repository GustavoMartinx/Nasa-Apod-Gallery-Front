import React, { useState } from 'react';
import Title from './components/Title.jsx';
import UploadForm from './components/UploadForm.jsx';
import Feed from './components/Feed.jsx';
import Modal from './components/Modal.jsx';
import './App.css'

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  
  return (
    <div className="App">
      <Title/>
      <UploadForm/>
      <Feed setSelectedImg={setSelectedImg}/>
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
    </div>
  );
}

export default App;