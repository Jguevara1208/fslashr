import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAlbum, getUnusedPhotos } from '../../store/album';
import { BiArrowBack } from 'react-icons/bi';
import { editAlbum } from '../../store/userInfo';
import edit from './EditAlbum.module.css'
import albumForm from '../NewAlbum/NewAlbum.module.css'
import form from '../LoginFormModal/LoginForm.module.css'
import AlbumPhotoEditUnused from './AlbumPhotoEdit/unused.js';
import AlbumPhotoEditUsed from './AlbumPhotoEdit/used.js';

function EditAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();

    const userId = useSelector(state => state?.session?.user?.id)
    const unusedPhotos = useSelector(state => state?.album?.unusedPhotos)
    const usedPhotos = useSelector(state => state?.album?.album);
    const title = usedPhotos?.[0]?.Album?.title;

    const [titleEdit, setTitleEdit] = useState(false)
    const [albumTitle, setAlbumTitle] = useState(title);
    const [photosToRemove, setPhotosToRemove] = useState([]);
    const [photosToAdd, setPhotosToAdd] = useState([]);

    useEffect(() => {
        dispatch(getAlbum(albumId));
        dispatch(getUnusedPhotos(userId));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const album = {
            title: albumTitle,
            photoIdsToRemove: photosToRemove,
            photoIdsToAdd: photosToAdd
        }

        dispatch(editAlbum(albumId ,album));
        history.push(`/users/${userId}/albums`);
    }

    const handleRemoveSelect = (e) => {
        const photoId = e.target.id;

        if (photosToRemove.includes(photoId)) {
            const index = photosToRemove.indexOf(photoId)
            const newArr = [...photosToRemove.slice(0, index), ...photosToRemove.slice(index + 1)]
            setPhotosToRemove(newArr)
        } else {
            const newArr = [...photosToRemove, photoId]
            setPhotosToRemove(newArr)
        };
    }

    const handleAddSelect = (e) => {
        const photoId = e.target.id;

        if (photosToAdd.includes(photoId)) {
            const index = photosToAdd.indexOf(photoId)
            const newArr = [...photosToAdd.slice(0, index), ...photosToAdd.slice(index + 1)]
            setPhotosToAdd(newArr)
        } else {
            const newArr = [...photosToAdd, photoId]
            setPhotosToAdd(newArr)
        };
    }

    const toggleEdit = (e) => {
        e.preventDefault()

        setTitleEdit(!titleEdit)
    }

    
    return (
        <div className={edit.wrapper}>
            <div className={albumForm.goBack}>
                <p onClick={() => history.goBack()}> <BiArrowBack /> back to albums</p>
            </div>
            <p style={{textAlign: 'left', color: 'rgba(0, 0, 0, .5)', fontSize: '18px', fontWeight: '200', marginBottom: '0px', marginTop: '30px', }}>Edit Album</p>
            <form className={albumForm.form} onSubmit={handleSubmit}>
                {!titleEdit 
                ? 
                    <p className={edit.titleP} onClick={toggleEdit} >{title}</p> 
                : 
                <>
                        <div className={form.standardInput}>
                            <input className={form.input} type="text" name='title' placeholder=' ' value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} required />
                            <label className={form.label} htmlFor="title" >{title}</label>
                            <span className={form.underline} ></span>
                        </div>
                </>
                }
                <p className={edit.line}>Photos currently in the album, click to remove</p>
                <div className={edit.photoContainer}>
                    {usedPhotos && usedPhotos.map(photo => (
                    <div key={photo.id} onClick={handleRemoveSelect}>
                            <AlbumPhotoEditUsed photo={photo}onClick={handleRemoveSelect} />
                    </div>
                ))}
                </div>
                <p className={edit.line}>Photos you can add to the album, click to add</p>
                <div className={edit.photoContainer}>
                    {unusedPhotos?.length > 0 && unusedPhotos.map(photo => (
                        <div key={photo.id} onClick={handleAddSelect}>
                            <AlbumPhotoEditUnused photo={photo} onClick={handleAddSelect} />
                        </div>
                    ))}
                </div>
                
                <button className={albumForm.button}>Apply Changes</button>
            </form>
        </div>
    );
};

export default EditAlbum;