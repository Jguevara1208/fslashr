import './Edit.css'
import Photo from './Photo';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../../store/userInfo'

function Edit() {
    const dispatch = useDispatch()

    const sessionPhotos = useSelector(state => state.currentUser.photos)
    const userId = useSelector(state=> state.session?.user?.id)


    useEffect(() => {
        dispatch(getAllImages(userId));
    }, [dispatch, userId])

    return (
        <>
            {sessionPhotos && sessionPhotos.map(photo => (
                <Photo photo={photo} key={photo.id}/>
            ))}
        </>
    );
};

export default Edit;