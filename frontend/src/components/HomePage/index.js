import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoThunk } from '../../store/homepage'
import { AiOutlineHeart, AiOutlineUserAdd} from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import './HomePage.css'

function HomePage() {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const feed = useSelector(state => state.homepage.feed)

    useEffect(() => {
        dispatch(getInfoThunk(sessionUser.id))
    }, [dispatch, sessionUser.id]);

    return (
        <div>
            <p>Activity</p>
            {feed && feed.map((photo) => (
                <>
                    <div className='card-top' key={photo.id}>
                        <div className='avatar' style={{backgroundImage: `url('${photo.User.avatarUrl}')`}} />
                        <p>{photo.User.firstName} {photo.User.lastName}</p>
                        <div className='feed-photo' style={{backgroundImage: `url('${photo.imgUrl}')`}} />
                        <p>{photo.caption}</p>
                    </div>
                    <div className='card-bottom' key={`${photo.id} bot`}>
                        <p>{photo.cameraSettings}</p>
                        <div className='card-icons'>
                            <AiOutlineHeart style={{fontSize: '30', color: 'rgba(0, 0, 0, .4)'}} />
                            <BiComment style={{fontSize: '30', color: 'rgba(0, 0, 0, .4)'}} />
                            <AiOutlineUserAdd style={{fontSize: '30', color: 'rgba(0, 0, 0, .4)'}} />
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

export default HomePage