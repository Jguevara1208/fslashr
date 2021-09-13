import './UsersProfile.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoThunk } from '../../store/userInfo'
import ProfileNav from './ProfileNav'
import UserProfileBanner from './UserProfileBanner';
import PhotoStream from '../PhotoStream';
import Albums from './Albums'
import Favorites from './Favorites'
import About from './About'
import Edit from './Edit'
import { useParams, Route, Switch} from 'react-router-dom';

function UsersProfile() {
    const dispatch = useDispatch();

    const { userId } = useParams()

    const userInfo = useSelector(state => state.currentUser.info)
    const photos = useSelector(state => state.currentUser.photos)
    const following = useSelector(state => state.currentUser.followings)
    const followers = useSelector(state => state.currentUser.followers)
    const favorites = useSelector(state => state.currentUser.favorites)

    const data = {
        userInfo,
        following: following,
        followers: followers,
        photos: photos?.length,
        background: photos
    }

    useEffect(() => {
        dispatch(getInfoThunk(userId))
    },[dispatch, userId])

    return (
        <>  
            {+userId === userInfo?.id && (
                <>
                    <UserProfileBanner data={data} />
                    <ProfileNav />
                    <Switch>
                        <Route path='/users/:userId/edit'>
                            <Edit photos={photos}/>
                        </Route>
                        <Route path='/users/:userId/about'>
                            <About user={userInfo} followers={followers} following={following}/>
                        </Route>
                        <Route path='/users/:userId/albums'>
                            <Albums />
                        </Route>
                        <Route path='/users/:userId/favorites'>
                            <Favorites favorites={favorites}/>
                        </Route>
                        <Route path='/users/:userId'>
                            <PhotoStream photos={photos}/>
                        </Route>
                    </Switch>
                </>
            )}
        </>
    )
}

export default UsersProfile;