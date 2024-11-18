import { Button, ButtonColor } from "@/shared/ui/Button";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import {
  buttonSizes,
  buttonVariants,
  colorVariants,
  minimalismButtonVariants,
} from "../model/Button";
import { capitalizeFirstLetter } from "@/shared/lib";
import { Group } from "@/shared/ui/Group";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { Icon } from "@/shared/ui/Icon";

const ButtonPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);
  const [color, setColor] = useState<ButtonColor>("primary");

  const handleToggleColor = useCallback((value: string) => {
    setColor(value as ButtonColor);
  }, []);
  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleToggleIcon = useCallback(() => {
    setIcon((prev) => !prev);
  }, []);

  const renderVariants = useMemo(() => {
    return buttonVariants.map((btn) => {
      return (
        <Button
          key={btn}
          onClick={() => undefined}
          variant={btn}
          Icon={icon && <Icon variant="heart" size="custom-size" color='custom-color'/>}
          isDisabled={isDisabled}
          color={color}
        >
          {capitalizeFirstLetter(btn) as string}
        </Button>
      );
    });
  }, [isDisabled, icon, color]);

  const renderMinimalismVariants = useMemo(() => {
    return minimalismButtonVariants.map((btn, index) => {
      return (
        <Button
          key={index}
          onClick={() => undefined}
          Icon={<Icon variant="heart" size="custom-size" color='custom-color'/>}
          isDisabled={isDisabled}
          isHiddenLabel
          minimalism={btn}
          color={color}
        >
          {btn}
        </Button>
      );
    });
  }, [isDisabled, color]);

  const renderSizes = useMemo(() => {
    return buttonSizes.map((btn, index) => {
      return (
        <Button
          key={index}
          onClick={() => undefined}
          size={btn}
          isDisabled={isDisabled}
          color={color}
          Icon={icon && <Icon variant="heart" size="custom-size" color='custom-color'/>}
        >
          {capitalizeFirstLetter(btn) as string}
        </Button>
      );
    });
  }, [isDisabled, color, icon]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Button</SectionTitle>
        <Group direction="vertical">
          <Group direction="horizontal">
            <Checkbox
              isChecked={isDisabled}
              label="Disabled"
              name="disabled"
              onToggle={handleToggleDisabled}
              size="small"
            />
            <Checkbox
              isChecked={icon}
              label="Icon"
              name="icon"
              size="small"
              onToggle={handleToggleIcon}
            />
          </Group>
          <RadioGroup
            direction="horizontal"
            items={colorVariants}
            selectedValue={color}
            name="button-color"
            title="Colors"
            size="small"
            onChange={handleToggleColor}
          />
        </Group>
        <div className="subsections">
          <PreviewComponents title="Button variants">
            {renderVariants}
          </PreviewComponents>
          <PreviewComponents title="Minimalism variants">
            {renderMinimalismVariants}
          </PreviewComponents>
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;
