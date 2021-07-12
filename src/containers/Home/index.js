import { useAuth0 } from '@auth0/auth0-react'
import { Redirect } from 'react-router-dom'

function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  if (isAuthenticated) {
    return <Redirect push to='/search' />
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      type='button'
      className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
      Login
    </button>
  )
}

export default Home
