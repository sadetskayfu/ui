import { Group } from "@/shared/ui/Group";
import { Icon, IconColor, IconFillVariant, IconSize } from "@/shared/ui/Icon";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { iconColors, iconFillVariants, iconSizes } from "../model/Icon";
import { Radio, RadioGroup } from "@/shared/ui/Radio";

const IconsPage = () => {
  const [fillVariant, setFillVariant] = useState<IconFillVariant>("filled");
  const [size, setSize] = useState<IconSize>("small-s");
  const [color, setColor] = useState<IconColor>("primary");

  const handleToggleFillVariant = useCallback((value: string) => {
    setFillVariant(value as IconFillVariant);
  }, []);
  const handleToggleSize = useCallback((value: string) => {
    setSize(value as IconSize);
  }, []);
  const handleToggleColor = useCallback((value: string) => {
    setColor(value as IconColor);
  }, []);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Icons</SectionTitle>
        <div className="mods">
          <RadioGroup legend="Colors" name="color" onChange={handleToggleColor} selectedValue={color} direction="horizontal">
            {iconColors.map((radio) => {
              return <Radio label={radio.label} value={radio.value}/>
            })}
          </RadioGroup>
          <RadioGroup legend="Sizes" name="size" onChange={handleToggleSize} selectedValue={size} direction="horizontal">
            {iconSizes.map((radio) => {
              return <Radio label={radio.label} value={radio.value}/>
            })}
          </RadioGroup>
          <RadioGroup legend="Fill variants" name="fill-variant" onChange={handleToggleFillVariant} selectedValue={fillVariant} direction="horizontal">
            {iconFillVariants.map((radio) => {
              return <Radio label={radio.label} value={radio.value}/>
            })}
          </RadioGroup>
        </div>
        <div className="subsections">
          <PreviewComponents title="Variants">
            <Icon variant="arrow" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="check-mark" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="cart" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="envelope" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="eye" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="bell" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="book-mark" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="trash" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="user" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="thumbs-up" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="gear" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="x-mark" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="heart" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="house" size={size} fillVariant={fillVariant} color={color}/>
            <Icon variant="search" size={size} fillVariant={fillVariant} color={color}/>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default IconsPage;
