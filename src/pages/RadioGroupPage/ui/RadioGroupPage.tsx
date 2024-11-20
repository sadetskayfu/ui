import { SectionTitle } from "@/shared/ui/SectionTitle";
import {
  Radio,
  RadioColor,
  RadioGroup,
  RadioVariant,
} from "@/shared/ui/RadioGroup";
import { useCallback, useMemo, useState } from "react";
import { radioColors, radioSizes, radioVariants } from "../model/RadioGroup";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { capitalizeFirstLetter } from "@/shared/lib";

const RadioGroupPage = () => {
  const [value, setValue] = useState<string>("option1");
  const [variant, setVariant] = useState<RadioVariant>("filled");

  const handleToggleValue = useCallback((value: string) => {
    setValue(value);
  }, []);
  const handleToggleVariant = useCallback((value: string) => {
    setVariant(value as RadioVariant);
  }, []);

  const renderSizes = useMemo(() => {
    return radioSizes.map((item) => {
      return (
        <RadioGroup
          onChange={handleToggleValue}
          selectedValue={value}
          name={item}
          size={item}
          variant={variant}
          legend={capitalizeFirstLetter(item) as string}
        >
          <Radio label="Option 1" value="option1" />
          <Radio label="Option 2" value="option2" />
          <Radio label="Option 3" value="option3" isDisabled />
        </RadioGroup>
      );
    });
  }, [handleToggleValue, value, variant]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Radio Group</SectionTitle>
        <div className="mods">
          <RadioGroup
            legend="Variants"
            name="variant"
            onChange={handleToggleVariant}
            selectedValue={variant}
          >
            {radioVariants.map((radio) => {
              return <Radio label={radio.label} value={radio.value} />;
            })}
          </RadioGroup>
        </div>
        <div className="subsections">
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
          <PreviewComponents title="Horizontal direction">
            <RadioGroup
              onChange={handleToggleValue}
              selectedValue={value}
              name={"horizontal-radio"}
              size="small"
              variant={variant}
              legend="Horizontal radio group"
              direction="horizontal"
            >
              <Radio label="Option 1" value="option1" />
              <Radio label="Option 2" value="option2" />
              <Radio label="Option 3" value="option3" isDisabled />
            </RadioGroup>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default RadioGroupPage;
