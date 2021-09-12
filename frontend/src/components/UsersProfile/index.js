import './UsersProfile.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoThunk } from '../../store/userInfo'
import ProfileNav from '../ProfileNav'
import UserProfileBanner from '../UserProfileBanner';
import PhotoStream from '../PhotoStream';
import { useParams } from 'react-router';

function UsersProfile() {
    const dispatch = useDispatch();

    const { userId } = useParams()

    const userInfo = useSelector(state => state.currentUser.info)
    const photos = useSelector(state => state.currentUser.photos)
    const following = useSelector(state => state.currentUser.followings)
    const followers = useSelector(state => state.currentUser.followers)

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
                    <PhotoStream photos={photos}/>
                </>
            )}
        </>
    )
}

export default UsersProfile;