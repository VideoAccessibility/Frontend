import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/video-search/${searchQuery}`);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit}
      sx={{
        borderRadius: '10px',
        border: '1px solid #33363F',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
      }}
    >
    {/* Here is where the search functionality is going to be placed */}
      <input
        className='search-bar'
        placeholder="Search videos"
        value={searchQuery}
        onChange={handleChange}
      />
      <IconButton 
      type='submit' 
      sx={{ 
        p: '10px', 
        color: '#33363F' }} 
        aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
