import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createAlbum, getUnusedPhotos } from '../../store/album';
import AlbumPhotoAdd from './AlbumPhotoAdd';
import './NewAlbum.css';

function NewAlbum() {

    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state?.session?.user?.id);
    const availablePhotos = useSelector(state => state?.album?.unusedPhotos);

    const [albumTitle, setAlbumTitle] = useState('');
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    useEffect(() => {
        dispatch(getUnusedPhotos(userId));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const album = {
            userId,
            title: albumTitle,
            photos: selectedPhotos
        };

        dispatch(createAlbum(album));
        history.push(`/users/${userId}/albums`);
    };

    const handleSelect = (e) => {
        const photoId = e.target.id;

        if (selectedPhotos.includes(photoId)) {
            const index = selectedPhotos.indexOf(photoId)
            const newArr = [...selectedPhotos.slice(0, index), ...selectedPhotos.slice(index +  1)]
            setSelectedPhotos(newArr)
        } else {
            const newArr = [...selectedPhotos, photoId]
            setSelectedPhotos(newArr)
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="text" 
                        value={albumTitle}
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        placeholder='Album Title'
                    />
                </label>
                {availablePhotos && availablePhotos.map(photo => (
                    <div key={photo.id} onClick={handleSelect}>
                        <AlbumPhotoAdd photo={photo} onClick={handleSelect}/>
                    </div>
                ))}
                <button>Create Album</button>
            </form>
        </>
    );
};

export default NewAlbum;