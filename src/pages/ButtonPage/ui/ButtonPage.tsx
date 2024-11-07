import { Button } from "@/shared/ui/Button";
import { PreviewComponents } from "@/widgets/PreviewComponents";
import { SectionTitle } from "@/shared/ui/SectionTitle";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useCallback, useMemo, useState } from "react";
import Icon from "@/shared/assets/icons/news.svg?react";
import PaginationIcon from "@/shared/assets/icons/pagination.svg?react";
import PasswordIcon from "@/shared/assets/icons/eye-password.svg?react";
import {
  buttonSizes,
  buttonVariants,
  minimalismButtonVariants,
} from "../model/Button";
import { capitalizeFirstLetter } from "@/shared/lib";
import { IconButton } from "@/shared/ui/IconButton";

const ButtonPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [icon, setIcon] = useState<boolean>(false);
  const [isActivePaginationIcon, setIsActivePaginationIcon] =
    useState<boolean>(false);
  const [isVisibilityPassword, setIsVisibilityPassword] =
    useState<boolean>(false);

  const handleToggleDisabled = useCallback(() => {
    setIsDisabled((prev) => !prev);
  }, []);
  const handleToggleIcon = useCallback(() => {
    setIcon((prev) => !prev);
  }, []);
  const handleToggleActivePaginationIcon = useCallback(() => {
    setIsActivePaginationIcon((prev) => !prev);
  }, []);
  const handleToggleVisibilityPassword = useCallback(() => {
    setIsVisibilityPassword((prev) => !prev);
  }, []);

  const renderVariants = useMemo(() => {
    return buttonVariants.map((btn) => {
      return (
        <Button
          key={btn}
          onClick={() => undefined}
          variant={btn}
          Icon={icon && Icon}
          isDisabled={isDisabled}
        >
          {capitalizeFirstLetter(btn) as string}
        </Button>
      );
    });
  }, [isDisabled, icon]);

  const renderMinimalismVariants = useMemo(() => {
    return minimalismButtonVariants.map((btn, index) => {
      return (
        <Button
          key={index}
          onClick={() => undefined}
          variant={btn.variant}
          minimalism={btn.minimalism}
          Icon={Icon}
          isDisabled={isDisabled}
          isHiddenLabel
        >
          {btn.variant}
        </Button>
      );
    });
  }, [isDisabled]);

  const renderSizes = useMemo(() => {
    return buttonSizes.map((btn, index) => {
      return (
        <Button
          key={index}
          onClick={() => undefined}
          variant={btn.variant}
          minimalism={btn.minimalism}
          size={btn.size}
          Icon={btn.minimalism ? Icon : icon && Icon}
          isHiddenLabel={btn.minimalism ? true : false}
          isDisabled={isDisabled}
        >
          {capitalizeFirstLetter(btn.size) as string}
        </Button>
      );
    });
  }, [icon, isDisabled]);

  return (
    <div className="page">
      <section className="section">
        <SectionTitle>Button</SectionTitle>
        <div className="filter">
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
        <div className="subsections">
          <PreviewComponents title="Button variants">
            {renderVariants}
          </PreviewComponents>
          <PreviewComponents title="Minimalism variants">
            {renderMinimalismVariants}
          </PreviewComponents>
          <PreviewComponents title="Sizes">{renderSizes}</PreviewComponents>
          <PreviewComponents title="Icon buttons variants">
            <IconButton
              isActive={isActivePaginationIcon}
              onClick={handleToggleActivePaginationIcon}
              variant="pagination"
              Icon={PaginationIcon}
              isDisabled={isDisabled}
            >
              Pagination
            </IconButton>
            <IconButton
              isActive={isVisibilityPassword}
              onClick={handleToggleVisibilityPassword}
              variant="password"
              Icon={PasswordIcon}
              isDisabled={isDisabled}
            >
              Pagination
            </IconButton>
            <IconButton
              isClickable={false}
              variant="check-mark"
              isDisabled={isDisabled}
            >
              Pagination
            </IconButton>
            <IconButton variant="cross" isDisabled={isDisabled}>
              Cross
            </IconButton>
          </PreviewComponents>
          <PreviewComponents title="Icon buttons sizes">
            <IconButton variant="cross" size="small" isDisabled={isDisabled}>
              Small
            </IconButton>
            <IconButton variant="cross" size="medium" isDisabled={isDisabled}>
              Medium
            </IconButton>
            <IconButton variant="cross" size="large" isDisabled={isDisabled}>
              Large
            </IconButton>
          </PreviewComponents>
        </div>
      </section>
    </div>
  );
};

export default ButtonPage;
