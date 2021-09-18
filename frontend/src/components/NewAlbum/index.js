import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createAlbum, getUnusedPhotos } from '../../store/album';
import { BiArrowBack } from 'react-icons/bi';
import AlbumPhotoAdd from './AlbumPhotoAdd';
import form from '../LoginFormModal/LoginForm.module.css'
import albumForm from './NewAlbum.module.css'
import './NewAlbum.module.css';

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
        <div className={albumForm.container}> 
            <div className={albumForm.goBack}>
                <p onClick={() => history.goBack()}> <BiArrowBack /> back to albums</p>
            </div> 
            {availablePhotos?.length > 0 
                ? 
                    <form className={albumForm.form} onSubmit={handleSubmit}>
                        <p className={albumForm.addAnAlbum}>Add an album</p>
                        <div className={form.standardInput}>
                            <input className={form.input} type="text" name='title' placeholder=' ' value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required />
                            <label className={form.label} htmlFor="title" >Title</label>
                            <span className={form.underline} ></span>
                        </div>
                        <div className={albumForm.allPhotos}>
                            {availablePhotos.length && availablePhotos.map(photo => (
                                <div className={albumForm.photoWrapper} key={photo.id} onClick={handleSelect}>
                                    <AlbumPhotoAdd photo={photo} onClick={handleSelect}/>
                                </div>
                            ))}
                        </div>
                        <button className={albumForm.button}>Create Album</button>
                    </form>
                :
                    <p>All of your photos are in albums!</p>
            }
        </div>
    );
};

export default NewAlbum;