import './CommentSection.css';
import Comment from '../Comment';
import { GrSend } from 'react-icons/gr';
import { addComment } from '../../../store/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function CommentSection({ commentsInfo }) {

    const dispatch = useDispatch();
    
    const { userId, photoId, comments } = commentsInfo;

    const [comment, setComment] = useState('');

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
                        <Comment comment={comment} />
                    ))}
                </div>
            )}
        </>
    );
};

export default CommentSection;