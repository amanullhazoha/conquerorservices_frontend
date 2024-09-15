import { jobApplicationApi } from "../slice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      jobApplicationApi.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
