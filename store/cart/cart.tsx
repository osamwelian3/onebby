import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import { Product } from "../product/product";
import { useAppSelector } from "..";

export interface CartItem {
    id: number,
    product: Product,
    count: 0 | number
}

// export const fetchCart = createAsyncThunk(
//     'cart/list',
//     async (_, {dispatch}) => {
//         return new Promise<CartItem>((resolve, reject) => {
//             try {
//                 const api_key = "7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S";
//                 console.log("API KEY: ", api_key);
//                 let config = {
//                     method: 'get',
//                     maxBodyLength: Infinity,
//                     url: 'https://www.onebby.it/api/carts/?display=[id,name,description]&output_format=JSON',
//                     auth: {
//                         username: api_key,
//                         password: ''
//                     }
//                 };
                
//                 axios.request(config)
//                 .then((response) => {
//                     resolve(response.data.carts[0] as CartItem)
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     // throw new Error("Error fetching categories: "+error);
//                     reject(error);
//                 });
            
//             } catch (error) {
//                 Alert.alert('Fetch Error', 'An error occured trying to fetch cart. Error: '+error);
//                 // throw new Error("Fetch Error: "+error);
//                 reject(error);
//             }
//         })
//     }
// )

export interface CartState {
    loading: boolean,
    cartItems: CartItem[]
}

const initialState: CartState = {
  loading: false,
  cartItems: new Array<CartItem>()
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetState: (state) => {
        state.cartItems = new Array<CartItem>()
        state.loading = false
    },
    setCartItem: (state, action: { payload: Product; type: string }) => {
        state.cartItems =  [...state.cartItems.filter((it) => it.product.id !== action.payload.id), {id: state.cartItems.length, product: action.payload, count: 1} as CartItem]
    },
    addItemCount: (state, action: { payload: { productId: Number; count: number }; type: string }) => {
        const item = state.cartItems.find((it) => it.product.id === action.payload.productId);
        if (item) {
            item.count = action.payload.count === 0 ? 1 : action.payload.count;
            state.cartItems = state.cartItems.map((it) => {
                if (it.product.id === action.payload.productId) {
                    return item;
                }
                return it;
            })
        }
    },
    removeItemFromCart: (state, action: { payload: { productId: Number; }; type: string }) => {
        const item = state.cartItems.find((it) => it.product.id === action.payload.productId);
        console.log('Remove: ', item?.product.name)
        if (item) {
            state.cartItems = state.cartItems.filter((it) => it.product.id !== action.payload.productId)
        }
    },
    logCarts: (state) => {
        console.log(JSON.stringify({
            loading: state.loading,
            carts: state.cartItems
        }, null, 2))
    }
  },
  extraReducers(builder) {

  },
});

export const priceSelector = createSelector(
    (state: CartState) => state.cartItems,
    (cartItems) => {
        return cartItems.map((it) => Number((Number(it.product.price)*it.count).toFixed(2))).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2)
    }
)(initialState)
export const { setCartItem, addItemCount, removeItemFromCart, resetState, logCarts } = cartSlice.actions;
export default cartSlice.reducer;
