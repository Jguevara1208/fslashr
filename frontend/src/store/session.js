import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { 
        username,
        email,
        password,
        firstName,
        lastName,
        avatarUrl,
        bio 
    } = user; 

    const newUser = new FormData()

    if (user) {
        newUser.append('image', avatarUrl)
        newUser.append('username', username)
        newUser.append('email', email)
        newUser.append('password', password)
        newUser.append('firstName', firstName)
        newUser.append('lastName', lastName)
        newUser.append('bio', bio)
    }

    console.log(newUser)

    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: newUser
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const logout = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;