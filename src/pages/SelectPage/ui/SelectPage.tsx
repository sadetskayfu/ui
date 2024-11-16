import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Select } from "@/shared/ui/Select";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { options } from "../model/Select";
import styles from "./style.module.scss";
import { BorderRotateAnimation } from "@/shared/ui/BorderRotateAnimation";
import { Chip } from "@/shared/ui/Chip";

const SelectPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectOption = useCallback((values: string | string[]) => {
    setSelectedOption(values as string);
  }, []);
  const handleSelectOptions = useCallback((values: string | string[]) => {
    setSelectedOptions(values as string[]);
  }, []);

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
              labelVariant="jump"
              size="medium"
              isRequired
              options={options}
              value={selectedOption}
              onSelect={handleSelectOption}
            />
          </PreviewComponents>
          <PreviewComponents title="Multi select">
            <Select
              className={styles["select"]}
              label="Select"
              placeholder="Select options..."
              labelVariant="jump"
              size="medium"
              isRequired
              options={options}
              value={selectedOptions}
              onSelect={handleSelectOptions}
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default SelectPage;
