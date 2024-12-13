import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Select } from "@/shared/ui/Select";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useMemo, useState } from "react";
import { options } from "../model/Select";
import styles from "./style.module.scss";
import { InputAdornment } from "@/shared/ui/InputAdornment";
import { OptionItem } from "@/shared/ui/OptionItem";

const SelectPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectOption = useCallback((values: string | string[]) => {
    setSelectedOption(values as string);
  }, []);
  const handleSelectOptions = useCallback((values: string | string[]) => {
    setSelectedOptions(values as string[]);
  }, []);


  const getDisabledOption = useCallback((value: string) => {
    if (value === "2" || value === "5") {
      return true;
    }
    return false;
  }, []);

  const renderOptions = useMemo(() => {
    return options.map((option) => {
      return <OptionItem key={option.value} value={option.value} label={option.label}/>
    })
  }, [])

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Select</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Single select" direction="vertical">
            <Select
              id="medium-single-select"
              className={styles["select"]}
              label="Medium"
              placeholder="Select option..."
              size="medium"
              options={options}
              value={selectedOption}
              onSelect={handleSelectOption}
              startAdornment={<InputAdornment>Movie</InputAdornment>}
              getDisabledOption={getDisabledOption}
            >
              {renderOptions}
            </Select>
            <Select
              id="large-single-select"
              className={styles["select"]}
              label="Large"
              placeholder="Select option..."
              size="large"
              options={options}
              value={selectedOption}
              onSelect={handleSelectOption}
            >
              {renderOptions}
            </Select>
          </PreviewComponents>
          <PreviewComponents title="Multi select" direction="vertical">
            <Select
              id="medium-multi-select"
              className={styles["select"]}
              label="Medium"
              placeholder="Select options..."
              size="medium"
              options={options}
              value={selectedOptions}
              onSelect={handleSelectOptions}
              getDisabledOption={getDisabledOption}
            >
              {renderOptions}
            </Select>
            <Select
              id="large-multi=select"
              className={styles["select"]}
              label="Large"
              placeholder="Select options..."
              size="large"
              options={options}
              value={selectedOptions}
              onSelect={handleSelectOptions}
            >
              {renderOptions}
            </Select>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default SelectPage;
