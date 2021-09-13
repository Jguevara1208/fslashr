import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from '../../store/image';

function ImageUpload() {

    const currentUserId = useSelector(state => state.session.user.id)

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [cameraSettings, setCameraSettings] = useState('');
    const [userId, setUserId] =  useState(currentUserId);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault(addImage);
        let newErrors = [];
        dispatch(addImage({image, caption, cameraSettings, userId}))
            .then(() => reset())
            .catch( async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                };
            });
        reset()
    };

    const reset = () => {
        setImage(null);
        setCaption('');
        setCameraSettings('');
        setErrors([]);
    };

    return (
        <>
            <p>Upload an image</p>
            {errors.length > 0 && errors.map((error) => (
                <div key={error}>{error}</div>
            ))}
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type='text'
                        placeholder='Caption'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </label>
                <label>
                    <input 
                        type='text'
                        placeholder='CameraSettings'
                        value={cameraSettings}
                        onChange={(e) => setCameraSettings(e.target.value)}
                    />
                </label>
                <label>
                    <input 
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                <button type='submit'>Upload Image</button>
            </form>
        </>
    );
};

export default ImageUpload;
