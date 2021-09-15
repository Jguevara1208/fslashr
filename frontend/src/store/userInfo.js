import { csrfFetch } from "./csrf";

const GET_INFO = 'userInfo/GET_INFO';
const GET_ALL_IMAGES = 'image/GET_ALL_IMAGES';
const ADD_ALBUM = 'album/ADD_ALBUM';
const DELETE_ALBUM = 'album/DELETE_ALBUM'

export const addAlbumAction = (album) => {
    return {
        type: ADD_ALBUM,
        album
    };
};

const deleteAlbumAction = (albumId) => {
    return {
        type: DELETE_ALBUM,
        albumId
    };
};

const userInfo = (user) => {
    return {
        type: GET_INFO,
        user
    };
};

const getAllImagesAction = (photos) => {
    return {
        type: GET_ALL_IMAGES,
        photos
    };
};

export const deleteAlbum = (albumId) => async (dispatch) => {
    const response  = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'DELETE'
    });
    const returnedAlbumId = await response.json()

    dispatch(deleteAlbumAction(returnedAlbumId));
}

export const deleteImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'DELETE',
    });
    const photos = await response.json();

    dispatch(getAllImagesAction(photos))
};

export const getAllImages = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/images`);
    const photos = await response.json(); 
    dispatch(getAllImagesAction(photos));
    return photos;
}

export const unfollowUser = (userId) => async (dispatch) => {
    const body = { userToUnfollow: userId }
    await csrfFetch('/api/users/follow', {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const followUser = (userId) => async (dispatch) => {
    const body = { userToFollow: userId }
    await csrfFetch('/api/users/follow', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const getInfoThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/info`);
    const user = await response.json();
    dispatch(userInfo(user)) 
    return user;
};

const initialState = {
    info:null,
    feed:null,
    favorites:null,
    followings:null,
    followers:null,
    albums:null,
    photos:null,
};

const userInfoReducer = (state=initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_INFO:
            newState = Object.assign({}, state);
            newState.info = action.user.info;
            newState.feed = action.user.feed;
            newState.favorites = action.user.favorites;
            newState.followings = action.user.followings;
            newState.followers = action.user.followers;
            newState.albums = action.user.albums;
            newState.photos = action.user.photos;
            return newState;
        case GET_ALL_IMAGES:
            newState = Object.assign({}, state);
            newState.photos = action.photos;
            return newState;
        case ADD_ALBUM:
            newState = Object.assign({}, state);
            let newAlbums = [...newState.albums, action.album];
            newState.albums = newAlbums;
            return newState
        case DELETE_ALBUM:
            newState = Object.assign({}, state);
            const albums = newState.albums.filter(album => album.id !== +action.albumId );
            newState.albums = albums;
            return newState;
        default:
            return state;
    };
};

export default userInfoReducer;