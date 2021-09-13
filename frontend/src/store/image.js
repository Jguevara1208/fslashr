import { csrfFetch } from './csrf';

const ADD_IMAGE = 'photo/ADD_IMAGE';

const GET_IMAGE = 'photo/GET_IMAGE'

const addImageAction = (image) => {
    return {
        type: ADD_IMAGE,
        image
    };
};

const getImageAction = (image) => {
    return {
        type: GET_IMAGE,
        image
    };
};

export const addImage = (imageObj) => async (dispatch) => {
    const imageData = new FormData();
    console.log(imageObj.image, 'imageObj.image')
    const { image, caption, cameraSettings, userId, albumId } = imageObj;

    if (imageObj) {
        imageData.append('image', image);
        imageData.append('caption', caption);
        imageData.append('cameraSettings', cameraSettings);
        imageData.append('userId', userId);
        imageData.append('albumId', albumId)
    };

    const response = await csrfFetch('/api/images/', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: imageData
    });

    const imgResponse = await response.json();
    dispatch(addImageAction(image));
    return imgResponse;
}

export const getImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}`);
    const image = await response.json();
    dispatch(getImageAction(image));
    return image
}

const initialState = {
    image: null
}

const imageReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState.image = action.image;
            return newState;
        case GET_IMAGE:
            newState = Object.assign({}, state);
            newState.image = action.image;
            return newState;
        default:
            return state;
    }
}

export default imageReducer;