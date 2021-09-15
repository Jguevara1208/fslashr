import './UserProfileBanner.css';
import UserInfo from '../../UserInfo';

function UserProfileBanner({data}) {

    const { photos } = data;
    
    return (
        <>
            {data && (
                <div className='banner' >
                    <UserInfo data={data}/>
                    <p>{photos} Photos</p>
                </div>
            )}
        </>
    )
};

export default UserProfileBanner;