import { csrfFetch } from './csrf';

const GET_ALBUM = 'album/GET_ALBUM';
const EDIT_ALBUM = 'album/EDIT_ALBUM';
const CREATE_ALBUM = 'album/CREATE_ALBUM';
const UNUSED_PHOTOS = 'album/UNUSED_PHOTOS';


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

const createAlbumAction = (album) => {
    return {
        type: CREATE_ALBUM,
        album
    };
};

const setUnusedPhotos = (photos) => {
    return {
        type: UNUSED_PHOTOS,
        photos
    };
};

export const getAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`);
    const album = await response.json();
    dispatch(setAlbumAction(album));
    return album;
};

export const getUnusedPhotos = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/unused-photos`);
    const photos = await response.json();
    dispatch(setUnusedPhotos(photos))
}

export const editAlbum = (albumId, album) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    });
    const newAlbum = await response.json();
    
    dispatch(editAlbumAction(newAlbum));
    return newAlbum;
}

export const createAlbum = (album) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    });

    const albumRes = await response.json();

    dispatch(createAlbumAction(albumRes));
    return album;
}

const initialState = {
    album: null,
    banner: null,
    unusedPhotos: null,
}

const albumReducer = (state=initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ALBUM:
            newState = Object.assign({}, state);
            console.log(action.album)
            newState.album = action.album;
            let banner = newState.album[0];
            newState.banner = banner;
            return newState;
        case EDIT_ALBUM:
            newState = Object.assign({}, state);
            newState.album = action.album;
            return newState;
        case CREATE_ALBUM:
            newState = Object.assign({}, state);
            newState.album = action.album;
            return newState;
        case UNUSED_PHOTOS:
            newState = Object.assign({}, state);
            newState.unusedPhotos = action.photos;
            return newState
        default:
            return state;
    };
};

export default albumReducer;

