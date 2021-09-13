import './UserProfileBanner.css';
import { useSelector } from 'react-redux';
import UserInfo from '../../UserInfo';

function UserProfileBanner({data}) {

    const sessionUserId = useSelector(state => state.session.user.id);
    const { photos, background } = data;
    const randomPhotoNum = Math.floor(Math.random() * photos);
    
    return (
        <>
            {data && (
                <div className='banner' style={{ backgroundImage: `url('${background[randomPhotoNum].imgUrl}')` }} >
                    <UserInfo data={data}/>
                    <p>{photos} Photos</p>
                </div>
            )}
        </>
    )
};

export default UserProfileBanner;