import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { options } from "../model/Autocomplete";
import { Autocomplete } from "@/shared/ui/Autocomplete";
import styles from './style.module.scss'

const AutocompletePage = () => {
  const [movieValue, setMovieValue] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");

  const handleChangeMovieValue = useCallback((value: string) => {
    setMovieValue(value);
  }, []);
  const handleSelectMovie = useCallback((value: string | string[]) => {
    setSelectedMovie(value as string);
  }, []);

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
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;
