import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { editImage } from '../../../store/image';
import DeleteButton from './DeleteButton';
import edit from './Edit.module.css';

function Photo({photo}) {
    const dispatch = useDispatch();

    const [caption, setCaption] = useState(photo.caption);
    const [cameraSettings, setCameraSettings] = useState(photo.cameraSettings);
    const [captionEditActive, setCaptionEditActive] = useState(false);
    const [cameraSettingsEditActive, setCameraSettingsEditActive] = useState(false);

    const handleSubmitCaption = (e) => {
        e.preventDefault();
        photo.caption = caption;
        dispatch(editImage(photo));
        caption === '' 
        ?
            setCaptionEditActive(true)
        :
            setCaptionEditActive(false)
    };

    const handleSubmitCameraSettings = (e) => {
        e.preventDefault();
        photo.cameraSettings = cameraSettings;
        dispatch(editImage(photo));
        cameraSettings === ''
            ?
                setCameraSettingsEditActive(true)
            :
                setCameraSettingsEditActive(false)

    };

    return (
        <>
            {photo && (
                <div className={edit.card} key={photo.id}>
                    {captionEditActive
                        ?   <form onSubmit={handleSubmitCaption}>
                                <input 
                                    type="text" 
                                    value={caption} 
                                    onChange={(e) => setCaption(e.target.value)} 
                                    placeholder={caption || 'Caption'}
                                />
                                <button>
                                    <AiOutlineCheckCircle />
                                </button>
                                </form>

                        :   <p onClick={() => setCaptionEditActive(true)}>
                                {photo.caption}
                            </p>
                    }
                    <div className={edit.photo} style={{ backgroundImage: `url('${photo.imgUrl}')` }} />
                    <div className={edit.cardBottom}>
                        {cameraSettingsEditActive
                            ?   <form onSubmit={handleSubmitCameraSettings}>
                                    <input 
                                        type="text" 
                                        value={cameraSettings}
                                        onChange={(e) => setCameraSettings(e.target.value)}   
                                        placeholder={cameraSettings || 'Camera Settings'} 
                                    />
                                    <button><AiOutlineCheckCircle /></button>
                                </form>

                            :   <p onClick={() => setCameraSettingsEditActive(true)}>
                                    {photo.cameraSettings}
                                </p>
                        }
                        <DeleteButton photoId={photo.id} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Photo;