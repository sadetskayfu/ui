import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useMemo, useState } from "react";
import { countriesMap, options } from "../model/Autocomplete";
import { Autocomplete } from "@/shared/ui/Autocomplete";
import styles from "./style.module.scss";
import { OptionItem } from "@/shared/ui/OptionItem";

const AutocompletePage = () => {
  const [movieMultiValue, setMovieMultiValue] = useState<string>("");
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);

  const [countryValue, setCountryValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleChangeCountryValue = useCallback((value: string) => {
    setCountryValue(value);
  }, []);
  const handleSelectCountry = useCallback((value: string | string[]) => {
    setSelectedCountry(value as string);
  }, []);

  const handleChangeMovieMultiValue = useCallback((value: string) => {
    setMovieMultiValue(value);
  }, []);
  const handleSelectMovies = useCallback((value: string | string[]) => {
    setSelectedMovies(value as string[]);
  }, []);

  const renderChildrenOptions = useMemo(() => {
    return options.map((option) => (
      <OptionItem key={option.value} label={option.label} value={option.value} />
    ));
  }, []);

  const renderCountries = useMemo(() => {
    return countriesMap.map((option) => (
      <OptionItem
        value={option.value}
        label={option.label}
        key={option.value}
        StartIcon={
          <img
            loading="lazy"
            src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
          />
        }
      >
        <div>
          {option.label} {option.code}  +{option.phone}
        </div>
      </OptionItem>
    ));
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Autocomplete</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Multi autocomplete with groups">
            <Autocomplete
              className={styles["multi-autocomplete"]}
              id="movies-autocomplete"
              onChange={handleChangeMovieMultiValue}
              onSelect={handleSelectMovies}
              options={options}
              value={movieMultiValue}
              selectedValue={selectedMovies}
              label="Movies"
              placeholder="Select movies.."
            >
              {renderChildrenOptions}
            </Autocomplete>
          </PreviewComponents>
          <PreviewComponents title="Countries">
            <Autocomplete
              className={styles["autocomplete"]}
              id="countries-autocomplete"
              onChange={handleChangeCountryValue}
              onSelect={handleSelectCountry}
              options={countriesMap}
              value={countryValue}
              selectedValue={selectedCountry}
              label="Country"
              placeholder="Select country.."
            >
              {renderCountries} 
            </Autocomplete>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;
