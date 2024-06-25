import { combineReducers } from 'redux';
import userReducer from './userReducer';
import freteReducer from './freteReducer';
import paymentReducer from './paymentReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    user: userReducer,
    frete: freteReducer,
    payment: paymentReducer,
    cart: cartReducer,
});

export default rootReducer;
