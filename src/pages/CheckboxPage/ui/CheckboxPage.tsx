import { SectionTitle } from "@/shared/ui/SectionTitle";
import styles from "./style.module.scss";
import { ComponentsPreview } from "@/feature/ComponentsPreview";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useState } from "react";

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
        <PreviewComponents title="Sizes">
          <Checkbox
            label="Small"
            isChecked={isPreviewChecked}
            name="small"
            onToggle={handleTogglePreviewChecked}
            size="small"
          />
          <Checkbox
            label="Large"
            isChecked={isPreviewChecked}
            name="large"
            onToggle={handleTogglePreviewChecked}
            size="large"
          />
        </PreviewComponents>
      </div>
    </div>
  );
};

export default CheckboxPage;
