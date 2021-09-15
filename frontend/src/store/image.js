import { csrfFetch } from './csrf';

const ADD_IMAGE = 'image/ADD_IMAGE';

const GET_IMAGE = 'image/GET_IMAGE';
const EDIT_IMAGE = 'image/EDIT_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';
const ADD_COMMENT = 'image/ADD_COMMENT';

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

const editImageAction = (image) => {
    return {
        type: EDIT_IMAGE,
        image
    };
};

const addCommentAction = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    };
};

export const addComment = (imageId, comment) => async (dispatch) => {

    const response = await csrfFetch(`/api/images/${imageId}/comments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });

    const newComment = await response.json();
    dispatch(addCommentAction(newComment));
};

export const editImage = (image) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${image.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    });

    const newImage = await response.json();
    dispatch(editImageAction(newImage));
    return newImage;
};

export const addImage = (imageObj) => async (dispatch) => {
    const imageData = new FormData();
    const { image, caption, cameraSettings, userId, albumId } = imageObj;

    if (imageObj) {
        imageData.append('image', image);
        imageData.append('caption', caption);
        imageData.append('cameraSettings', cameraSettings);
        imageData.append('userId', userId);
        imageData.append('albumId', albumId);
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
};

export const getImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}`);
    const image = await response.json();
    dispatch(getImageAction(image));
    return image
};

const initialState = {
    image: null
};

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
        case EDIT_IMAGE:
            newState = Object.assign({}, state);
            newState.image = action.image;
            return newState;
        case DELETE_IMAGE:
            newState = Object.assign({}, state);
            return newState
        case ADD_COMMENT:
            newState = Object.assign({}, state);
            newState.image.Comments = [...newState.image.Comments, action.comment]
            return newState;
        default:
            return state;
    };
};

export default imageReducer;