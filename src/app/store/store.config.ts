import thunkMiddleware from "redux-thunk";
import { logger } from "redux-logger";
import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { reducers } from "./reducers/reducers";

export function configureAppStore(preloadedState?: any) {
  const middlewares: any[] = [thunkMiddleware];

  window.process = { ...window.process };

  if (process?.env?.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const store = configureStore({
    reducer: reducers,
    middleware: [...middlewares],
  });

  return store;
}

export const store = configureAppStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export function createThunk<T>(thunk: AppThunk<T>) { return thunk; }