import { getImage } from '../../store/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { getFavorites } from '../../store/favorites';
import FavoriteButton from '../FavoriteButton';
import CommentSection from './CommentSection';
import UserInfo from '../UserInfo';

import photo from './ImagePage.module.css'

function ImagePage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { photoId } = useParams();
    
    const image = useSelector(state => state.image.image);
    const userId = useSelector(state => state?.session?.user?.id)
    const comments = useSelector(state => state?.image?.image?.Comments)
    const favorites = useSelector(state => state.favorites.favorites)

    const data = {
        userInfo: image?.User,
        following: image?.User?.followings,
        followers: image?.User?.followers,
        favorites: image?.favorites,
        comments
    }

    const commentInfo = {
        photoId,
        userId,
        comments
    }

    useEffect(() => {
        dispatch(getImage(photoId));
        dispatch(getFavorites(userId))
    }, [dispatch]);

    

    return (
        <>
            {image && (
                <>
                    <div className={photo.container}>
                        <div className={photo.wrapper}>
                            <div className={photo.backDiv}>
                                <BiArrowBack className={photo.arrow} /> 
                                <p className={photo.back} onClick={() => history.goBack()}> back to stream</p>
                            </div>
                            <div className={photo.photo} style={{backgroundImage: `url('${image.imgUrl}')`}} />
                            <div className={photo.info}>
                                <div className={photo.infoWrapper}>
                                    <p className={photo.caption} >{image.caption}</p>
                                    <p className={photo.settings}>{image.cameraSettings}</p>
                                    <div className={photo.favorites}>
                                        <p>{data?.favorites?.length}</p>
                                        <p>favorites</p>
                                    </div>
                                    <div className={photo.comments}>
                                        <p>{comments?.length}</p>
                                        <p>comments</p>
                                    </div>
                                    <div className={photo.buttons}>
                                        <CommentSection commentsInfo={commentInfo}/>
                                        <FavoriteButton bool={true} photoId={photoId} favorites={favorites}/>
                                    </div>
                                </div>
                                <UserInfo data={data}/>
                            </div>
                        </div>
                    </div>
                </>
                
            )}
        </>
    );
};

export default ImagePage;