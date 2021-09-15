import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector} from 'react-redux';
import { deleteComment } from '../../../store/image';

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
        <div>
            <div className='comment-avatar' style={{ backgroundImage: `url('${comment.User.avatarUrl}')` }} />
            <p>{comment.User.username}</p>
            <p>{formatDate(comment.createdAt)}</p>
            <p>{comment.comment}</p>
            {comment.User.id === user.id && (
                <AiOutlineDelete onClick={handleDelete} />
            )}
        </div>
    );
};

export default Comment;