import { getImage } from '../../store/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
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
                </>
            )}
        </>
    );
};

export default ImagePage;