import { csrfFetch } from './csrf';

const ADD_IMAGE = 'image/ADD_IMAGE';
const GET_IMAGE = 'image/GET_IMAGE';
const EDIT_IMAGE = 'image/EDIT_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';
const ADD_COMMENT = 'comment/ADD_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';


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

const deleteCommentAction = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    };
};

export const deleteComment = (commentId) => async (dispatch) => {
    await csrfFetch(`/api/images/comments/${commentId}`, {
        method: 'DELETE'
    });

    dispatch(deleteCommentAction(commentId));
}

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
            newState.image.Comments = [action.comment, ...newState.image.Comments]
            return newState;
        case DELETE_COMMENT:
            newState = Object.assign({}, state);
            const comments = newState.image.Comments.filter(comment => comment.id !== action.commentId);
            newState.image.Comments = comments;
            return newState;
        default:
            return state;
    };
};

export default imageReducer;