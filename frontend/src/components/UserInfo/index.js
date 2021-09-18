import user from './UserInfo.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { followUser, unfollowUser } from '../../store/userInfo';
import { Link } from 'react-router-dom';

function UserInfo({data}) {
    const dispatch = useDispatch();
    
    const sessionUserId = useSelector(state => state.session.user.id);
    const { userInfo, followers, following, photos, background } = data;
    
    const [follow, setFollow] = useState(true);
    const [followersNumber, setFollowersNumber] = useState(followers.length);
    
    useEffect(() => {
        const follows = followers?.find(follower => follower.id === sessionUserId);
        const followBool = follows === undefined ? false : true;
    
        setFollow(followBool);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleButton = () => {
        if (!follow) {
            setFollow(!follow);
            setFollowersNumber(followersNumber + 1)
            dispatch(followUser(userInfo.id));
        } else {
            setFollow(!follow);
            setFollowersNumber(followersNumber - 1)
            dispatch(unfollowUser(userInfo.id));
        };
    };
    return (
        <div className={user.container} style={{backgroundImage: `url('${background?.[background?.length - 1]?.imgUrl}')`}}>
            <div className={user.wrapper}>
                    <Link to={`/users/${userInfo.id}`}><div className={user.avatar} style={{ backgroundImage: `url('${userInfo.avatarUrl}')` }} /></Link>
                <div className={user.info}>
                        <p className={user.name} >{userInfo.firstName} {userInfo.lastName}</p>
                    <div className={user.moreInfo}>
                        <p className={user.text}>{userInfo.username}</p>
                        <div className={user.follows}>
                            <p className={user.text} >{following?.length} Following</p>
                            <p className={user.text} >{followersNumber} Followers</p>
                        </div>
                    </div>
                    <div className={user.photoAndFollow}>
                        <p className={user.text}>{photos} Photos</p>
                        {(sessionUserId !== userInfo?.id && follow) && <button className={`${user.true} ${user.button}`} onClick={() => handleButton()}>Unfollow</button>}
                        {(sessionUserId !== userInfo?.id && !follow) && <button className={`${user.false} ${user.button}`} onClick={() => handleButton()}>Follow</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;