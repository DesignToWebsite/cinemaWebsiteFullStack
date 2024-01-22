import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchInput = ({ setMovies}) => {
  // console.log(setMovies)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('name'); 

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
const handleSearch = async () => {
    try {
  
      const baseUrl = "http://127.0.0.1:8000/api/movies?includeReservations=true";
    let encodeSearchInput = encodeURIComponent(searchTerm);
let optionSearch = 'contains';
    if(selectedOption == 'price' || selectedOption == 'top'){
optionSearch = 'eq'
}
if(selectedOption == 'top'){
encodeSearchInput = searchTerm == "false" ? 0 : 1;
}
console.log(`${baseUrl}&&${selectedOption}[${optionSearch}]=${encodeSearchInput}`);

const MoviesData = await axios.get(
        `${baseUrl}&&${selectedOption}[${optionSearch}]=${encodeSearchInput}`
      );
      setMovies(MoviesData.data);
      console.log(MoviesData.data)
    } catch (error) {
      console.error("Error while searching:", error);
    } 
  };
  

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <Dropdown onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="time">Time</option>
        <option value="age">Age</option>
        <option value="category">Category</option>
        <option value="actors">Actor</option>
        <option value="top">Top</option>
        {/* Add more options as needed */}
      </Dropdown>
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  padding: 8px;
  border-radius: 5px;
  max-width : 70%;
  margin : 2em auto 3em auto;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  background-color: #2a2a2a;
  color: white;
  border-radius: 5px;
  outline: none;
`;

const Dropdown = styled.select`
  background-color: #2a2a2a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-right: 8px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #a10101;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

export default SearchInput;
