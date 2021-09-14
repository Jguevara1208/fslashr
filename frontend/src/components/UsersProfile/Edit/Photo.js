import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { editImage } from '../../../store/image';
import DeleteButton from './DeleteButton';
import './Edit.css';

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
                <div className='photo-edit-container' key={photo.id}>
                    <div className='edit-photo' style={{ backgroundImage: `url('${photo.imgUrl}')` }} />
                    {captionEditActive
                        ?   <form onSubmit={handleSubmitCaption}>
                                <input 
                                    type="text" 
                                    value={caption} 
                                    onChange={(e) => setCaption(e.target.value)} 
                                    placeHolder={caption || 'Caption'}
                                />
                                <button>
                                    <AiOutlineCheckCircle />
                                </button>
                                </form>

                        :   <p onClick={() => setCaptionEditActive(true)}>
                                {photo.caption}
                            </p>
                    }
                    {cameraSettingsEditActive
                        ?   <form onSubmit={handleSubmitCameraSettings}>
                                <input 
                                    type="text" 
                                    value={cameraSettings}
                                    onChange={(e) => setCameraSettings(e.target.value)}   
                                    placeHolder={cameraSettings || 'Camera Settings'} 
                                />
                                <button><AiOutlineCheckCircle /></button>
                            </form>

                        :   <p onClick={() => setCameraSettingsEditActive(true)}>
                                {photo.cameraSettings}
                            </p>
                    }
                    <DeleteButton photoId={photo.id} />
                </div>
            )}
        </>
    );
};

export default Photo;