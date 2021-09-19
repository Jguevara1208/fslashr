import { csrfFetch } from './csrf';

const GET_ALBUM = 'album/GET_ALBUM';
const CREATE_ALBUM = 'album/CREATE_ALBUM';
const UNUSED_PHOTOS = 'album/UNUSED_PHOTOS';


const setAlbumAction = (album) => {
    return {
        type: GET_ALBUM,
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
            newState.album = action.album;
            let banner = newState.album[0];
            newState.banner = banner;
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

