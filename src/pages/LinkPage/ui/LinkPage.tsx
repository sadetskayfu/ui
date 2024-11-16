import { CustomLink, CustomLinkColor } from "@/shared/ui/CustomLink";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { ROUTES } from "@/shared/constans/routes";
import Icon from "@/shared/assets/icons/news.svg?react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import { capitalizeFirstLetter } from "@/shared/lib";
import {
  activeHorizontalLinks,
  activeVerticalLinks,
  colorVariants,
  linkSizes,
  linkVariants,
  minimalismLinkVariants,
} from "../model/Link";
import { Group } from "@/shared/ui/Group";
import { RadioGroup } from "@/shared/ui/RadioGroup";

const LinkPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);
  const [isHiddenLabel, setIsHiddenLabel] = useState<boolean>(false);
  const [color, setColor] = useState<CustomLinkColor>("primary");

  const handleToggleColor = useCallback((value: string) => {
    setColor(value as ButtonColor);
  }, []);
  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleToggleIcon = useCallback(() => {
    setIcon((prev) => !prev);
  }, []);
  const handleToggleHiddenLabel = useCallback(() => {
    setIsHiddenLabel((prev) => !prev);
  }, []);

  const renderVariants = useMemo(() => {
    return linkVariants.map((link) => {
      return (
        <CustomLink
          key={link}
          to=""
          isDisabled={isDisabled}
          Icon={icon && Icon}
          variant={link}
          color={color}
        >
          {capitalizeFirstLetter(link) as string}
        </CustomLink>
      );
    });
  }, [icon, isDisabled, color]);

  const renderMinimalismVariants = useMemo(() => {
    return minimalismLinkVariants.map((link, index) => {
      return (
        <CustomLink
          key={index}
          to=""
          isDisabled={isDisabled}
          Icon={Icon}
          minimalism={link}
          color={color}
        >
          {link as string}
        </CustomLink>
      );
    });
  }, [isDisabled, color]);

  const renderSizes = useMemo(() => {
    return linkSizes.map((link, index) => {
      return (
        <CustomLink
          key={index}
          to=""
          size={link}
          isDisabled={isDisabled}
          Icon={icon && Icon}
          color={color}
        >
          {capitalizeFirstLetter(link) as string}
        </CustomLink>
      );
    });
  }, [isDisabled, icon, color]);

  const renderActiveHorizontalLinks = useMemo(() => {
    return activeHorizontalLinks.map((link, index) => {
      return (
        <CustomLink
          key={index}
          to={ROUTES.LINK}
          Icon={icon && Icon}
          variant={link.variant}
          direction={link.direction}
          isDisabled={isDisabled}
          isHiddenLabeL={isHiddenLabel}
          color={color}
        >
          {capitalizeFirstLetter(link.variant) as string}
        </CustomLink>
      );
    });
  }, [icon, isDisabled, isHiddenLabel, color]);

  const renderActiveVerticalLinks = useMemo(() => {
    return activeVerticalLinks.map((link, index) => {
      return (
        <CustomLink
          key={index}
          to={ROUTES.LINK}
          variant={link.variant}
          direction={link.direction}
          isDisabled={isDisabled}
          Icon={icon && Icon}
          isHiddenLabeL={isHiddenLabel}
          color={color}
        >
          {capitalizeFirstLetter(link.variant) as string}
        </CustomLink>
      );
    });
  }, [icon, isDisabled, isHiddenLabel, color]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Link</SectionTitle>
        <Group direction="vertical">
          <Group direction="horizontal">
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
          <PreviewComponents title="Variants">
            {renderVariants}
          </PreviewComponents>
          <PreviewComponents title="Minimalism Variants">
            {renderMinimalismVariants}
          </PreviewComponents>
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
          <Group direction="vertical">
            <Checkbox
              isChecked={isHiddenLabel}
              label="Hidden label"
              name="hidden label"
              onToggle={handleToggleHiddenLabel}
            />
            <Checkbox
              isChecked={icon}
              label="Icon"
              name="icon"
              onToggle={handleToggleIcon}
            />
          </Group>
          <PreviewComponents title="Active Horizontal Links">
            {renderActiveHorizontalLinks}
          </PreviewComponents>
          <PreviewComponents direction="vertical" title="Active Vertical Links">
            {renderActiveVerticalLinks}
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default LinkPage;
