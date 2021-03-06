import { useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../store/userInfo';
import { useHistory } from 'react-router';
import form from '../LoginFormModal/LoginForm.module.css';
import logo from '../LoginFormModal/modalLogo';

function UploadForm() {

    const history = useHistory();

    const currentUserId = useSelector(state => state.session.user.id)

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [cameraSettings, setCameraSettings] = useState('');
    const [userId] =  useState(currentUserId);
    const dispatch = useDispatch();

    const fileUpload = useRef(null);
    const imageRef = useRef()

    const setPhoto = (e) => {
        setImage(e.target.files[0])
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            imageRef.current.src = reader.result
        }
    }

    const handleUpload =  () => {
        fileUpload.current.click()
    }
    

    const handleSubmit = (e) => {
        e.preventDefault(addImage);
        dispatch(addImage({image, caption, cameraSettings, userId}))
        reset()
        history.push(`/users/${currentUserId}`)
    };

    const reset = () => {
        setImage(null);
        setCaption('');
        setCameraSettings('');
    };

    return (
        <>
            <form className={form.form} onSubmit={handleSubmit}>
                {logo}
                <p>Upload an image</p>
                <div className={form.standardInput}>
                    <input className={form.input}
                        type="text"
                        name='caption'
                        placeholder=' '
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                    <label className={form.label} htmlFor="caption" >Caption</label>
                    <span className={form.underline} ></span>
                </div>
                <div className={form.standardInput}>
                    <input className={form.input}
                        type="text"
                        name='settings'
                        placeholder=' '
                        value={cameraSettings}
                        onChange={(e) => setCameraSettings(e.target.value)}
                        required
                    />
                    <label className={form.label} htmlFor="settings" >Camera Settings</label>
                    <span className={form.underline} ></span>
                </div>
                    <input type='file' className={form.inputfile} ref={fileUpload} onChange={setPhoto} />
                    <div className={form.fileChooser} onClick={() => handleUpload()} >Choose Photo</div>
                    {image && <img className={form.uploadImage} ref={imageRef} src="" alt="" /> }
                    <button className={form.button}>Upload Image</button>
            </form>
        </>
    );
};

export default UploadForm;
