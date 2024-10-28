import { Button } from "@/shared/ui/Button";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useState } from "react";
import Icon from "@/shared/assets/icons/news.svg?react";
import styles from "./style.module.scss";
import {
  buttonSizes,
  buttonVariants,
  minimalismButtonVariants,
} from "../model/Button";
import { capitalizeFirstLetter } from "@/shared/lib";

const ButtonPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);

  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleToggleIcon = useCallback(() => {
    setIcon((prev) => !prev);
  }, []);

  const renderVariants = () => {
    return buttonVariants.map((btn) => {
      return (
        <Button
          onClick={() => undefined}
          variant={btn}
          Icon={icon && Icon}
          isDisabled={isDisabled}
        >
          {capitalizeFirstLetter(btn) as string}
        </Button>
      );
    });
  };

  const renderMinimalismVariants = () => {
    return minimalismButtonVariants.map((btn) => {
      return (
        <Button
          onClick={() => undefined}
          variant={btn.variant}
          minimalism={btn.minimalism}
          Icon={Icon}
          isDisabled={isDisabled}
        >
          {btn.variant}
        </Button>
      );
    });
  };

  const renderSizes = () => {
    return buttonSizes.map((btn) => {
      return (
        <Button
          onClick={() => undefined}
          variant={btn.variant}
          minimalism={btn.minimalism}
          size={btn.size}
          Icon={btn.minimalism !== "none" ? Icon : icon && Icon}
          isDisabled={isDisabled}
        >
          {capitalizeFirstLetter(btn.variant) as string}
        </Button>
      );
    });
  };

  return (
    <div className={styles["page"]}>
      <SectionTitle>Button</SectionTitle>
      <div className={styles["mods"]}>
        <Checkbox
          isChecked={isDisabled}
          label="Disabled"
          name="disabled"
          onToggle={handleToggleDisabled}
        />
        <Checkbox
          isChecked={icon}
          label="Icon"
          name="icon"
          onToggle={handleToggleIcon}
        />
      </div>
      <div className={styles["subsections"]}>
        <PreviewComponents title="Button Variants">
          {renderVariants()}
        </PreviewComponents>
        <PreviewComponents title="Minimalism Variants">
          {renderMinimalismVariants()}
        </PreviewComponents>
        <PreviewComponents title="Sizes">{renderSizes()}</PreviewComponents>
      </div>
    </div>
  );
};

export default ButtonPage;
