import { SearchFormStyled } from './SearchbarForm.styled';
import SearchFormInput from './SearchbarInput';
import PropTypes from 'prop-types';
import SearchFormBtn from './SearchFormBtn';
import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    setSearchText(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchText);
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <SearchFormBtn />
      <SearchFormInput onChange={handleChange} value={searchText} />
    </SearchFormStyled>
  );
};

export default SearchForm;

SearchForm.propType = {
  searchText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
