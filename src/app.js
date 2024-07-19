import React from 'react';
import ScrollingBanner from './components/ScrollingBanner';
import UploadForm from './components/UploadForm';
import './App.css'; // Create this CSS file for global styling

const App = () => {
  return (
    <div className="App">
      <ScrollingBanner />
      <UploadForm />
    </div>
  );
};

export default App;
