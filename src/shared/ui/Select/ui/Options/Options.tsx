import { Dropdown } from "@/shared/ui/Dropdown";
import { MenuList } from "@/shared/ui/MenuList";
import { Children, cloneElement, ReactElement, useMemo } from "react";
import styles from "./style.module.scss";
import type { Option } from "../Select/Select";
import { MenuItemProps } from "@/shared/ui/MenuItem";
import { MenuItem } from "@/shared/ui/MenuItem";

interface OptionsProps {
  isVisible: boolean;
  options: Option[];
  menuItems?: ReactElement[];
  selectedValue: string | string[];
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
  setActiveOptionId: (id: string) => void;
  getDisabledOption?: (value: string) => boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  optionsMenuId: string;
  labelId: string;
  selectId: string;
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    options,
    menuItems,
    selectedValue,
    onClose,
    onOpen,
    onSelect,
    setActiveOptionId,
    getDisabledOption,
    parentRef,
    optionsMenuId,
    labelId,
    selectId,
  } = props;

  const optionId = `${selectId}-option-`;

  const renderOptions = useMemo(() => {
    const getSelectedValue = (value: string): boolean => {
      return Array.isArray(selectedValue)
        ? selectedValue.filter((selectedValue) => selectedValue === value)
            .length > 0
        : value === selectedValue;
    };

    if (menuItems) {
      return Children.map(menuItems, (menuItem, index) => {
        const childProps = (menuItem as ReactElement).props;
        const value = childProps.value;

        if(!value) return cloneElement(menuItem)

        const isSelected = getSelectedValue(value);
        const isDisabled = getDisabledOption?.(value);
        
        const props: Partial<MenuItemProps> = {
          onSelect,
          isSelected,
          isDisabled,
          role: "option",
          id: `${optionId}${index}`,
        };

        return cloneElement(menuItem as ReactElement, { ...props });
      });
    } else {
      return options.map((option, index) => {
        const isSelected = getSelectedValue(option.value);
        const isDisabled = getDisabledOption?.(option.value);

        const props: Partial<MenuItemProps> = {
          onSelect,
          isSelected,
          isDisabled,
          role: "option",
          id: `${optionId}${index}`,
        };
        return (
          <MenuItem key={index} value={option.value} {...props}>
            {option.label}
          </MenuItem>
        );
      });
    }
  }, [
    onSelect,
    options,
    menuItems,
    selectedValue,
    optionId,
    getDisabledOption,
  ]);

  return (
    <Dropdown
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
        role="listbox"
        labelId={labelId}
        ariaMultiselectable={Array.isArray(selectedValue) ? "true" : "false"}
      >
        {options.length > 0 || (menuItems && menuItems?.length > 0) ? (
          renderOptions
        ) : (
          <MenuItem isDisabled>No options</MenuItem>
        )}
      </MenuList>
    </Dropdown>
  );
};
