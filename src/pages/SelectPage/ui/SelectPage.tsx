import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Select, SelectLabelVariant, SelectVariant } from "@/shared/ui/Select";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useMemo, useState } from "react";
import { options, selectLabelVariants, selectVariants } from "../model/Select";
import styles from "./style.module.scss";
import { MenuItem } from "@/shared/ui/MenuItem";
import { Radio, RadioGroup } from "@/shared/ui/RadioGroup";
import { Checkbox } from "@/shared/ui/Checkbox";

const SelectPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [labelVariant, setLabelVariant] =
    useState<SelectLabelVariant>("visible");
  const [variant, setVariant] = useState<SelectVariant>("outlined");

  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(false);

  const handleSelectOption = useCallback((values: string | string[]) => {
    setSelectedOption(values as string);
  }, []);
  const handleSelectOptions = useCallback((values: string | string[]) => {
    setSelectedOptions(values as string[]);
  }, []);

  const handleToggleLabelVariant = useCallback((value: string) => {
    setLabelVariant(value as SelectLabelVariant);
  }, []);
  const handleToggleVariant = useCallback((value: string) => {
    setVariant(value as SelectVariant);
  }, []);

  const handleToggleRequired = useCallback(() => {
    setIsRequired((prev) => !prev);
  }, []);
  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleToggleReadonly = useCallback(() => {
    setIsReadonly((prev) => !prev);
  }, []);

  const optionsArray = useMemo(() => Object.values(options), []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Select</SectionTitle>
        <div className="mods">
          <RadioGroup
            legend="Variants"
            name="variant"
            direction="horizontal"
            selectedValue={variant}
            onChange={handleToggleVariant}
          >
            {selectVariants.map((radio) => {
              return (
                <Radio
                  key={radio.value}
                  label={radio.label}
                  value={radio.value}
                />
              );
            })}
          </RadioGroup>
          <RadioGroup
            legend="Label variants"
            name="label-variant"
            direction="horizontal"
            selectedValue={labelVariant}
            onChange={handleToggleLabelVariant}
          >
            {selectLabelVariants.map((radio) => {
              return (
                <Radio
                  key={radio.value}
                  label={radio.label}
                  value={radio.value}
                />
              );
            })}
          </RadioGroup>
          <div>
            <Checkbox
              label="Required"
              isChecked={isRequired}
              onToggle={handleToggleRequired}
            />
            <Checkbox
              label="Disabled"
              isChecked={isDisabled}
              onToggle={handleToggleDisabled}
            />
            <Checkbox
              label="Readonly"
              isChecked={isReadonly}
              onToggle={handleToggleReadonly}
            />
          </div>
        </div>
        <div className="subsections">
          <PreviewComponents title="Single select" direction="vertical">
            <Select
              className={styles["select"]}
              label="Medium"
              placeholder="Select option..."
              size="medium"
              options={options}
              value={selectedOption}
              onSelect={handleSelectOption}
              variant={variant}
              labelVariant={labelVariant}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
            >
              {optionsArray.map((option) => {
                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    isDisabled={
                      option.value === "10:30" || option.value === "12:00"
                    }
                  >
                    <span>{option.label}</span>
                  </MenuItem>
                );
              })}
            </Select>
            <Select
              className={styles["select"]}
              label="Large"
              placeholder="Select option..."
              size="large"
              options={options}
              value={selectedOption}
              onSelect={handleSelectOption}
              variant={variant}
              labelVariant={labelVariant}
              isDisabled={isDisabled}
              isReadonly={isReadonly}
              isRequired={isRequired}
            >
              {optionsArray.map((option) => {
                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    isDisabled={
                      option.value === "10:30" || option.value === "12:00"
                    }
                  >
                    <span>{option.label}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </PreviewComponents>
          <PreviewComponents title="Multi select" direction="vertical">
            <Select
              className={styles["select"]}
              label="Medium"
              placeholder="Select options..."
              size="medium"
              options={options}
              value={selectedOptions}
              onSelect={handleSelectOptions}
              variant={variant}
              labelVariant={labelVariant}
            ></Select>
            <Select
              className={styles["select"]}
              label="Large"
              placeholder="Select options..."
              size="large"
              options={options}
              value={selectedOptions}
              onSelect={handleSelectOptions}
              variant={variant}
              labelVariant={labelVariant}
            ></Select>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default SelectPage;
