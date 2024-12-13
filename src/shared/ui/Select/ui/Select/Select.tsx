import { classNames } from "@/shared/lib";
import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Chip } from "@/shared/ui/Chip";
import { Icon } from "@/shared/ui/Icon";
import { Options } from "../Options/Options";
import { OptionItemProps } from "@/shared/ui/OptionItem";
import styles from "./style.module.scss";
import { DropdownPortal, DropdownPositionVariant } from "@/shared/ui/Dropdown";

export type SelectVariant = "outlined" | "filled";
export type SelectSize = "medium" | "large";
export type SelectLabelVariant = "visible" | "hidden";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  className?: string;
  id: string;
  variant?: SelectVariant;
  size?: SelectSize;
  labelVariant?: SelectLabelVariant;
  placeholder?: string;
  label: string;
  value: string | string[];
  onSelect: (values: string | string[]) => void;
  getDisabledOption?: (value: string) => boolean;
  options: Option[];
  children: ReactElement<OptionItemProps>[];
  tabIndex?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  startAdornment?: ReactElement;
  menuHeight?: string;
  menuWidth?: string;
  menuPosition?: DropdownPositionVariant;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    id,
    variant = "outlined",
    size = "medium",
    labelVariant = "visible",
    placeholder,
    label,
    value,
    options,
    children,
    onSelect,
    getDisabledOption,
    tabIndex = 0,
    required,
    readonly,
    disabled,
    errorMessage,
    onBlur,
    onFocus,
    startAdornment,
    menuHeight,
    menuWidth = "parent",
    menuPosition,
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [isFocusedField, setIsFocusedField] = useState<boolean>(false);
  const [focusedOptionId, setFocusedOptionId] = useState<string | undefined>(
    undefined
  );
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const [isMountingMenu, setIsMountingMenu] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isMovedLabel, setIsMovedLabel] = useState<boolean>(false);

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const isMulti = Array.isArray(value);

  const optionsListId = id + "options-list";
  const labelId = id + "label";
  const errorMessageId = id + "error-message";

  // Options for easy access to the label
  const localOptions = useMemo(() => {
    return options.reduce(
      (keys, option) => {
        keys[option.value] = option;
        return keys;
      },
      {} as Record<string, Option>
    );
  }, [options]);

  const handleToggleVisibleMenu = () => {
    if (readonly) return;
    if (!isMountingMenu) setIsMountingMenu(true);
    setIsVisibleMenu((prev) => !prev);
  };

  const handleOpenMenu = () => {
    if (!isMountingMenu) setIsMountingMenu(true);
    setIsVisibleMenu(true);
  };

  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (isMulti) {
        let newSelectedValues: string[] = [];
        const alreadyExistingValue = value.filter(
          (selectedValue) => selectedValue === optionValue
        );

        if (alreadyExistingValue.length > 0) {
          newSelectedValues = value.filter(
            (selectedValue) => selectedValue !== optionValue
          );
        } else {
          newSelectedValues = [...value];
          newSelectedValues.push(optionValue);
        }
        onSelect(newSelectedValues);
        return;
      }
      if (!isMulti) {
        const newSelectedValue = value === optionValue ? "" : optionValue;
        onSelect(newSelectedValue);
        setTimeout(() => {
          handleCloseMenu();
        }, 0);
      }
    },
    [onSelect, handleCloseMenu, value, isMulti]
  );

  const handleDelete = useCallback(
    (optionValue: string) => {
      if (isMulti) {
        const newSelectedValues = value.filter(
          (selectedValue) => selectedValue !== optionValue
        );
        onSelect(newSelectedValues);
      }
      fieldRef.current?.focus();
    },
    [value, onSelect, isMulti]
  );

  const handleBlur = () => {
    onBlur?.();
    handleCloseMenu();
    setIsFocusedField(false);
  };

  const handleFocus = () => {
    setIsFocusedField(true);
    onFocus?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (readonly) return;

    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "Enter":
      case " ":
        if (!isVisibleMenu) {
          event.preventDefault();
          handleOpenMenu();
        }
        break;
      case "Escape":
        if (isVisibleMenu) {
          event.preventDefault();
          handleCloseMenu();
        }
        break;
      case "Backspace":
        if (isMulti && value.length > 0) {
          event.preventDefault();
          const newValues = value.slice(0, -1);
          onSelect(newValues);
        }
        break;
      default:
        break;
    }
  };

  const renderSelectedOptions = useMemo(() => {
    if (isMulti && value.length > 0) {
      return value.map((optionValue) => {
        return (
          <Chip
            color="secondary"
            variant={variant === "filled" ? "outlined" : "filled"}
            size="small"
            onClose={() => handleDelete(optionValue)}
            key={optionValue}
            label={localOptions[optionValue].label}
            closeButtonTabIndex={-1}
            readonly={readonly}
          />
        );
      });
    }
  }, [value, isMulti, handleDelete, variant, readonly, localOptions]);

  // Update isDirty
  useEffect(() => {
    value.length > 0 ? setIsDirty(true) : setIsDirty(false);
  }, [value]);

  // Update isMovedLabel
  useEffect(() => {
    if (isDirty || !!startAdornment) {
      setIsMovedLabel(true);
    } else {
      setIsMovedLabel(false);
    }
  }, [isDirty, startAdornment]);

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[size],
    styles[labelVariant],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["required"]]: required,
    [styles["disabled"]]: disabled,
    [styles["dirty"]]: isDirty,
    [styles["moved-label"]]: isMovedLabel,
    [styles["visible-menu"]]: isVisibleMenu,
    [styles["errored"]]: !!errorMessage,
    [styles["focused"]]: isFocusedField,
  };

  const localTabIndex = disabled ? -1 : tabIndex;

  return (
    <div
      ref={selectRef}
      className={classNames(styles["select"], additionalClasses, mods)}
    >
      <div className={styles["field-wrapper"]}>
        <label id={labelId} className={styles["label"]}>
          {label}
        </label>
        <div
          className={styles["field"]}
          tabIndex={localTabIndex}
          ref={fieldRef}
          onClick={handleToggleVisibleMenu}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isVisibleMenu}
          aria-errormessage={errorMessage ? errorMessageId : undefined}
          aria-labelledby={labelId}
          aria-controls={isVisibleMenu ? optionsListId : undefined}
          aria-activedescendant={isVisibleMenu ? focusedOptionId : undefined}
          aria-readonly={readonly ? "true" : undefined}
          aria-required={required ? "true" : undefined}
        >
          {startAdornment && (
            <div className={styles["start-adornment"]}>{startAdornment}</div>
          )}
          <div className={styles["content"]}>
            {placeholder && (
              <span className={styles["placeholder"]}>{placeholder}</span>
            )}
            {isMulti ? (
              <div aria-hidden="true" className={styles["chips"]}>
                {renderSelectedOptions}
              </div>
            ) : (
              value && (
                <span aria-hidden="true">{localOptions[value].label}</span>
              )
            )}
          </div>
          <Icon
            className={styles["open-menu-icon"]}
            variant="arrow"
            size="small-l"
            color="dark"
          />
        </div>
      </div>
      {errorMessage && (
        <p className={styles["error-message"]} id={errorMessageId}>
          {errorMessage}
        </p>
      )}
      {!disabled && !readonly && isMountingMenu && (
        <DropdownPortal
          className={styles["menu"]}
          isVisible={isVisibleMenu}
          onClose={handleCloseMenu}
          parentRef={selectRef}
          stopAnimation
          width={menuWidth}
          positionVariant={menuPosition}
        >
          <Options
            fieldRef={fieldRef}
            isFocusedField={isFocusedField}
            isVisible={isVisibleMenu}
            onSelect={handleSelect}
            options={children}
            parentId={id}
            optionsListId={optionsListId}
            labelId={labelId}
            focusedOptionIndex={focusedOptionIndex}
            setFocusedOptionId={setFocusedOptionId}
            setFocusedOptionIndex={setFocusedOptionIndex}
            selectedValue={value}
            getDisabledOption={getDisabledOption}
            height={menuHeight}
          />
        </DropdownPortal>
      )}
    </div>
  );
});
