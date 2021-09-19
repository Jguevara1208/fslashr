import { csrfFetch } from "./csrf";

const GET_INFO = 'userInfo/GET_INFO';
const GET_ALBUMS = 'userInfo/GET_ALBUMS';
const GET_FAVORITES = 'userInfo/GET_FAVORITES';
const GET_FEED = 'userInfo/GET_FEED';
const GET_ALL_IMAGES = 'image/GET_ALL_IMAGES';
const ADD_IMAGE = 'image/ADD_IMAGE';
const EDIT_ALBUM = 'album/EDIT_ALBUM';
const ADD_ALBUM = 'album/ADD_ALBUM';
const DELETE_ALBUM = 'album/DELETE_ALBUM';

export const addAlbumAction = (album) => {
    return {
        type: ADD_ALBUM,
        album
    };
};

const editAlbumAction = (album) => {
    return {
        type: EDIT_ALBUM,
        album
    };
};

const addImageAction = (image) => {
    return {
        type: ADD_IMAGE,
        image
    };
};


const getAlbumsAction = (albums) => {
    return {
        type: GET_ALBUMS,
        albums
    };
};

const getFavoritesAction = (favorites) => {
    return {
        type: GET_FAVORITES,
        favorites
    };
};

const getFeedAction = (feed) => {
    return {
        type: GET_FEED,
        feed
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

export const createAlbum = (album) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    });

    const albumRes = await response.json();

    dispatch(addAlbumAction(albumRes));
    return album;
}

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
    dispatch(addImageAction(imgResponse));
    return response;
};

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


export const getAlbums = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/albums`);
    const albums = await response.json();
    dispatch(getAlbumsAction(albums));
};

export const getFavorites = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/favorites/photos`)
    const favorites = await response.json();
    dispatch(getFavoritesAction(favorites));
};

export const getFeed = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/feed`)
    const feed = await response.json();
    dispatch(getFeedAction(feed));
}

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
        case GET_FAVORITES:
            newState = Object.assign({}, state)
            newState.favorites = action.favorites
            return newState
        case GET_FEED:
            newState = Object.assign({}, state)
            newState.feed = action.feed
            return newState
        case GET_INFO:
            newState = Object.assign({}, state);
            newState.info = action.user.info;
            newState.followings = action.user.followings;
            newState.followers = action.user.followers;
            return newState;
        case GET_ALL_IMAGES:
            newState = Object.assign({}, state);
            newState.photos = action.photos;
            return newState;
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState.photos = [action.image, ...newState.photos]
            return newState;
        case GET_ALBUMS:
            newState = Object.assign({}, state);
            newState.albums = action.albums;
            return newState;
        case EDIT_ALBUM:
            newState = Object.assign({}, state);
            const editedAlbums = newState.albums.map(album => {
                if (album.id === action.album.id) {
                    return action.album
                }
                return album
            });
            newState.albums = editedAlbums;
            return newState;
        case ADD_ALBUM:
            newState = Object.assign({}, state);
            let newAlbums = [action.album, ...newState.albums, ];
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