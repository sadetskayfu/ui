import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { options } from "../model/Autocomplete";
import { Autocomplete } from "@/shared/ui/Autocomplete";
import styles from './style.module.scss'

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

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Autocomplete</SectionTitle>
        {selectedMovies}
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
            />
          </PreviewComponents>
          <PreviewComponents title="Multi autocomplete">
            <Autocomplete
              className={styles['autocomplete']}
              id="multi-movies-autocomplete"
              onChange={handleChangeMovieMultiValue}
              onSelect={handleSelectMovies}
              options={options}
              value={movieMultiValue}
              selectedValue={selectedMovies}
              fieldProps={{ label: "Movies", placeholder: "Select movies"}}
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;
