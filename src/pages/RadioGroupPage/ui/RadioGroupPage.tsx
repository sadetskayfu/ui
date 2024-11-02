import { SectionTitle } from "@/shared/ui/SectionTitle";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { useCallback, useMemo, useState } from "react";
import { items, radioSizes } from "../model/RadioGroup";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { capitalizeFirstLetter } from "@/shared/lib";
import styles from "./style.module.scss";

const RadioGroupPage = () => {
  const [selectedValue, setSelectedValue] = useState<string>("1");

  const handleSelectValue = useCallback((value: string) => {
    setSelectedValue(value);
  }, []);

  const renderSizes = useMemo(() => {
    return radioSizes.map((item) => {
        return (
            <RadioGroup
            items={items}
            onChange={handleSelectValue}
            selectedValue={selectedValue}
            name={item}
            title={capitalizeFirstLetter(item) as string}
            size={item}
          /> 
        )
    })
  }, [selectedValue, handleSelectValue])

  return (
    <div className={styles["page"]}>
      <SectionTitle>Radio Group</SectionTitle>
      <div className={styles["subsections"]}>
        <PreviewComponents title="Sizes">
            {renderSizes}
        </PreviewComponents>
        <PreviewComponents title="Horizontal Direction">
            <RadioGroup
              items={items}
              onChange={handleSelectValue}
              selectedValue={selectedValue}
              name="horizontal"
              title="Horizontal"
              size="small"
              direction="horizontal"
            />
        </PreviewComponents>
      </div>
    </div>
  );
};

export default RadioGroupPage;
