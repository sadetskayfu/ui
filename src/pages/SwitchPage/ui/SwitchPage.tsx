import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { switchSizes } from "../model/Switch";
import { Switch } from "@/shared/ui/Switch";
import { useCallback, useMemo, useState } from "react";
import { capitalizeFirstLetter } from "@/shared/lib";
import { Checkbox } from "@/shared/ui/Checkbox";
import { FormLabel } from "@/shared/ui/FormLabel";

const SwitchPage = () => {
  const [isPreviewChecked, setIsPreviewChecked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isRequired, setIsRequired] = useState<boolean>(false);

  const handleChangeDisabled = useCallback((checked: boolean) => {
    setIsDisabled(checked);
  }, []);

  const handleChangeRequired = useCallback((checked: boolean) => {
    setIsRequired(checked);
  }, []);

  const handleChangePreviewChecked = useCallback((checked: boolean) => {
    setIsPreviewChecked(checked);
  }, []);

  const renderSizes = useMemo(() => {
    return switchSizes.map((item) => {
      return (
        <FormLabel
          label={capitalizeFirstLetter(item) as string}
          size={item}
          disabled={isDisabled}
          required={isRequired}
          Component={
            <Switch
              checked={isPreviewChecked}
              onChange={handleChangePreviewChecked}
            />
          }
        />
      );
    });
  }, [isPreviewChecked, handleChangePreviewChecked, isDisabled, isRequired]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Switch</SectionTitle>
        <div className="mods">
          <FormLabel
            label="Required"
            Component={
              <Checkbox checked={isRequired} onChange={handleChangeRequired} />
            }
          />
          <FormLabel
            label="Disabled"
            Component={
              <Checkbox checked={isDisabled} onChange={handleChangeDisabled} />
            }
          />
        </div>
        <div className="subsections">
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default SwitchPage;
