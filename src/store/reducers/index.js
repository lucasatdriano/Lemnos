import { combineReducers } from 'redux';
import userReducer from './userReducer';
import freteReducer from './freteReducer';

const rootReducer = combineReducers({
    user: userReducer,
    frete: freteReducer,
});

export default rootReducer;
