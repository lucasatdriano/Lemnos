import { SET_USER_IMG } from '../actions/userActions';

const initialState = {
    userImg: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_IMG:
            return {
                ...state,
                userImg: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
