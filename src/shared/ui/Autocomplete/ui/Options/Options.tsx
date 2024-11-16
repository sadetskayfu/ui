import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { MenuList } from "@/shared/ui/MenuList";
import { useCallback, useMemo } from "react";
import { countriesIcons } from "@/shared/constans/countriesIcons";
import { Option } from "../Autocomplete/Autocomplete";
import { AutocompleteVariant } from "../Autocomplete/Autocomplete";
import { MenuItem } from "@/shared/ui/MenuItem";
import styles from "./style.module.scss";

interface OptionsProps {
  isVisible: boolean;
  options: Option[];
  selectedValue: string;
  onClose: () => void;
  onOpen: () => void;
  onSelect: (id: string, value: string) => void;
  parentRef: React.RefObject<HTMLInputElement>;
  variant: AutocompleteVariant;
}

export const Options = (props: OptionsProps) => {
  const {
    isVisible,
    options,
    selectedValue,
    onClose,
    onOpen,
    onSelect,
    parentRef,
    variant,
  } = props;

  const handleSelect = useCallback(
    (id: string, label: string) => {
      onSelect(id, label);
      setTimeout(() => {
        onClose();
      }, 0);
    },
    [onSelect, onClose]
  );

  const renderOptions = useMemo(() => {
    return options.map((item) => {
      const isSelected = item.id === selectedValue;
      return (
        <MenuItem
          onClick={() => handleSelect(item.id, item.label)}
          key={item.id}
          isSelected={isSelected}
        >
          <div className={styles["content"]}>
            {variant === "countries" && (
              <img
                src={countriesIcons[item.id]}
                className={styles["icon"]}
                alt="country flag"
              ></img>
            )}
            <div className={styles["title"]}>
              <span>{item.label}</span>
              {item.phone && <span>+{item.phone}</span>}
            </div>
          </div>
        </MenuItem>
      );
    });
  }, [options, selectedValue, handleSelect, variant]);

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
        {options.length > 0 ? (
          renderOptions
        ) : (
          <MenuItem isReadonly>
            <span>No options</span>
          </MenuItem>
        )}
      </MenuList>
    </DropdownMenu>
  );
};
