import './UserProfileBanner.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { followUser, unfollowUser } from './../../../store/userInfo';

function UserProfileBanner({data}) {
    const dispatch = useDispatch();

    const sessionUserId = useSelector(state => state.session.user.id);
    const { userInfo, followers, following, photos, background } = data;
    const randomPhotoNum = Math.floor(Math.random() * photos);
    
    const [follow, setFollow] = useState(true);
    const [followText, setFollowText] = useState('Follow');
    
    useEffect(() => {
        const follows = followers?.find(follower => follower.id === sessionUserId);
        const followBool = follows === undefined ? false : true;
        const textForFollow = followBool ? 'Unfollow' : 'Follow';

        setFollow(followBool);
        setFollowText(textForFollow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleButton = () => {
        if (!follow) {
            setFollowText('Unfollow');
            setFollow(!follow);
            dispatch(followUser(userInfo.id));
        } else {
            setFollowText('Follow');
            setFollow(!follow);
            dispatch(unfollowUser(userInfo.id));
        };
    };



    return (
        <>
            {userInfo && (
                <div className='banner' style={{ backgroundImage: `url('${background[randomPhotoNum].imgUrl}')` }} >
                    <div className='avatar__user-profile' style={{ backgroundImage: `url('${userInfo.avatarUrl}')` }} />
                    <p>{userInfo.firstName} {userInfo.lastName}</p>
                    <p>{userInfo.userName}</p>
                    {sessionUserId !== userInfo?.id && (
                        <button className={follow.toString()} onClick={() => handleButton()}>{followText}</button>
                    )}

                    <p>{followers?.length} Followers</p>
                    <p>{following?.length} Following</p>
                    <p>{photos} Photos</p>
                </div>
            )}
        </>
    )
};

export default UserProfileBanner;