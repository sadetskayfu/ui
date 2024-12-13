import { Chip, ChipVariant } from "@/shared/ui/Chip";
import { Radio } from "@/shared/ui/Radio";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { chipSizes, chipVariants } from "../model/Chip";
import { Switch } from "@/shared/ui/Switch";
import { ChipSize } from "@/shared/ui/Chip/ui/Chip";
import { FormGroup } from "@/shared/ui/FormGroup";
import { FormLabel } from "@/shared/ui/FormLabel";

const ChipPage = () => {
  const [variant, setVariant] = useState<ChipVariant>("filled");
  const [size, setSize] = useState<ChipSize>("small");
  const [isVisibleCloseButton, setIsVIsibleCloseButton] =
    useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(false)

  const handleChangeVariant = useCallback((value: string) => {
    setVariant(value as ChipVariant);
  }, []);
  const handleChangeSize = useCallback((value: string) => {
    setSize(value as ChipSize);
  }, []);
  const handleChangeVisibleCloseButton = useCallback(() => {
    setIsVIsibleCloseButton((prev) => !prev);
  }, []);
  const handleChangeClickable = useCallback(() => {
    setIsClickable((prev) => !prev);
  }, []);
  const handleChangeDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleChangeReadonly = useCallback(() => {
    setIsReadonly((prev) => !prev);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Chip</SectionTitle>
        <div className="mods">
          <FormGroup label="Variants">
            {chipVariants.map((chipVariant) => {
              return (
                <FormLabel
                  label={chipVariant.label}
                  Component={
                    <Radio
                      name="chip-variant"
                      value={chipVariant.value}
                      selectedValue={variant}
                      onChange={handleChangeVariant}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <FormGroup label="Sizes">
            {chipSizes.map((chipSize) => {
              return (
                <FormLabel
                  label={chipSize.label}
                  Component={
                    <Radio
                      name="chip-size"
                      value={chipSize.value}
                      selectedValue={size}
                      onChange={handleChangeSize}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <FormLabel label="Close button" Component={<Switch checked={isVisibleCloseButton} onChange={handleChangeVisibleCloseButton}/>}/>
          <FormLabel label="Disabled" Component={<Switch checked={isDisabled} onChange={handleChangeDisabled}/>}/>
          <FormLabel label="Readonly" Component={<Switch checked={isReadonly} onChange={handleChangeReadonly}/>}/>
          <FormLabel label="Clickable" Component={<Switch checked={isClickable} onChange={handleChangeClickable}/>}/>
        </div>
        <div className="subsections">
          <PreviewComponents title="Colors">
            <Chip
              clickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="primary"
              size={size}
              disabled={isDisabled}
              readonly={isReadonly}
              label="Primary"
            />
            <Chip
              clickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="secondary"
              size={size}
              disabled={isDisabled}
              readonly={isReadonly}
              label="Secondary"
            />
            <Chip
              clickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="success"
              size={size}
              disabled={isDisabled}
              readonly={isReadonly}
              label="Success"
            />
            <Chip
              clickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="error"
              size={size}
              disabled={isDisabled}
              readonly={isReadonly}
              label="Error"
            />
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default ChipPage;
