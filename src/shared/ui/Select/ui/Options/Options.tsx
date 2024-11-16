import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { MenuList } from "@/shared/ui/MenuList";
import { useCallback, useMemo } from "react";
import { MenuItem } from "@/shared/ui/MenuItem";
import styles from "./style.module.scss";
import { Option } from "../Select/Select";

interface OptionsProps {
  isVisible: boolean;
  options: Option[];
  selectedValue: string | string[] | null;
  onClose: () => void;
  onOpen: () => void;
  onSelect: (id: string) => void;
  isCloseAfterSelect?: boolean
  parentRef: React.RefObject<HTMLDivElement>;
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    options,
    selectedValue,
    onClose,
    onOpen,
    onSelect,
    isCloseAfterSelect,
    parentRef,
  } = props;

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      if(isCloseAfterSelect) {
        setTimeout(() => {
          onClose();
        }, 0);
      }
    },
    [onSelect, onClose, isCloseAfterSelect]
  );

  const renderOptions = useMemo(() => {
    return options.map((item) => {
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.filter((value) => value === item.id).length > 0
        : item.id === selectedValue;
      return (
        <MenuItem
          onClick={() => handleSelect(item.id)}
          key={item.id}
          isSelected={isSelected}
        >
          <div className={styles["content"]}>
            <div className={styles["title"]}>
              <span>{item.label}</span>
            </div>
          </div>
        </MenuItem>
      );
    });
  }, [options, selectedValue, handleSelect]);

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
        {renderOptions}
      </MenuList>
    </DropdownMenu>
  );
};
