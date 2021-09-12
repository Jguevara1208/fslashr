import './UserProfileBanner.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { followUser, unfollowUser } from '../../store/userInfo'

function UserProfileBanner({data}) {
    const dispatch = useDispatch()

    const sessionUserId = useSelector(state => state.session.user.id)
    const { userInfo, followers, following, photos, background } = data
    const randomPhotoNum = Math.floor(Math.random() * photos)
    const follows = followers.find(follower => follower === sessionUserId)
    const followBool = follows === undefined ? false : true
    const [follow, setFollow] = useState(followBool)

    
    const handleButton = () => {
        console.log(follow)
        setFollow(!follow)
        if (follow) {
            dispatch(followUser(userInfo.id))
        } else {
            dispatch(unfollowUser(userInfo.id))
        }
    }



    return (
        <>
            {userInfo && (
                <div className='banner' style={{ backgroundImage: `url('${background[randomPhotoNum].imgUrl}')` }} >
                    <div className='avatar__user-profile' style={{ backgroundImage: `url('${userInfo.avatarUrl}')` }} />
                    <p>{userInfo.firstName} {userInfo.lastName}</p>
                    <p>{userInfo.userName}</p>
                    {sessionUserId !== userInfo?.id && (
                        <button className={follow} onClick={() => handleButton()}>Follow</button>
                    )}

                    <p>{followers?.length} Followers</p>
                    <p>{following?.length} Following</p>
                    <p>{photos.length} Photos</p>
                </div>
            )}
        </>
    )
}

export default UserProfileBanner;