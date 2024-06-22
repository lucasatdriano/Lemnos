export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_SELECTED_PAYMENT_METHOD = 'SET_SELECTED_PAYMENT_METHOD';
export const SET_DESCONTO = 'SET_DESCONTO';

export const setSelectedAddress = (address) => ({
    type: SET_SELECTED_ADDRESS,
    payload: address,
});

export const setSelectedPaymentMethod = (method) => ({
    type: SET_SELECTED_PAYMENT_METHOD,
    payload: method,
});

export const setDesconto = (desconto) => ({
    type: SET_DESCONTO,
    payload: desconto,
});
