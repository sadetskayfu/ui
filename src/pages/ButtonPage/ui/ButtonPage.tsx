import { Button, ButtonColor, ButtonVariant } from "@/shared/ui/Button";
import { IconButton, IconButtonForm } from "@/shared/ui/IconButton";
import { Radio, RadioGroup } from "@/shared/ui/RadioGroup";
import { useCallback, useState } from "react";
import {
  buttonColors,
  buttonSizes,
  buttonVariants,
  iconButtonForms,
  iconButtonSizes,
} from "../model/Button";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { Icon } from "@/shared/ui/Icon";
import { capitalizeFirstLetter } from "@/shared/lib";

const ButtonPage = () => {
  const [color, setColor] = useState<ButtonColor>("primary");
  const [form, setForm] = useState<IconButtonForm>("round");
  const [variant, setVariant] = useState<ButtonVariant>("filled");

  const handleToggleColor = useCallback((value: string) => {
    setColor(value as ButtonColor);
  }, []);
  const handleToggleForm = useCallback((value: string) => {
    setForm(value as IconButtonForm);
  }, []);
  const handleToggleVariant = useCallback((value: string) => {
    setVariant(value as ButtonVariant);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Button</SectionTitle>
        <div className="mods">
          <RadioGroup
            direction="horizontal"
            legend="Colors"
            onChange={handleToggleColor}
            name="color"
            selectedValue={color}
          >
            {buttonColors.map((radio) => {
              return <Radio label={radio.label} value={radio.value} />;
            })}
          </RadioGroup>
          <RadioGroup
            direction="horizontal"
            legend="Variants"
            onChange={handleToggleVariant}
            name="variant"
            selectedValue={variant}
          >
            {buttonVariants.map((radio) => {
              return <Radio label={radio.label} value={radio.value} />;
            })}
          </RadioGroup>
          <RadioGroup
            direction="horizontal"
            legend="Icon buttons forms"
            onChange={handleToggleForm}
            name="form"
            selectedValue={form}
          >
            {iconButtonForms.map((radio) => {
              return <Radio label={radio.label} value={radio.value} />;
            })}
          </RadioGroup>
        </div>
        <div className="subsections">
          <PreviewComponents title="Icon buttons sizes">
            {iconButtonSizes.map((btn) => {
              return (
                <IconButton size={btn} variant={variant} color={color} form={form}>
                  <Icon variant="house" size="custom-size" color="custom-color"/>
                </IconButton>
              );
            })}
          </PreviewComponents>
          <PreviewComponents title="Buttons sizes">
            {buttonSizes.map((btn) => {
              return (
                <Button size={btn} variant={variant} color={color} form={form}>
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
