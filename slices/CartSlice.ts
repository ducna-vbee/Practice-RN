import { createSlice } from "@reduxjs/toolkit";

interface CartState
{
    list: [],
};

const initialState: CartState = {
    list: [],
};

const CartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    },
});

export default CartSlice;