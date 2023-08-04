import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import { todoApi } from './service'
import { createWrapper } from 'next-redux-wrapper'

export const store = () => configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
})

// setupListeners(store.dispatch)

export type AppStore = ReturnType<typeof store>;

export const wrapper = createWrapper<AppStore>(store, {debug: true});