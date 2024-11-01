import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { switchSizes } from "../model/Switch";
import { Switch } from "@/shared/ui/Switch";
import { useCallback, useMemo, useState } from "react";
import { capitalizeFirstLetter } from "@/shared/lib";
import { Checkbox } from "@/shared/ui/Checkbox";
import styles from "./style.module.scss";

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
    <div className={styles["page"]}>
      <SectionTitle>Switch</SectionTitle>
      <div className={styles["mods"]}>
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
      <div className={styles["subsections"]}>
        <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
      </div>
    </div>
  );
};

export default SwitchPage;
