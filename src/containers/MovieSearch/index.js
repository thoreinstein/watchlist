import axios from 'axios'

import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SearchIcon } from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'
import {
  StarIcon as StarOutline,
  PlusCircleIcon,
} from '@heroicons/react/outline'

import Loading from '../../components/Loading'

function MovieSearch() {
  const queryClient = useQueryClient()

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
          <li
            className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'
            key={movie.id}>
            <div className='flex-1 flex flex-col p-8'>
              <img
                className='w-full flex-shrink-0 mx-auto bg-black'
                src={
                  movie.poster_path === null
                    ? `https://via.placeholder.com/221x333.png?text=${encodeURI(
                        movie.title,
                      )}`
                    : `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
                }
                alt=''
              />
              <h3 className='mt-6 text-gray-900 text-2xl font-medium truncate'>
                {movie.title}
              </h3>
              <dl className='mt-1 flex-grow flex flex-col justify-between'>
                <dt className='sr-only'>Release Year</dt>
                <dd className='text-gray-500 text-sm'>
                  {movie.release_date === null
                    ? ''
                    : new Date(movie.release_date).getFullYear().toString()}
                </dd>
              </dl>
              <div className='flex justify-center items-center'>
                <div className='flex items-center mt-2 mb-4'>
                  {[...Array(Math.floor(movie.vote_average)).keys()].map(
                    star => (
                      <span className='w-6'>
                        <StarSolid key={`${movie.id}-solid-${star}`} />
                      </span>
                    ),
                  )}
                  {[...Array(10 - Math.floor(movie.vote_average)).keys()].map(
                    star => (
                      <span className='w-5'>
                        <StarOutline key={`${movie.id}-outline-${star}`} />
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className='-mt-px flex divide-x divide-gray-200'>
                <div className='w-0 flex-1 flex'>
                  <a className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
                    <PlusCircleIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='ml-3'>Add to Watchlist</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default MovieSearch
