import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutocompleteSchema } from "../types/Autocomplete";

const initialState: AutocompleteSchema = {
    data: {
        countries: {
            'BY': {
                id: 'BY', label: 'Belarus', phone: '375'
            },
            'RU': {
                id: 'RU', label: 'Russian Federation', phone: '7'
            },
            'US': {
                id: 'US', label: 'United States', phone: '1'
            },
            'AD': {
                id: 'AD', label: 'Andorra', phone: '376'
            },
            'AF': {
                id: 'AF', label: 'Afghanistan', phone: '93'
            },
            'AG': {
                id: 'AG', label: 'Antigua and Barbuda', phone: '1-268'
            },
            'AM': {
                id: 'AM', label: 'Armenia', phone: '374'
            },
            'BO': {
                id: 'BO', label: 'Bolivia', phone: '591'
            },
            'CU': {
                id: 'CU', label: 'Cuba', phone: '53'
            }
        },
        movies: {
            '1': {
                id: '1', label: 'Токийская повесть'
            },
            '2': {
                id: '2', label: 'Космическая одиссея'
            }
        }
    },
    form: {
        country: {
            value: '',
            selectedValue: '',
            errors: []
        },
        movie: {
            value: '',
            selectedValue: '',
            errors: []
        }
    }
}

export const autocompleteSlice = createSlice({
    name: 'autocomplete',
    initialState,
    reducers: {
        // Country
        changeCountryValue: (state, action: PayloadAction<string>) => {
            state.form.country.value = action.payload
        },
        setCountry: (state, action: PayloadAction<{id: string, value: string}>) => {
            state.form.country.selectedValue = action.payload.id
            state.form.country.value = action.payload.value
        },
        setCountryErrors: (state, action: PayloadAction<string[]>) => {
            state.form.country.errors = action.payload
        },
        // Movie
        changeMovieValue: (state, action: PayloadAction<string>) => {
            state.form.movie.value = action.payload
        },
        setMovie: (state, action: PayloadAction<{id: string, value: string}>) => {
            state.form.movie.selectedValue = action.payload.id
            state.form.movie.value = action.payload.value
        },
        setMovieErrors: (state, action: PayloadAction<string[]>) => {
            state.form.movie.errors = action.payload
        },
    }
})

export const {actions: autocompleteActions, reducer: autocompleteReducer} = autocompleteSlice