import { SET_CARRINHO } from '../actions/cartActions';

const initialState = {
    items: [],
    totalAmount: 0,
    status: 'idle',
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARRINHO:
            return {
                ...state,
                items: action.payload.items,
                totalAmount: action.payload.totalAmount,
                status: 'succeeded',
                error: null,
            };
        default:
            return state;
    }
};

export default cartReducer;
