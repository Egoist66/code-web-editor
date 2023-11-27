/// <reference types="vite/client" />

import { rootReducer } from "./store/root/rootReducer"
import { store } from "./store/store"


export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
