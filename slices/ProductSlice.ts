import { createSlice } from "@reduxjs/toolkit";

interface ProductState
{
    list: [],
};

const initialState: ProductState = {
    list: [],
};

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    },
});

export default ProductSlice;