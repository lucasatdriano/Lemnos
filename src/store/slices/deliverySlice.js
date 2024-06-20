import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    deliveryOption: '',
    priceDelivery: 0,
};

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {
        setDeliveryOption(state, action) {
            state.deliveryOption = action.payload.deliveryOption;
            state.priceDelivery = action.payload.priceDelivery;
        },
    },
});

export const { setDeliveryOption } = deliverySlice.actions;
export default deliverySlice.reducer;
