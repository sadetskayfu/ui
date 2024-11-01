import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import { checkboxSizes, checkboxVariants } from "../model/Checkbox";
import { capitalizeFirstLetter } from "@/shared/lib";
import styles from "./style.module.scss";

const CheckboxPage = () => {
  const [isPreviewChecked, setIsPreviewChecked] = useState<boolean>(false);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleTogglePreviewChecked = useCallback(() => {
    setIsPreviewChecked((prev) => !prev);
  }, []);
  const handleToggleRequired = useCallback(() => {
    setIsRequired((prev) => !prev);
  }, []);
  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);

  const renderSizes = useMemo(() => {
    return checkboxSizes.map((item) => {
      return (
        <Checkbox
          key={item}
          className={styles['checkbox']}
          size={item}
          label={capitalizeFirstLetter(item) as string}
          name={item}
          isChecked={isPreviewChecked}
          onToggle={handleTogglePreviewChecked}
          isRequired={isRequired}
          isDisabled={isDisabled}
        />
      );
    });
  }, [isDisabled, isRequired, isPreviewChecked, handleTogglePreviewChecked]);

  const renderVariants = useMemo(() => {
    return checkboxVariants.map((item) => {
      return (
        <Checkbox
          key={item}
          className={styles['checkbox']}
          variant={item}
          label={capitalizeFirstLetter(item) as string}
          name={item}
          isChecked={isPreviewChecked}
          onToggle={handleTogglePreviewChecked}
          isRequired={isRequired}
          isDisabled={isDisabled}
        />
      );
    });
  }, [isDisabled, isRequired, isPreviewChecked, handleTogglePreviewChecked]);

  return (
    <div className={styles["page"]}>
      <SectionTitle>Checkbox</SectionTitle>
      <div className={styles["mods"]}>
        <Checkbox
          label="Required"
          isChecked={isRequired}
          name="required"
          onToggle={handleToggleRequired}
        />
        <Checkbox
          label="Disabled"
          isChecked={isDisabled}
          name="disabled"
          onToggle={handleToggleDisabled}
        />
      </div>
      <div className={styles["subsections"]}>
        <PreviewComponents title="Variants">{renderVariants}</PreviewComponents>
        <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
      </div>
    </div>
  );
};

export default CheckboxPage;
