import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { Product } from "../product/product";
import { useAppSelector } from "..";
import { CartItem } from "../cart/cart";

export interface OrderItem {
    id: number,
    item: CartItem,
    status: "pending" | "completed" | "cancelled" | "disputed"
}

export interface OrderState {
    loading: boolean,
    orderItems: OrderItem[]
}

const initialState: OrderState = {
  loading: false,
  orderItems: new Array<OrderItem>()
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderItem: (state, action: { payload: CartItem; type: string }) => {
        state.orderItems =  [...state.orderItems, {id: state.orderItems.length, item: action.payload, status: "pending"} as OrderItem]
    },
  },
  extraReducers(builder) {

  },
});

export const priceSelector = createSelector(
    (state: OrderState) => state.orderItems,
    (orderItems) => {
        return orderItems.map((it) => Number((Number(it.item.product.price)*it.item.count).toFixed(2))).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)
    }
)(initialState)

export const { setOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
