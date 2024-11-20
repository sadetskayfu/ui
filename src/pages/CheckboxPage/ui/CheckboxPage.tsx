import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import { checkboxSizes, checkboxVariants } from "../model/Checkbox";
import { capitalizeFirstLetter } from "@/shared/lib";
import styles from "./style.module.scss";

const CheckboxPage = () => {
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleToggleLiked = useCallback(() => {
    setIsLiked((prev) => !prev);
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
          className={styles["checkbox"]}
          size={item}
          label={capitalizeFirstLetter(item) as string}
          name={item}
          isRequired={isRequired}
          isDisabled={isDisabled}
          onToggle={() => undefined}
          isChecked={false}
        />
      );
    });
  }, [isDisabled, isRequired]);

  const renderVariants = useMemo(() => {
    return checkboxVariants.map((item) => {
      return (
        <Checkbox
          key={item}
          className={styles["checkbox"]}
          variant={item}
          label={capitalizeFirstLetter(item) as string}
          name={item}
          onToggle={() => undefined}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isChecked={false}
        />
      );
    });
  }, [isDisabled, isRequired]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Checkbox</SectionTitle>
        <div>
          <Checkbox
            label="Required"
            isChecked={isRequired}
            name="required"
            onToggle={handleToggleRequired}
            color="red"
          />
          <Checkbox
            label="Disabled"
            isChecked={isDisabled}
            name="disabled"
            onToggle={handleToggleDisabled}
          />
        </div>
        <div className="subsections">
          <PreviewComponents title="Variants">
            {renderVariants}
          </PreviewComponents>
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
          <PreviewComponents title="Favorite">
            <Checkbox color="red" variant='clear' name="favorite" label="Favorite" iconVariant='favorite' onToggle={handleToggleLiked} isChecked={isLiked}/>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default CheckboxPage;
