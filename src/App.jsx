import React from 'react';
import Title from './components/Title.jsx';
import UploadForm from './components/UploadForm.jsx';
import Feed from './components/Feed.jsx';
import './App.css'

function App() {
  return (
    <div className="App">
      <Title/>
      <UploadForm/>
      <Feed/>
    </div>
  );
}

export default App;