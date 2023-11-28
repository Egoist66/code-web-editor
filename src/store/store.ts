import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "../vite-env";
import EditorTopPanelSliceReducer from "./slices/editor-top-panel";
import {
     persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
     REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
     key: 'root',
     storage,
}

const persistedReducer = persistReducer(persistConfig, EditorTopPanelSliceReducer)


export const store = configureStore({
     reducer: persistedReducer,
     devTools: true,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
          }),

})

export const persistor = persistStore(store)









export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

