import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useMemo, useState } from "react";
import { countries } from "../model/Autocomplete";
import { Autocomplete } from "@/shared/ui/Autocomplete";

const AutocompletePage = () => {
  const [countryValue, setCountryValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countryError, setCountryError] = useState<string[]>([]);

  const handleChangeCountryValue = useCallback((value: string) => {
    setCountryValue(value);
  }, []);
  const handleSelectCountry = useCallback((id: string, value: string) => {
    setCountryValue(value);
    setSelectedCountry(id);
  }, []);

  const getCountriesArray = useMemo(() => {
    return Object.values(countries);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Autocomplete</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Countries">
            {/* <Autocomplete
              label="Country"
              name="country"
              options={getCountriesArray}
              value={countryValue}
              selectedValue={selectedCountry}
              onChange={handleChangeCountryValue}
              onSelect={handleSelectCountry}
              errorMessage={countryError[0]}
              variant="countries"
              placeholder="Select you country..."
            /> */}
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default AutocompletePage;
