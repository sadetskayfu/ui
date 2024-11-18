import { Group } from "@/shared/ui/Group";
import { Icon, IconColor, IconFillVariant, IconSize } from "@/shared/ui/Icon";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { useCallback, useState } from "react";
import { iconColors, iconFillVariants, iconSizes } from "../model/Icon";
import { RadioGroup } from "@/shared/ui/RadioGroup";

const IconsPage = () => {
  const [fillVariant, setFillVariant] = useState<IconFillVariant>("filled");
  const [size, setSize] = useState<IconSize>("small");
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
        <Group direction="vertical">
          <RadioGroup
            items={iconFillVariants}
            name="icon-fill-variant"
            selectedValue={fillVariant}
            title="Fill variants"
            direction="horizontal"
            onChange={handleToggleFillVariant}
            size="small"
          />
          <RadioGroup
            items={iconSizes}
            name="icon-size"
            selectedValue={size}
            title="Sizes"
            direction="horizontal"
            onChange={handleToggleSize}
            size="small"
          />
          <RadioGroup
            items={iconColors}
            name="icon-color"
            selectedValue={color}
            title="Colors"
            direction="horizontal"
            onChange={handleToggleColor}
            size="small"
          />
        </Group>
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
