import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import UsersProfile from './components/UsersProfile';
import AlbumPage from './components/AlbumPage';
import ImageUpload from './components/ImageUpload';
import ImagePage from './components/ImagePage';
import NewAlbum from './components/NewAlbum'
import EditAlbum from './components/EditAlbum'
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
          <Route exact path='/albums/new'>
            <NewAlbum />
          </Route>
          <Route exact path='/albums/:albumId/edit'>
            <EditAlbum />
          </Route>
          <Route exact path='/albums/:albumId'>
            <AlbumPage />
          </Route>
          <Route path='/users/:userId'>
            <UsersProfile />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/images/upload'>
            <ImageUpload />
          </Route>
          <Route path='/images/:photoId'>
            <ImagePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;