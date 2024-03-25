import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://www.gstatic.com/images/icons/material/product/2x/docs_48dp.png"
          alt="Google Logo"
        />
        <h1>Sign in to Google</h1>
        <p>To create a Google Document</p>

        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '50px' }}
          isSignedIn={true}
        />
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    
    >img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 0px;
    }

    >button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;
    }
`;