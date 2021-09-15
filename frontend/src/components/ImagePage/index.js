import { getImage } from '../../store/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack, BiComment } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import CommentSection from './CommentSection';
import UserInfo from '../UserInfo';

import './ImagePage.css'

function ImagePage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { photoId } = useParams();
    
    const image = useSelector(state => state.image.image);
    const userId = useSelector(state => state?.session?.user?.id)
    const comments = useSelector(state => state?.image?.image?.Comments)

    const data = {
        userInfo: image?.User,
        following: image?.User?.followings,
        followers: image?.User.followers,
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
    }, [dispatch]);

    

    return (
        <>
            {image && (
                <>
                    <div>
                        <p onClick={() => history.goBack()}> <BiArrowBack/> back to photostream</p>
                        <div className='image-page-image' style={{backgroundImage: `url('${image.imgUrl}')`}} />
                        <UserInfo data={data}/>
                        <div>
                            <p>{data?.favorites?.length}</p>
                            <p>favorites</p>
                        </div>
                        <div>
                            <p>{comments?.length}</p>
                            <p>comments</p>
                        </div>
                        <BiComment style={{ fontSize: '50', color: 'rgba(0, 0, 0, .4)' }} />
                        <AiOutlineHeart style={{ fontSize: '50', color: 'rgba(0, 0, 0, .4)' }} />
                    </div>
                    <CommentSection commentsInfo={commentInfo}/>
                </>
                
            )}
        </>
    );
};

export default ImagePage;