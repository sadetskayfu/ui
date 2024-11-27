import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { MenuList } from "@/shared/ui/MenuList";
import { cloneElement, ReactElement, useMemo } from "react";
import styles from "./style.module.scss";
import type { MenuItem as MenuItemType, Option } from "../Select/Select";
import { MenuItemProps } from "@/shared/ui/MenuItem";
import { MenuItemLazy } from "@/shared/ui/MenuItem";

interface OptionsProps {
  isVisible: boolean;
  menuItems?: MenuItemType[];
  options: Option[];
  selectedValue: string | string[];
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
  setActiveOptionId: (id: string) => void;
  parentRef: React.RefObject<HTMLDivElement>;
  optionsMenuId: string
  labelId: string
  selectId: string
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    menuItems,
    options,
    selectedValue,
    onClose,
    onOpen,
    onSelect,
    setActiveOptionId,
    parentRef,
    optionsMenuId,
    labelId,
    selectId
  } = props;

  const optionId = `${selectId}-option-`

  const renderOptions = useMemo(() => {
    return options.map((option, index) => {
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.filter(
            (selectedValue) => selectedValue === option.value
          ).length > 0
        : option.value === selectedValue;

      const props: Partial<MenuItemProps> = {
        onSelect,
        isSelected,
        role: 'option',
        id: `${optionId}${index}`
      };
      if (menuItems) {
        return cloneElement(menuItems[index] as ReactElement, {
          ...props,
          key: index,
        });
      } else {
        return (
          <MenuItemLazy key={index} value={option.value} {...props}>
            {option.label}
          </MenuItemLazy>
        );
      }
    });
  }, [menuItems, onSelect, options, selectedValue, optionId]);

  return (
    <DropdownMenu
      className={styles["menu"]}
      isVisible={isVisible}
      onClose={onClose}
      parentRef={parentRef}
    >
      <MenuList
        isVisible={isVisible}
        onClose={onClose}
        onOpen={onOpen}
        setActiveOptionId={setActiveOptionId}
        parentRef={parentRef}
        id={optionsMenuId}
        role='listbox'
        labelId={labelId}
        ariaMultiselectable={Array.isArray(selectedValue) ? 'true' : 'false'}
      >
        {(menuItems && menuItems?.length > 0) || options.length > 0 ? (
          renderOptions
        ) : (
          <MenuItemLazy isDisabled>No options</MenuItemLazy>
        )}
      </MenuList>
    </DropdownMenu>
  );
};
