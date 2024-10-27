interface Country {
    id: string
    label: string
    phone: string
}

interface Movie{
    id: string
    label: string
}

interface Autocomplete {
    value: string
    selectedValue: string
    errors: string[]
}

export interface AutocompleteSchema {
    data: {
        countries: Record<string, Country>
        movies: Record<string, Movie>
    }
    form: {
        country: Autocomplete
        movie: Autocomplete
    }
}