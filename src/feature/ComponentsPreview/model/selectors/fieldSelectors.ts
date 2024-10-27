import { AppState } from "@/app/providers/store";
import { createSelector } from "@reduxjs/toolkit";

export const getEmail = (state: AppState) => state.field.form.email;

export const getPassword = (state: AppState) => state.field.form.password;

export const getSelectedThemeVariantId = (state: AppState) =>
  state.field.form.selectedThemeVariantId;

export const getSelectedLabelVariantId = (state: AppState) =>
  state.field.form.selectedLabelVariantId;

export const getThemeVariants = (state: AppState) =>
    state.field.data.themeVariants;

export const getThemeVariantsArray = createSelector(
  [getThemeVariants],
  (variants) => Object.values(variants)
)

export const getLabelVariants = (state: AppState) => state.field.data.labelVariants

export const getLabelVariantsArray = createSelector(
  [getLabelVariants],
  (variants) => Object.values(variants)
)

export const getMods = (state: AppState) => state.field.form.mods

export const getModsArray = createSelector(
  [getMods],
  (mods) => Object.values(mods)
)