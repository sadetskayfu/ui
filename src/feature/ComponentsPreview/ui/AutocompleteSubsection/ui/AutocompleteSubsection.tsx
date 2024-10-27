import { Autocomplete } from "@/shared/ui/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.scss";
import {
  getCountriesArray,
  getCountryValues,
  getMoviesArray,
  getMovieValues,
} from "../../../model/selectors/autocompleteSelectors";
import { autocompleteActions } from "@/feature/ComponentsPreview/model/slice/autocompleteSlice";
import { SubsectionTitle } from "@/shared/ui/SubsectionTitle";

export const AutocompleteSubsection = () => {
  const dispatch = useDispatch();

  const country = useSelector(getCountryValues);
  const countriesArray = useSelector(getCountriesArray);
  const movie = useSelector(getMovieValues)
  const moviesArray = useSelector(getMoviesArray)

  const handleChangeCountry = (value: string) => {
    dispatch(autocompleteActions.changeCountryValue(value));
  };
  const handleSelectCountry = (id: string, value: string) => {
    dispatch(autocompleteActions.setCountry({ id, value }));
  };
  const handleChangeMovie = (value: string) => {
    dispatch(autocompleteActions.changeMovieValue(value));
  };
  const handleSelectMovie = (id: string, value: string) => {
    dispatch(autocompleteActions.setMovie({ id, value }));
  };


  return (
    <div className={styles["subsection"]}>
      <SubsectionTitle className={styles["title"]}>
        Autocomplete
      </SubsectionTitle>
      <div className={styles["filters"]}>
        <div className={styles["accordion-group"]}>
        </div>
      </div>
      <div className={styles["components"]}>
        <div className={styles["component"]}>
          <SubsectionTitle className={styles["component__title"]}>
            Countries
          </SubsectionTitle>
          <Autocomplete
            variant="countries"
            options={countriesArray}
            value={country.value}
            selectedValue={country.selectedValue}
            onChange={handleChangeCountry}
            onSelect={handleSelectCountry}
            placeholder="Select your country..."
            label="Country"
            name="country"
          />
        </div>
        <div className={styles["component"]}>
          <SubsectionTitle className={styles["component__title"]}>
            Text
          </SubsectionTitle>
          <Autocomplete
            options={moviesArray}
            value={movie.value}
            selectedValue={movie.selectedValue}
            onChange={handleChangeMovie}
            onSelect={handleSelectMovie}
            placeholder="Select your favorite movie..."
            label="Movie"
            name="movie"
          />
        </div>
      </div>
    </div>
  );
};
