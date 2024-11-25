import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { MenuList } from "@/shared/ui/MenuList";
import { Children, cloneElement, ReactElement, useCallback } from "react";
import { MenuItemProps } from "@/shared/ui/MenuItem";
import styles from "./style.module.scss";
import { MenuItem } from "../Select/Select";

interface OptionsProps {
  isVisible: boolean;
  menuItems: MenuItem[];
  selectedValue: string | string[]
  onClose: () => void;
  onOpen: () => void;
  onSelect: (value: string) => void;
  isCloseAfterSelect?: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    menuItems,
    selectedValue,
    onClose,
    onOpen,
    onSelect,
    isCloseAfterSelect,
    parentRef,
  } = props;

  const handleSelect = useCallback(
    (value: string | undefined) => {
      onSelect(value as string);
      if (isCloseAfterSelect) {
        setTimeout(() => {
          onClose();
        }, 0);
      }
    },
    [onSelect, onClose, isCloseAfterSelect]
  );

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
        parentRef={parentRef}
      >
        {Children.map(menuItems, (item) => {
          const props: Partial<MenuItemProps> = {
            onClick: handleSelect,
            selectedValue
          };
          return cloneElement(item as ReactElement, {
            ...props,
          });
        })}
      </MenuList>
    </DropdownMenu>
  );
};
