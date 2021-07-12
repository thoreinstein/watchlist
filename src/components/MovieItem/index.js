import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { StarIcon as StarSolid, CheckCircleIcon } from '@heroicons/react/solid'
import {
  StarIcon as StarOutline,
  PlusCircleIcon,
} from '@heroicons/react/outline'

function MovieItem({ movie }) {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery(
    ['movie', movie.id],
    () =>
      axios.get(
        `https://api.themoviedb.org/3/list/7100882/item_status?api_key=${process.env.REACT_APP_TMDB_API_KEY}&movie_id=${movie.id}`,
      ),
    {
      enabled: !!movie,
    },
  )
  const item_present = data?.data?.item_present

  const mutation = useMutation(
    () =>
      axios.post(
        `https://api.themoviedb.org/3/list/7100882/add_item?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        {
          media_id: movie.id,
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['movie', movie.id])
      },
    },
  )

  return (
    <li className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'>
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
            {[...Array(Math.floor(movie.vote_average)).keys()].map(star => (
              <span key={`${movie.id}-solid-${star}`} className='w-6'>
                <StarSolid />
              </span>
            ))}
            {[...Array(10 - Math.floor(movie.vote_average)).keys()].map(
              star => (
                <span key={`${movie.id}-outline-${star}`} className='w-5'>
                  <StarOutline />
                </span>
              ),
            )}
          </div>
        </div>
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          {!item_present ? (
            <div className='w-0 flex-1 flex'>
              <button
                onClick={() => {
                  mutation.mutate()
                }}
                className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
                <PlusCircleIcon
                  className='w-5 h-5 text-gray-400'
                  aria-hidden='true'
                />
                <span className='ml-3'>Add to Watchlist</span>
              </button>
            </div>
          ) : (
            <div className='w-0 flex-1 flex'>
              <a className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500'>
                <CheckCircleIcon
                  className='w-5 h-5 text-gray-400'
                  aria-hidden='true'
                />
                <span className='ml-3'>In Watchlist</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default MovieItem
