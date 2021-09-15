import { getImage } from '../../store/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack, BiComment } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { GrSend } from 'react-icons/gr';
import { addComment } from '../../store/image';
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

    const [comment, setComment] = useState('')


    useEffect(() => {
        dispatch(getImage(photoId));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            comment: comment,
            photoId,
            userId,
        };

        dispatch(addComment(photoId, newComment));
        setComment('');
    };

    const formatDate = (date) => {
        const newDate = new Date(date)
        const month = newDate.getMonth() + 1;
        const day = newDate.getDay();
        const formattedDate = `${month}-${day}`
        return formattedDate
    }

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
                    <div>
                        <form onSubmit={handleSubmit}>
                            <textarea 
                                placeholder='Share your thoughts...' 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button><GrSend /></button>
                        </form>
                        {comments?.map(comment => (
                            <div>
                                <div className='comment-avatar' style={{ backgroundImage: `url('${comment.User.avatarUrl}')`}} />
                                <p>{comment.User.username}</p>
                                <p>{formatDate(comment.createdAt)}</p>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </>
                
            )}
        </>
    );
};

export default ImagePage;