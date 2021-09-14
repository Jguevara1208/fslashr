import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './NewAlbum.css';

function NewAlbum() {

    const dispatch = useDispatch()
    const history = useHistory()

    const userId = useSelector(state => state.sessionStorage.user.id)

    const [albumTitle, setAlbumTitle] = useState('');
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const album = {
            userId,
            title: albumTitle,
            photos: selectedPhotos
        }

        dispatch(addAlbum(album))
        history.push(`/users/${userId}/albums`)
    }

    return (
        <>
        </>
    );
};

export default NewAlbum;