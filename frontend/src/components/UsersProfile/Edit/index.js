import './Edit.css'
import Photo from './Photo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoThunk } from '../../../store/userInfo'

function Edit() {
    const dispatch = useDispatch()

    const sessionPhotos = useSelector(state => state.currentUser.photos)
    const userId = useSelector(state=> state.session.user.id)

    const [photos, setPhotos] = useState(sessionPhotos)

    useEffect(() => {
        dispatch(getInfoThunk(userId))
    }, [dispatch])

    return (
        <>
            {photos && photos.map(photo => (
                <Photo photo={photo} />
            ))}
        </>
    );
};

export default Edit;