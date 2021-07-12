import axios from 'axios'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { SearchIcon } from '@heroicons/react/outline'

import Loading from '../../components/Loading'
import MovieItem from '../../components/MovieItem'

function MovieSearch() {
  const [inputValue, setInputValue] = useState('')
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['movies', inputValue],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${inputValue}&language=en-US&page=1&include_adult=false`,
      ),
    {
      enabled: false,
    },
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  return (
    <main className='flex-1 justify-between sm:flex-col my-4 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
      <div className='flex-1 flex border-b border-gray-300'>
        <form
          className='w-full flex md:ml-0'
          onSubmit={e => {
            e.preventDefault()
            refetch()
          }}>
          <label htmlFor='search-field' className='sr-only'>
            Search
          </label>
          <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
            <div
              className='absolute inset-y-0 left-0 flex items-center pointer-events-none'
              aria-hidden='true'>
              <SearchIcon className='h-5 w-5' aria-hidden='true' />
            </div>
            <input
              id='search-field'
              name='search-field'
              className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm'
              placeholder='Search Movies'
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value)
              }}
              type='search'
            />
          </div>
        </form>
      </div>
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data?.data?.results?.map(movie => (
          <MovieItem movie={movie} key={movie.id} />
        ))}
      </ul>
    </main>
  )
}

export default MovieSearch
