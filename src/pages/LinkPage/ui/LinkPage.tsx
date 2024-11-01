import { CustomLink } from "@/shared/ui/CustomLink";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { ROUTES } from "@/shared/constans/routes";
import Icon from "@/shared/assets/icons/news.svg?react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import { capitalizeFirstLetter, classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import {
  activeHorizontalLinks,
  activeVerticalLinks,
  linkSizes,
  linkVariants,
  minimalismLinkVariants,
} from "../model/Link";

const LinkPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);
  const [isHiddenLabel, setIsHiddenLabel] = useState<boolean>(false);

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
        >
          {capitalizeFirstLetter(link) as string}
        </CustomLink>
      );
    });
  }, [icon, isDisabled]);

  const renderMinimalismVariants = useMemo(() => {
    return minimalismLinkVariants.map((link, index) => {
      return (
        <CustomLink
          key={index}
          to=""
          isDisabled={isDisabled}
          Icon={Icon}
          variant={link.variant}
          minimalism={link.minimalism}
        >
          {link.variant as string}
        </CustomLink>
      );
    });
  }, [isDisabled]);

  const renderSizes = useMemo(() => {
    return linkSizes.map((link, index) => {
      return (
        <CustomLink
          key={index}
          to=""
          variant="transparent"
          size={link.size}
          isDisabled={isDisabled}
          minimalism={link.minimalism}
          Icon={link.minimalism !== "none" ? Icon : icon && Icon}
        >
          {capitalizeFirstLetter(link.size) as string}
        </CustomLink>
      );
    });
  }, [isDisabled, icon]);

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
        >
          {capitalizeFirstLetter(link.variant) as string}
        </CustomLink>
      );
    });
  }, [icon, isDisabled, isHiddenLabel]);

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
        >
          {capitalizeFirstLetter(link.variant) as string}
        </CustomLink>
      );
    });
  }, [icon, isDisabled, isHiddenLabel]);

  return (
    <div className={classNames(styles["page"])}>
      <SectionTitle>Link</SectionTitle>
      <div className={styles["mods"]}>
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
      </div>
      <div className={styles["subsections"]}>
        <PreviewComponents title="Variants">
          {renderVariants}
        </PreviewComponents>
        <PreviewComponents title="Minimalism Variants">
          {renderMinimalismVariants}
        </PreviewComponents>
        <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
        <div className={styles["mods"]}>
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
        </div>
        <PreviewComponents title="Active Horizontal Links">
          {renderActiveHorizontalLinks}
        </PreviewComponents>
        <PreviewComponents direction="vertical" title="Active Vertical Links">
          {renderActiveVerticalLinks}
        </PreviewComponents>
      </div>
    </div>
  );
};

export default LinkPage;
