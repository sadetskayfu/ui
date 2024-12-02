import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useMemo, useState } from "react";
import { options } from "../model/Autocomplete";
import { Autocomplete } from "@/shared/ui/Autocomplete";
import styles from './style.module.scss'
import { MenuItem } from "@/shared/ui/MenuItem";

const AutocompletePage = () => {
  const [movieValue, setMovieValue] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");

  const [movieMultiValue, setMovieMultiValue] = useState<string>('')
  const [selectedMovies, setSelectedMovies] = useState<string[]>([])

  const handleChangeMovieValue = useCallback((value: string) => {
    setMovieValue(value);
  }, []);
  const handleSelectMovie = useCallback((value: string | string[]) => {
    setSelectedMovie(value as string);
  }, []);

  const handleChangeMovieMultiValue = useCallback((value: string) => {
    setMovieMultiValue(value);
  }, []);
  const handleSelectMovies = useCallback((value: string | string[]) => {
    setSelectedMovies(value as string[]);
  }, []);

  const renderChildrenOptions = useMemo(() => {
    return options.map((option) => (
      <MenuItem key={option.value} label={option.label} value={option.value}>{option.label}</MenuItem>
    ))
  }, [])

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Autocomplete</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Single autocomplete">
            <Autocomplete
              className={styles['autocomplete']}
              id="single-movie-autocomplete"
              onChange={handleChangeMovieValue}
              onSelect={handleSelectMovie}
              options={options}
              value={movieValue}
              selectedValue={selectedMovie}
              fieldProps={{ label: "Movie", placeholder: "Select movie"}}
              groupBy="first-letter"
            />
          </PreviewComponents>
          
          <PreviewComponents title="Multi autocomplete">
            <Autocomplete
              className={styles['multi-autocomplete']}
              id="multi-movies-autocomplete"
              onChange={handleChangeMovieMultiValue}
              onSelect={handleSelectMovies}
              options={options}
              value={movieMultiValue}
              selectedValue={selectedMovies}
              fieldProps={{ label: "Movies", placeholder: "Select movies"}}
              optionsMenuProps={{width: '500px'}}
              groupBy="first-letter"
            >
              {renderChildrenOptions}
            </Autocomplete>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;
