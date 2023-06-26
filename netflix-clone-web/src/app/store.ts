import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit"

export const appStore = configureStore({
  reducer: {},
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>