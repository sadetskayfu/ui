import { configureStore } from "@reduxjs/toolkit";
import { fieldReducer, autocompleteReducer } from "@/feature/ComponentsPreview";

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        autocomplete: autocompleteReducer
    },

})

export type AppState = ReturnType<typeof store.getState>

