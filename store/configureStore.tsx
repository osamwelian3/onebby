import { Action, combineReducers, Reducer } from "@reduxjs/toolkit";
import { documentDirectory, EncodingType } from "expo-file-system";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";

import { createTransform, persistReducer } from "redux-persist";
import { categorySlice } from "./category/category";
import { productSlice } from "./product/product";
import { CartItem, cartSlice, CartState } from "./cart/cart";
import { orderSlice } from "./order/order";
// console.log('Document Directory:',documentDirectory);
export const expoFileSystemStorage = createExpoFileSystemStorage({
  storagePath: `${documentDirectory}customPathName/`,
  encoding: EncodingType.UTF8,
  debug: false,
});

const persist = <S, A extends Action>(key: string, reducer: Reducer<S, A>) => 
  persistReducer<S, A>(
    {
      key,
      storage: expoFileSystemStorage,
    },
    reducer
  );


const reducers = combineReducers({
  category: persist('category', categorySlice.reducer),
  product: persist('product', productSlice.reducer),
  cart: persist('cart', cartSlice.reducer),
  order: persist('order', orderSlice.reducer),
});

export default reducers;
