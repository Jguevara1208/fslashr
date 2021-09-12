import { csrfFetch } from "./csrf";

const GET_INFO = 'userInfo/GET_INFO';
const ADD_FOLLOW = 'userInfo/ADD_FOLLOW';

const userInfo = (user) => {
    return {
        type: GET_INFO,
        user
    };
};

const addFollow = () => {
    return {
        type: ADD_FOLLOW
    }
}

export const unfollowUser = (userId) => async (dispatch) => {
    const body = { userToUnfollow: userId }
    const response = await csrfFetch('/api/users/follow', {
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const followUser = (userId) => async (dispatch) => {
    const body = { userToFollow: userId }
    const response = await csrfFetch('/api/users/follow', {
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
        default:
            return state;
    };
};

export default userInfoReducer;