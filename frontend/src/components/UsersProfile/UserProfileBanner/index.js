import './UserProfileBanner.css';
import UserInfo from '../../UserInfo';

function UserProfileBanner({data}) {

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