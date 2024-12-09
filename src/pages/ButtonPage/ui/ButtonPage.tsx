import { Button, ButtonColor, ButtonVariant } from "@/shared/ui/Button";
import { IconButton, IconButtonBorderRadius } from "@/shared/ui/IconButton";
import { Radio } from "@/shared/ui/Radio";
import { useCallback, useState } from "react";
import {
  buttonColors,
  buttonSizes,
  buttonVariants,
  iconButtonBorderRadius,
  iconButtonSizes,
} from "../model/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Icon } from "@/shared/ui/Icon";
import { capitalizeFirstLetter } from "@/shared/lib";
import { FormGroup } from "@/shared/ui/FormGroup";
import { FormLabel } from "@/shared/ui/FormLabel";

const ButtonPage = () => {
  const [color, setColor] = useState<ButtonColor>("primary");
  const [borderRadius, setBorderRadius] = useState<IconButtonBorderRadius>("round");
  const [variant, setVariant] = useState<ButtonVariant>("filled");

  const handleToggleColor = useCallback((value: string) => {
    setColor(value as ButtonColor);
  }, []);
  const handleToggleBorderRadius = useCallback((value: string) => {
    setBorderRadius(value as IconButtonBorderRadius);
  }, []);
  const handleToggleVariant = useCallback((value: string) => {
    setVariant(value as ButtonVariant);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Button</SectionTitle>
        <div className="mods">
          <FormGroup label="Colors">
            {buttonColors.map((radio) => {
              return (
                <FormLabel
                  label={radio.label}
                  Component={
                    <Radio
                      name="button-colors"
                      onChange={handleToggleColor}
                      value={radio.value}
                      selectedValue={color}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <FormGroup label="Variants">
            {buttonVariants.map((radio) => {
              return (
                <FormLabel
                  label={radio.label}
                  Component={
                    <Radio
                      name="button-variants"
                      onChange={handleToggleVariant}
                      value={radio.value}
                      selectedValue={variant}
                    />
                  }
                />
              );
            })}
          </FormGroup>
          <FormGroup label="Border radius">
            {iconButtonBorderRadius.map((radio) => {
              return (
                <FormLabel
                  label={capitalizeFirstLetter(radio) as string}
                  Component={
                    <Radio
                      name="button-border-radius"
                      onChange={handleToggleBorderRadius}
                      value={radio}
                      selectedValue={borderRadius}
                    />
                  }
                />
              );
            })}
          </FormGroup>
        </div>
        <div className="subsections">
          <PreviewComponents title="Icon buttons sizes">
            {iconButtonSizes.map((btn) => {
              return (
                <IconButton size={btn} variant={variant} color={color} borderRadius={borderRadius}>
                  <Icon variant="house" />
                </IconButton>
              );
            })}
          </PreviewComponents>
          <PreviewComponents title="Buttons sizes">
            {buttonSizes.map((btn) => {
              return (
                <Button size={btn} variant={variant} color={color}>
                  {capitalizeFirstLetter(btn) as string}
                </Button>
              );
            })}
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;
