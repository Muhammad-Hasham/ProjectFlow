import './App.css';
import React, {useEffect } from 'react';
import LoginButton from './login';
import LogoutButton from './logout';
import { gapi } from 'gapi-script';


const client_Id = process.env.REACT_APP_CLIENT_ID;
const api_key = process.env.REACT_APP_API_KEY;
const Scopes = 'https://www.googleapis.com/auth/drive.file';


function App() {

  useEffect(() => {
    async function start() {
      try {
        await gapi.client.init({
          apiKey: api_key,
          clientId: client_Id,
          scope: Scopes
        });
      } catch (error) {
        console.error('Error initializing gapi:', error);
      }
    }
  
    gapi.load('client:auth2', start);
  }, []);

  function createFile() {
    var accessToken = gapi.auth.getToken().access_token;

    fetch('https://docs.googleapis.com/v1/documents', {
      method: "POST",
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken}),
    }).then ((res) =>{
      return res.json();
    }).then (function(val){
      console.log(val);
      console.log(val.documentId);
      window.open('https://docs.google.com/document/d/' + val.documentId + '/edit', "_blank");
    })
  }

  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
      <button onClick={() => createFile()}>Create new Google Document</button>
    </div>
  );
}

export default App;
