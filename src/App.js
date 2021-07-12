import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import Loading from './components/Loading'
import { useAuth0 } from '@auth0/auth0-react'

const Home = lazy(() => import('./containers/Home'))
const MovieSearch = lazy(() => import('./containers/MovieSearch'))

function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route exact path='/' component={Home} />
          <Route path='/search' component={MovieSearch} />
        </Suspense>
      </Switch>
    </>
  )
}

export default App
