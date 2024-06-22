import { combineReducers } from 'redux';
import userReducer from './userReducer';
import freteReducer from './freteReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
    user: userReducer,
    frete: freteReducer,
    payment: paymentReducer,
});

export default rootReducer;
