import { useParams, Route, Switch} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoThunk, getAllImages} from '../../store/userInfo';
import ProfileNav from './ProfileNav';
import UserInfo from '../UserInfo';
import PhotoStream from '../PhotoStream';
import Albums from './Albums';
import Favorites from './Favorites';
import About from './About';
import Edit from './Edit';

function UsersProfile() {
    const dispatch = useDispatch();

    const { userId } = useParams();

    const userInfo = useSelector(state => state.currentUser.info);
    const photos = useSelector(state => state.currentUser.photos);
    const following = useSelector(state => state.currentUser.followings);
    const followers = useSelector(state => state.currentUser.followers);

    const data = {
        userInfo,
        following: following,
        followers: followers,
        photos: photos?.length,
        background: photos
    };


    useEffect(() => {
        dispatch(getInfoThunk(userId));
        dispatch(getAllImages(userId))
    },[dispatch, userId]);

    return (
        <>  
            {+userId === userInfo?.id && (
                <>
                    <UserInfo data={data} />
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
                            <Favorites />
                        </Route>
                        <Route path='/users/:userId'>
                            <p style={{textAlign: 'center', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px'}}>Photostream</p>
                            <PhotoStream photos={photos}/>
                        </Route>
                    </Switch>
                </>
            )}
        </>
    )
}

export default UsersProfile;