import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import { checkboxSizes, checkboxVariants } from "../model/Checkbox";
import { capitalizeFirstLetter } from "@/shared/lib";
import { FormLabel } from "@/shared/ui/FormLabel";
import { Icon } from "@/shared/ui/Icon";

const CheckboxPage = () => {
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleChangeLiked = useCallback((checked: boolean) => {
    setIsLiked(checked);
  }, []);
  const handleChangeRequired = useCallback((checked: boolean) => {
    setIsRequired(checked);
  }, []);
  const handleChangeDisabled = useCallback((checked: boolean) => {
    setIsDisabled(checked);
  }, []);

  const renderSizes = useMemo(() => {
    return checkboxSizes.map((item) => {
      return (
        <FormLabel
          label={capitalizeFirstLetter(item) as string}
          labelPosition="right"
          disabled={isDisabled}
          required={isRequired}
          size={item}
          Component={
            <Checkbox
              checked={false}
              onChange={() => undefined}
            />
          }
        />
      );
    });
  }, [isDisabled, isRequired]);

  const renderVariants = useMemo(() => {
    return checkboxVariants.map((item) => {
      return (
        <FormLabel
          label={capitalizeFirstLetter(item) as string}
          labelPosition="bottom"
          disabled={isDisabled}
          required={isRequired}
          Component={
            <Checkbox
              checked={false}
              onChange={() => undefined}
              variant={item}
            />
          }
        />
      );
    });
  }, [isDisabled, isRequired]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Checkbox</SectionTitle>
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
          <PreviewComponents title="Variants">
            {renderVariants}
          </PreviewComponents>
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
          <PreviewComponents title="Custom icon">
            <Checkbox
              color="red"
              variant="clear"
              onChange={handleChangeLiked}
              checked={isLiked}
              disabled={isDisabled}
              inputProps={{"aria-label": 'favorite'}}
              Icon={<Icon variant="heart" color="secondary" fillVariant="outlined"/>}
              CheckedIcon={<Icon variant="heart" color="red"/>}
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default CheckboxPage;
