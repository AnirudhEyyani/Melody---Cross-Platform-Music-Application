import { SearchIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import Songs from '../components/Songs';

const Search = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const debouncedSearchResult = useCallback(
    debounce(async (search) => {
        if(search){
          try {
            setLoading(true)
            const {data} = await axios.get(`/melody-24def/us-central1/searchSongs?search=${search}`)
            setSearchResults(data)
            setLoading(false)
          } catch (error) {
            setError(error.message)
          }
        }
    }, 500),
    []
  )

  useEffect(()=> {
    debouncedSearchResult(search)
  },[search])

  return(
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide  text-white bg-black">
        {/* search box */}
        <div className='bg-black flex items-center p-4'>
            <div className='flex items-center w-full py-1 px-4 rounded-full bg-[#323739]'>
                <SearchIcon className="text-[#B1B3B5] w-10 "/>
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="text" className="bg-[#323739] text-gray-200 pl-4 focus:outline-none flex-grow" placeholder='Search for songs'/>
            </div>
        </div>
        {/* search Results */}
        <Songs searchResults={searchResults} loading={loading} error={error} />

    </div>
  );
};

export default Search;
