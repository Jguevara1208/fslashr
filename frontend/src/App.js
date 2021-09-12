import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import UsersProfile from './components/UsersProfile';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <>
      {!sessionUser && (
        <Route exact path='/'>
          <SplashPage />
        </Route>
      )}
      {sessionUser && (
        <Navigation isLoaded={isLoaded} />
      )}
      {isLoaded && (
        <Switch>
          <Route path='/users/:userId'>
            <UsersProfile />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;