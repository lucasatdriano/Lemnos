import {
    SET_SELECTED_ADDRESS,
    SET_SELECTED_PAYMENT_METHOD,
    SET_DESCONTO,
} from '../actions/paymentActions';

const initialState = {
    selectedAddress: {
        cep: '',
        numeroLogradouro: '',
        logradouro: '',
        uf: '',
        cidade: '',
        bairro: '',
        complemento: '',
    },
    selectedPaymentMethod: '',
    desconto: 0,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_ADDRESS:
            return {
                ...state,
                selectedAddress: action.payload,
            };
        case SET_SELECTED_PAYMENT_METHOD:
            return {
                ...state,
                selectedPaymentMethod: action.payload,
            };
        case SET_DESCONTO:
            return {
                ...state,
                desconto: action.payload,
            };
        default:
            return state;
    }
};

export default paymentReducer;
