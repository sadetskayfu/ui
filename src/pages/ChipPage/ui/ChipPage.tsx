import { Chip, ChipVariant } from "@/shared/ui/Chip";
import { Group } from "@/shared/ui/Group";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { chipSizes, chipVariants } from "../model/Chip";
import { Switch } from "@/shared/ui/Switch";
import { ChipSize } from "@/shared/ui/Chip/ui/Chip";

const ChipPage = () => {
  const [variant, setVariant] = useState<ChipVariant>("filled");
  const [size, setSize] = useState<ChipSize>("small");
  const [isVisibleCloseButton, setIsVIsibleCloseButton] =
    useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleToggleVariant = useCallback((value: string) => {
    setVariant(value as ChipVariant);
  }, []);
  const handleToggleSize = useCallback((value: string) => {
    setSize(value as ChipSize);
  }, []);
  const handleToggleVisibleCloseButton = useCallback(() => {
    setIsVIsibleCloseButton((prev) => !prev);
  }, []);
  const handleToggleClickable = useCallback(() => {
    setIsClickable((prev) => !prev);
  }, []);
  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Chip</SectionTitle>
        <Group direction="vertical">
          <RadioGroup
            items={chipVariants}
            name="chip-variant"
            selectedValue={variant}
            title="Variants"
            direction="horizontal"
            onChange={handleToggleVariant}
            size="small"
          />
          <RadioGroup
            items={chipSizes}
            name="chip-size"
            selectedValue={size}
            title="Sizes"
            direction="horizontal"
            onChange={handleToggleSize}
            size="small"
          />
          <Switch
            label="Close button"
            name="visible-close-button"
            size="small"
            isChecked={isVisibleCloseButton}
            onToggle={handleToggleVisibleCloseButton}
          />
          <Switch
            label="Clickable"
            name="clickable-chip"
            size="small"
            isChecked={isClickable}
            onToggle={handleToggleClickable}
          />
          <Switch
            label="Disabled"
            name="disabled-chip"
            size="small"
            isChecked={isDisabled}
            onToggle={handleToggleDisabled}
          />
        </Group>
        <div className="subsections">
          <PreviewComponents title="Colors">
            <Chip
              isClickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="primary"
              size={size}
              isDisabled={isDisabled}
            >
              Primary
            </Chip>
            <Chip
              isClickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="secondary"
              size={size}
              isDisabled={isDisabled}
            >
              Secondary
            </Chip>
            <Chip
              isClickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="success"
              size={size}
              isDisabled={isDisabled}
            >
              Success
            </Chip>
            <Chip
              isClickable={isClickable}
              onClose={isVisibleCloseButton ? () => undefined : undefined}
              variant={variant}
              color="error"
              size={size}
              isDisabled={isDisabled}
            >
              Error
            </Chip>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default ChipPage;
