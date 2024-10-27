import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldSchema, Mod } from "../types/Field";

const initialState: FieldSchema = {
  data: {
    themeVariants: {
      '1': {value: '1', label: "primary"},
      '2': {value: '2', label: "transparent"}
    },
    labelVariants: {
      '1': {value: '1', label: "placeholder"},
      '2': {value: '2', label: "static"},
      '3': {value: '3', label: "none"},
    }
  },
  form: {
    email: {
      value: "",
      errors: [],
    },
    password: {
      value: "",
      errors: [],
    },
    selectedThemeVariantId: "1",
    selectedLabelVariantId: "1",
    mods: {
      disabled: { name: "disabled", label: "disabled", value: false },
      readonly: { name: "readonly", label: "readonly", value: false },
      required: { name: "required", label: "required", value: false },
      validate: { name: "validate", label: "validate", value: false },
    },
  },
};

export const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.form.email.value = action.payload;
    },
    setEmailErrors: (state, action: PayloadAction<string[]>) => {
      state.form.email.errors = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.form.password.value = action.payload;
    },
    setPasswordErrors: (state, action: PayloadAction<string[]>) => {
      state.form.password.errors = action.payload;
    },
    toggleThemeVariant: (state, action: PayloadAction<string>) => {
      state.form.selectedThemeVariantId = action.payload;
    },
    toggleLabelVariant: (state, action: PayloadAction<string>) => {
      state.form.selectedLabelVariantId = action.payload;
    },
    toggleMod: (state, action: PayloadAction<Mod>) => {
      const mod = action.payload;
      state.form.mods[mod].value =
        state.form.mods[mod].value === false ? true : false;
    },
  },
});

export const { actions: fieldActions, reducer: fieldReducer } = fieldSlice;
