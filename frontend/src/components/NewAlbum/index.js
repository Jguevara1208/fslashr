import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createAlbum, getUnusedPhotos } from '../../store/album';
import './NewAlbum.css';

function NewAlbum() {

    const dispatch = useDispatch()
    const history = useHistory()

    const userId = useSelector(state => state?.session?.user?.id)
    const availablePhotos = useSelector(state => state?.album?.unusedPhotos)

    const [albumTitle, setAlbumTitle] = useState('');
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    useEffect(() => {
        dispatch(getUnusedPhotos(userId))
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const album = {
            userId,
            title: albumTitle,
            photos: selectedPhotos
        }

        dispatch(createAlbum(album))
        history.push(`/users/${userId}/albums`)
    }

    return (
        <>
            <form onSubmit={handleSubmit}></form>
        </>
    );
};

export default NewAlbum;