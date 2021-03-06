import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../store/userInfo'
import FavoriteButton from '../FavoriteButton';
import { Link } from 'react-router-dom';
import { getFavorites } from '../../store/favorites';
import home from './HomePage.module.css';

function HomePage() {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const favorites = useSelector(state => state?.favorites?.favorites)
    const feed = useSelector(state => state?.currentUser?.feed)

    useEffect(() => {
        if (sessionUser) {
            dispatch(getFeed(sessionUser?.id))
            dispatch(getFavorites(sessionUser?.id))
        }
    }, [dispatch, sessionUser]);

    return (
        <div className={home.wrapper}>
            <div className={home.activity}>
                <Link className={home.button} to={`/users/${sessionUser?.id}`}>Your Profile</Link>
            </div>
            <p className={home.actP}>Activity</p>

            {sessionUser && feed?.map((photo) => (
                <div className={home.card} key={photo.id}>
                    <div className={home.user}>
                        <Link to={`/users/${photo.User.id}`}>
                            <div 
                                className={home.avatar}
                                style={{backgroundImage: `url('${photo.User.avatarUrl}')`}} 
                            />
                        </Link>
                        <Link to={`/users/${photo.User.id}`}>
                            <p className={home.text}>{photo.User.firstName} {photo.User.lastName}</p>
                        </Link>
                    </div>

                    <div>
                        <Link to={`/images/${photo.id}`}>
                            <div 
                                className={home.feedPhoto} 
                                style={{backgroundImage: `url('${photo.imgUrl}')`}} 
                            />
                        </Link>
                    </div>

                    <div className={home.cardBottom} >
                        <div className={home.info}>
                            <p className={home.setting} >{photo.caption}</p>
                            <p className={home.setting} >{photo.cameraSettings}</p>
                        </div>
                        <div className={home.cardIcons}>
                            <FavoriteButton photoId={photo.id} favorites={favorites}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage