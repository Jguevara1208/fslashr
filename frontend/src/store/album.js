import { csrfFetch } from "./csrf";

const GET_ALBUM = 'album/GET_ALBUM';
const EDIT_ALBUM = 'album/EDIT_ALBUM';
const DELETE_ALBUM = 'album/DELETE_ALBUM';
const CREATE_ALBUM = 'album/CREATE_ALBUM';


const setAlbumAction = (album) => {
    return {
        type: GET_ALBUM,
        album
    };
};

const editAlbumAction = (album) => {
    return {
        type: EDIT_ALBUM,
        album
    };
};

const deleteAlbumAction = (album) => {
    return {
        type: DELETE_ALBUM,
        album
    };
};

const createAlbumAction = (album) => {
    return {
        type: CREATE_ALBUM,
        album
    };
};

export const getAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`);
    const album = await response.json();
    dispatch(setAlbumAction(album));
    return album;
};

export const editAlbum = (album) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${album.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    });
    const album = await response.json();
    dispatch(editAlbumAction(album));
    return album;
}

export const deleteAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`);
    const album = await response.json();
    dispatch(setAlbumAction(album));
    return album;
}

export const createAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`);
    const album = await response.json();
    dispatch(setAlbumAction(album));
    return album;
}

const initialState = {
    album: null
}

const albumReducer = (state=initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ALBUM:
            newState = Object.assign({}, state)
            newState.album = action.album
            return newState;
        case EDIT_ALBUM:
            newState = Object.assign({}, state)
            newState.album = action.album
            return newState;
        case CREATE_ALBUM:
            newState = Object.assign({}, state)
            newState.album = action.album
            return newState;
        case DELETE_ALBUM:
            newState = initialState
            return newState
        default:
            return state;
    }
}

export default albumReducer

