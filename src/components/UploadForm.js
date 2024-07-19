import React, { useState, useEffect } from 'react';

const clientId = '188124134082-mrlo7diuq7jveikp32ietkpp3avm7818.apps.googleusercontent.com';
const clientSecret = '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';
const API_KEY = 'AIzaSyBCmq3MfiWdajySkLroO86plbfiZpqp30w';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [peopleNames, setPeopleNames] = useState('');
  const [location, setLocation] = useState('');
  const [gapiLoaded, setGapiLoaded] = useState(false);

  useEffect(() => {
    // Load the Google APIs client library
    window.gapi.load('client:auth2', initClient);
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: clientId,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      scope: SCOPES,
    }).then(() => {
      setGapiLoaded(true);
      console.log('Google API client initialized');
    }).catch((error) => {
      console.error('Error initializing Google API client:', error);
    });
  };

  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleUpload = () => {
    if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.log('User is not signed in');
      handleAuthClick();
      return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('peopleNames', peopleNames);
      formData.append('location', location);

      fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}`,
          'Content-Type': 'multipart/related; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        }),
        body: formData,
      }).then(response => response.json())
        .then(data => {
          console.log('Upload successful:', data);
        }).catch(error => {
          console.error('Error uploading file:', error);
        });
    };
    fileInput.click();
  };

  return (
    <div className="upload-form">
      <title>McFly's Wedding Memories!</title>
      <button onClick={handleUpload} disabled={!gapiLoaded}>Upload</button>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Names of People in Images"
        value={peopleNames}
        onChange={(e) => setPeopleNames(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
};

export default UploadForm;

