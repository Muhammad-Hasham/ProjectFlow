import React, { useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';


function Header() {
  
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [channels] = useCollection(db.collection('rooms'));
  const dispatch = useDispatch();

  const filteredChannels = channels?.docs.filter((doc) =>
    doc.data().name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChannelClick = (channelId) => {
    dispatch(enterRoom({ roomId: channelId }));
    setSearchQuery(''); // Clear the search query after selecting a channel
  };

  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar 
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon/>
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <SearchResultsContainer>
            {filteredChannels.map((doc) => (
              <SearchResult
                key={doc.id}
                onClick={() => handleChannelClick(doc.id)}
              >
                {doc.data().name}
              </SearchResult>
            ))}
          </SearchResultsContainer>
        )}
      </HeaderSearch>

      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>

  )
}

export default Header;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }

`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  //padding: 10px 0;
  background-color: var(--slack-color);
  color: white;

`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 0px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 66.5%;
  left:34%;
  right:34%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchResult = styled.div`
  padding: 8px;
  cursor: pointer;
  background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: gray;

  :hover {
    background-color: #f0f0f0;
  }
`;