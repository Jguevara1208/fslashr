import commentSection from './CommentSection.module.css';
import Comment from '../Comment';
import { BiComment } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai'
import { addComment } from '../../../store/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function CommentSection({ commentsInfo }) {

    const dispatch = useDispatch();
    
    const { userId, photoId, comments } = commentsInfo;

    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleShowComments = () => {
        setShowComments(!showComments)
    }

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

    return (
        <>
            {comments && (
                <>
                    <BiComment onClick={handleShowComments} className={showComments ? commentSection.commentButtonActive : commentSection.commentButton} />
                    <div className={showComments ? commentSection.container : commentSection.containerHidden}>
                        <form className={commentSection.form} onSubmit={handleSubmit}>
                            <textarea
                                className={commentSection.textArea}
                                placeholder='Share your thoughts...'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                />
                            <button className={commentSection.send}><AiOutlineSend className={commentSection.test}/></button>
                        </form>
                        {comments?.map(comment => (
                            <Comment comment={comment} key={comment.id}/>
                            ))}
                    </div>
                </>
            )}
        </>
    );
};

export default CommentSection;