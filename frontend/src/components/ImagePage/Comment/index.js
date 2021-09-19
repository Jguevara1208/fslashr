import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector} from 'react-redux';
import { deleteComment } from '../../../store/image';
import cmt from '../CommentSection/CommentSection.module.css'

function Comment ({comment}) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const formatDate = (date) => {
        const newDate = new Date(date)
        const month = newDate.getMonth() + 1;
        const day = newDate.getDay();
        const formattedDate = `${month}-${day}`
        return formattedDate
    };

    const handleDelete = () => {
        dispatch(deleteComment(comment.id))
    }

    return (
        <div className={cmt.card}>
            <div className={cmt.cardInfo}>
                <div className={cmt.avatar} style={{ backgroundImage: `url('${comment.User.avatarUrl}')` }} />
                <div className={cmt.nameDate}>
                    <p className={cmt.name}>{comment.User.username}</p>
                    <p className={cmt.date}>{formatDate(comment.createdAt)}</p>
                </div>
                    {comment.User.id === user.id && (
                        <AiOutlineDelete className={cmt.delete} onClick={handleDelete} />
                    )}
            </div>
            <p className={cmt.cmt} >{comment.comment}</p>
        </div>
    );
};

export default Comment;