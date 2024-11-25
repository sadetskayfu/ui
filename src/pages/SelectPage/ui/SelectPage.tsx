import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Select } from "@/shared/ui/Select";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useMemo, useState } from "react";
import { options } from "../model/Select";
import styles from "./style.module.scss";
import { requiredValidate } from "@/shared/lib/validate";
import { MenuItem } from "@/shared/ui/MenuItem";

const SelectPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [errorSingleSelect, setErrorSingleSelect] = useState<string>("");

  const handleSelectOption = useCallback((values: string | string[]) => {
    setSelectedOption(values as string);
  }, []);
  const handleSelectOptions = useCallback((values: string | string[]) => {
    setSelectedOptions(values as string[]);
  }, []);

  const handleValidateSingleSelect = useCallback(() => {
    const errors = requiredValidate(selectedOption);
    setErrorSingleSelect(errors[0]);
  }, [selectedOption]);

  const optionsArray = useMemo(() => Object.values(options), []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Select</SectionTitle>
        <div className="subsections">
          <PreviewComponents title="Single select">
            <Select
              className={styles["select"]}
              label="Select"
              placeholder="Select option..."
              size="medium"
              isRequired
              options={options}
              value={selectedOption}
              onSelect={handleSelectOption}
              onBlur={handleValidateSingleSelect}
              errorMessage={errorSingleSelect}
            >
              {optionsArray.map((option) => {
                return <MenuItem value={option.value} isDisabled={option.value === '11:00'}>{option.label}</MenuItem>;
              })}
            </Select>
          </PreviewComponents>
          <PreviewComponents title="Multi select">
            <Select
              className={styles["select"]}
              label="Select"
              placeholder="Select options..."
              size="medium"
              options={options}
              value={selectedOptions}
              onSelect={handleSelectOptions}
            >
              {optionsArray.map((option) => {
                return <MenuItem value={option.value}>{option.label}</MenuItem>;
              })}
            </Select>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default SelectPage;
