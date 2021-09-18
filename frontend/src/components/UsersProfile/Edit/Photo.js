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
                        ?   
                            <form onSubmit={handleSubmitCaption}>
                                <div className={edit.inputWrapper}>
                                    <div className={`${edit.standardInput} ${edit.input}`}>
                                        <input className={edit.input} type="text" name='username' placeholder=' ' value={caption} onChange={(e) => setCaption(e.target.value)} required />
                                        <label className={edit.label} htmlFor="username" >Caption</label>
                                        <span className={edit.underline} ></span>
                                    </div>
                                    <button className={edit.submit}>
                                        <AiOutlineCheckCircle />
                                    </button>
                                </div>
                            </form>

                        :   
                            <p onClick={() => setCaptionEditActive(true)}>
                                {photo.caption}
                            </p>
                    }
                    <div className={edit.photo} style={{ backgroundImage: `url('${photo.imgUrl}')` }} />
                    <div className={edit.cardBottom}>
                        {cameraSettingsEditActive
                            ?   
                                <form onSubmit={handleSubmitCameraSettings}>
                                    <div className={edit.inputWrapper}>
                                        <button className={edit.submit} >
                                            <AiOutlineCheckCircle />
                                        </button>
                                        <div className={`${edit.standardInput} ${edit.input}`}>
                                            <input className={edit.input} type="text" name='username' placeholder=' ' value={cameraSettings} onChange={(e) => setCameraSettings(e.target.value)} required />
                                            <label className={edit.label} htmlFor="username" >CameraSettings</label>
                                            <span className={edit.underline} ></span>
                                        </div>
                                    </div>
                                </form>

                            :   
                                <p onClick={() => setCameraSettingsEditActive(true)}>
                                    {photo.cameraSettings}
                                </p>
                        }
                        <div className={edit.deleteWrapper}>
                            <DeleteButton photoId={photo.id} />
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    );
};

export default Photo;