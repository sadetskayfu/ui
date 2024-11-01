import { SectionTitle } from "../../../shared/ui/SectionTitle/ui/SectionTitle";
import {
  DropdownClosingVariant,
  DropdownMenu,
  DropdownPositionVariant,
} from "@/shared/ui/DropdownMenu";
import { ItemList } from "@/shared/ui/ItemList";
import {
  closingMenuVariants,
  options,
  positionMenuVariants,
} from "../model/Dropdown";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import styles from "./style.module.scss";

const DropdownPage = () => {
  // Radio group filter
  const [positionVariant, setPositionVariant] =
    useState<DropdownPositionVariant>("row");
  const [closingVariant, setClosingVariant] =
    useState<DropdownClosingVariant>("mousedown");

  const handleSelectPositionVariant = (value: string) => {
    setPositionVariant(value as DropdownPositionVariant);
  };
  const handleSelectClosingVariant = (value: string) => {
    setClosingVariant(value as DropdownClosingVariant);
  };

  // Dropdown menu actions
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleVisibleMenu = useCallback(() => {
    setIsVisibleMenu((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setIsVisibleMenu(true);
    buttonRef.current?.focus();
  }, []);

  const handleSelect = useCallback(() => {
    handleCloseMenu();
  }, [handleCloseMenu]);

  const renderOptions = useMemo(() => {
    return options.map((option) => {
      return (
        <button
          onClick={handleSelect}
          className={styles["dropdown-menu__item"]}
          tabIndex={-1}
          key={option.value}
        >
          {option.label}
        </button>
      );
    });
  }, [handleSelect]);

  return (
    <div className={styles["page"]}>
      <SectionTitle>Dropdown menu</SectionTitle>
      <div className={styles["mods"]}>
        <RadioGroup
          title="Position variant"
          name="position-variant"
          direction="horizontal"
          items={positionMenuVariants}
          onChange={handleSelectPositionVariant}
          selectedItem={positionVariant}
        />
        <RadioGroup
          title="Closing variant"
          name="closing-variant"
          direction="horizontal"
          items={closingMenuVariants}
          onChange={handleSelectClosingVariant}
          selectedItem={closingVariant}
        />
      </div>
      <div className={styles["subsection"]}>
        <div className={styles["button"]}>
          <Button
            ref={buttonRef}
            onClick={handleToggleVisibleMenu}
            onMouseEnter={closingVariant === "mousemove" && handleOpenMenu}
            isKeyBlocked={!isVisibleMenu}
          >
            Open menu
          </Button>
          <DropdownMenu
            className={styles["dropdown-menu"]}
            parentRef={buttonRef}
            isVisible={isVisibleMenu}
            onClose={handleCloseMenu}
            positionVariant={positionVariant}
            closingVariant={closingVariant}
          >
            <ItemList
              parentRef={buttonRef}
              isVisible={isVisibleMenu}
              startIndex={0}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
            >
              {renderOptions}
            </ItemList>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DropdownPage;
