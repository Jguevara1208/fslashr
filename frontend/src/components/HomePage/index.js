import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoThunk } from '../../store/userInfo';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FavoriteButton from '../FavoriteButton';
import { BiComment } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { getFavorites } from '../../store/favorites';
import './HomePage.css';

function HomePage() {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const favorites = useSelector(state => state.favorites.favorites)
    const feed = useSelector(state => state.currentUser.feed)

    useEffect(() => {
        dispatch(getInfoThunk(sessionUser?.id))
        dispatch(getFavorites(sessionUser?.id))
    }, [dispatch, sessionUser?.id]);

    return (
        <div>
            <p>Activity</p>
            {feed && feed.map((photo) => (
                <div className='feed' key={photo.id}>
                    <div className='card-top' >
                        <Link to={`/users/${photo.User.id}`}>
                            <div 
                                className='avatar' 
                                style={{backgroundImage: `url('${photo.User.avatarUrl}')`}} 
                            />
                        </Link>
                        <p>{photo.User.firstName} {photo.User.lastName}</p>
                        <div 
                            className='feed-photo' 
                            style={{backgroundImage: `url('${photo.imgUrl}')`}} 
                        />
                        <p>{photo.caption}</p>
                    </div>
                    <div className='card-bottom' >
                        <p>{photo.cameraSettings}</p>
                        <div className='card-icons'>
                            <FavoriteButton photoId={photo.id} favorites={favorites}/>
                            <BiComment style={{fontSize: '30', color: 'rgba(0, 0, 0, .4)'}} />
                            <AiOutlineUserAdd style={{fontSize: '30', color: 'rgba(0, 0, 0, .4)'}} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage