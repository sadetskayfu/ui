import { SectionTitle } from "@/shared/ui/SectionTitle";
import {
  Radio,
} from "@/shared/ui/Radio";
import { useCallback, useState } from "react";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { FormGroup } from "@/shared/ui/FormGroup";
import { FormLabel } from "@/shared/ui/FormLabel";

const RadioGroupPage = () => {
  const [value, setValue] = useState<string>("1");

  const handleToggleValue = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Radio Group</SectionTitle>
        <PreviewComponents title="Sizes">
          <FormGroup label="Medium" direction="vertical">
            <FormLabel
              label="Option 1"
              Component={
                <Radio
                  value="1"
                  selectedValue={value}
                  onChange={handleToggleValue}
                  name="small-size-radio"
                />
              }
            />
            <FormLabel
              label="Option 2"
              Component={
                <Radio
                  value="2"
                  selectedValue={value}
                  onChange={handleToggleValue}
                  name="small-size-radio"
                />
              }
            />
            <FormLabel
              label="Option 3"
              Component={
                <Radio
                  value="3"
                  selectedValue={value}
                  onChange={handleToggleValue}
                  name="small-size-radio"
                />
              }
            />
          </FormGroup>
        </PreviewComponents>
      </section>
    </div>
  );
};

export default RadioGroupPage;
