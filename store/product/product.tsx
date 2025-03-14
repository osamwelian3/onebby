import { GroupedProducts } from "@/utils/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert, ToastAndroid } from "react-native";

export interface Product {
    id: Number,
    name: string,
    description: string,
    price: string,
    id_category_default: Number,
    id_default_image: Number,
    active: Number,
    image_ids?: Array<Number>
}

export const fetchProduct = createAsyncThunk(
    'product/list',
    async (_, {dispatch}) => {
        return new Promise<Product[]>((resolve, reject) => {
            try {
                const api_key = "7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S";
                console.log("API KEY products: ", api_key);
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://www.onebby.it/api/products/?display=[id,name,description,price,id_category_default,active,id_default_image]&output_format=JSON&filter[active]=1',
                    auth: {
                        username: api_key,
                        password: ''
                    }
                };
                
                axios.request(config)
                .then((response) => {
                    resolve(response.data.products as Product[])
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
            
            } catch (error) {
                Alert.alert('Fetch Error', 'An error occured trying to fetch products. Error: '+error);
                // throw new Error("Fetch Error: "+error);
                reject(error as Error);
            }
        })
    }
)

export interface ProductState {
    loading: boolean,
    products: Product[],
    groupedProducts: GroupedProducts[],
    wishlist: Product[],
    history: Product[]
}

const initialState: ProductState = {
  loading: false,
  products: new Array<Product>(),
  groupedProducts: new Array<GroupedProducts>(),
  wishlist: new Array<Product>(),
  history: new Array<Product>()
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAppGroupedProducts: (state, action: {payload: GroupedProducts[], type: string}) => {
        state.groupedProducts = action.payload
    },
    addToWishlist: (state, action: {payload: Product, type: string}) => {
        state.wishlist = [...state.wishlist.filter((item) => item.id !== action.payload.id), action.payload]
        ToastAndroid.show('Added to Wishlist', ToastAndroid.SHORT);
    },
    removeFromWishlist: (state, action: {payload: Product, type: string}) => {
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id)
        ToastAndroid.show('Removed from Wishlist', ToastAndroid.SHORT);
    },
    addToHistory: (state, action: {payload: Product, type: string}) => {    
        state.history = [action.payload, ...state.history.filter((item) => item.id !== action.payload.id)]
    },
    removeFromHistory: (state, action: {payload: Product, type: string}) => {
        state.history = state.history.filter((item) => item.id !== action.payload.id)
    }
  },
  extraReducers(builder) {
      builder
        .addCase(fetchProduct.fulfilled, (state, action) => {
            // console.log('Fetch Product Success: '+JSON.stringify(action.payload, null, 2));
            state.loading = false;
            state.products = action.payload
        })
        .addCase(fetchProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            console.log('Fetch Rejection: '+JSON.stringify(action.error.message, null, 2));
            state.loading = false;
        })
  },
});

export const { setAppGroupedProducts, addToWishlist, removeFromWishlist, addToHistory, removeFromHistory } = productSlice.actions;
export default productSlice.reducer;
