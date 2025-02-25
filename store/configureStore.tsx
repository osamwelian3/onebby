import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { documentDirectory, EncodingType } from "expo-file-system";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";

import { persistReducer } from "redux-persist";
import { categorySlice } from "./category/category";
console.log('Document Directory:',documentDirectory);
export const expoFileSystemStorage = createExpoFileSystemStorage({
  storagePath: `${documentDirectory}customPathName/`,
  encoding: EncodingType.UTF8,
  debug: true,
});
const persist = (key: string, reducer: Reducer) =>
  persistReducer(
    {
      key,
      storage: expoFileSystemStorage,
    },
    reducer
  );

// js
// const combinePersistReducers = (keys) =>
//   Object.keys(keys).reduce(
//     (obj, key) => ({
//       ...obj,
//       [key]: persist(key, keys[key]),
//     }),
//     {}
//   );

// ts
const combinePersistReducers = <T extends Record<string, any>>(keys: T): Record<keyof T, any> => 
    Object.keys(keys).reduce(
      (obj, key) => ({
        ...obj,
        [key]: persist(key, keys[key]),
      }),
      {} as Record<keyof T, any>
    );  

const reducers = combineReducers({
  ...combinePersistReducers({
    category: categorySlice,
  }),
});

export default reducers;
