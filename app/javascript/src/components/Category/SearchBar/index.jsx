import React from 'react'
import Input from '../../commons/Input';

const SearchBar = ({searchKey,setSearchKey}) => {
  return (
    <div className="absolute left-2 w-72 mb-2 z-10">
         <Input
          type="Search"
          className="w-full px-2 py-1 border rounded-lg shadow-md"
          value={searchKey}
          onChange={({ target: { value } }) => {
            setSearchKey(value);
          }}
        />
    </div>
  )
}

export default SearchBar