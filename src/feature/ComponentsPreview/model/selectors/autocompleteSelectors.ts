import { AppState } from "@/app/providers/store";
import { createSelector } from "@reduxjs/toolkit";


export const getCountries = (state: AppState) => state.autocomplete.data.countries

export const getCountriesArray = createSelector(
    [getCountries],
    (country) => Object.values(country)
)

export const getCountryValues = (state: AppState) => state.autocomplete.form.country

export const getMovies = (state: AppState) => state.autocomplete.data.movies
export const getMoviesArray = createSelector(
    [getMovies],
    (movie) => Object.values(movie)
)
export const getMovieValues = (state: AppState) => state.autocomplete.form.movie
