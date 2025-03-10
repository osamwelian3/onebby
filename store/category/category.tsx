import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

export interface Category {
    id: Number,
    name: string,
    description: string,
    translated?: Category
}

export const fetchCategory = createAsyncThunk(
    'category/list',
    async (_, {dispatch}) => {
        return new Promise<Category[]>((resolve, reject) => {
            try {
                const api_key = "7S6NTR3BIEQ57EZYKSDV2UMHZZNGS38S";
                console.log("API KEY: ", api_key);
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://www.onebby.it/api/categories/?display=[id,name,description]&output_format=JSON',
                    auth: {
                        username: api_key,
                        password: ''
                    }
                };
                
                axios.request(config)
                .then((response) => {
                    resolve(response.data.categories as Category[])
                })
                .catch((error) => {
                    console.log(error);
                    // throw new Error("Error fetching categories: "+error);
                    reject(error);
                });
            
            } catch (error) {
                Alert.alert('Fetch Error', 'An error occured trying to fetch categories. Error: '+error);
                // throw new Error("Fetch Error: "+error);
                reject(error);
            }
        })
    }
)

export interface CategoryState {
    loading: boolean,
    categories: Category[],
    translate: boolean
}

const initialState: CategoryState = {
  loading: false,
  categories: new Array<Category>(),
  translate: false
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setTranslate: (state, action) => {
        state.translate = action.payload
    }
  },
  extraReducers(builder) {
      builder
        .addCase(fetchCategory.fulfilled, (state, action) => {
            // console.log('Fetch Categories Success: '+JSON.stringify(action.payload, null, 2));
            state.loading = false;
            state.categories = action.payload
        })
        .addCase(fetchCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategory.rejected, (state, action) => {
            console.log('Fetch Rejection: '+JSON.stringify(action.error.message, null, 2));
            state.loading = false;
        })
  },
});

export const { setTranslate } = categorySlice.actions;
export default categorySlice.reducer;
