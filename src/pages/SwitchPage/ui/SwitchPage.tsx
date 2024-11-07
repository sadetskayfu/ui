import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { switchSizes } from "../model/Switch";
import { Switch } from "@/shared/ui/Switch";
import { useCallback, useMemo, useState } from "react";
import { capitalizeFirstLetter } from "@/shared/lib";
import { Checkbox } from "@/shared/ui/Checkbox";

const SwitchPage = () => {
  const [isPreviewChecked, setIsPreviewChecked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isRequired, setIsRequired] = useState<boolean>(false);

  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);

  const handleToggleRequired = useCallback(() => {
    setIsRequired((prev) => !prev);
  }, []);

  const handleTogglePreviewChecked = useCallback(() => {
    setIsPreviewChecked((prev) => !prev);
  }, []);

  const renderSizes = useMemo(() => {
    return switchSizes.map((item) => {
      return (
        <Switch
          key={item}
          size={item}
          label={capitalizeFirstLetter(item) as string}
          name={item}
          isChecked={isPreviewChecked}
          onToggle={handleTogglePreviewChecked}
          isDisabled={isDisabled}
          isRequired={isRequired}
        />
      );
    });
  }, [isPreviewChecked, handleTogglePreviewChecked, isDisabled, isRequired]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Switch</SectionTitle>
        <div className="filter">
          <Checkbox
            isChecked={isDisabled}
            label="Disabled"
            name="disabled"
            onToggle={handleToggleDisabled}
          />
          <Checkbox
            isChecked={isRequired}
            label="Required"
            name="require"
            onToggle={handleToggleRequired}
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
