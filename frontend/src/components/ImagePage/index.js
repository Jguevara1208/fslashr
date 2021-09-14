import { getImage } from '../../store/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack, BiComment } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import UserInfo from '../UserInfo';
import './ImagePage.css'

function ImagePage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { photoId } = useParams();
    const image = useSelector(state => state.image.image)


    const data = {
        userInfo: image?.User,
        following: image?.User?.followings,
        followers: image?.User.followers,
        favorites: image?.favorites,
        comments: image?.comments,
    }

    useEffect(() => {
        dispatch(getImage(photoId));
    }, [dispatch, photoId]);

    return (
        <>
            {image && (
                <>
                    <p onClick={() => history.goBack()}> <BiArrowBack/> back to photostream</p>
                    <div className='image-page-image' style={{backgroundImage: `url('${image.imgUrl}')`}} />
                    <UserInfo data={data}/>
                    <div>
                        <p>{data?.favorites?.length || 0}</p>
                        <p>favorites</p>
                    </div>
                    <div>
                        <p>{data?.comments?.length || 0}</p>
                        <p>comments</p>
                    </div>
                    <BiComment style={{ fontSize: '50', color: 'rgba(0, 0, 0, .4)' }} />
                    <AiOutlineHeart style={{ fontSize: '50', color: 'rgba(0, 0, 0, .4)' }} />
                </>
            )}
        </>
    );
};

export default ImagePage;