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
import {
  FieldVariant,
  FieldLabelVariant,
  FieldSize,
  Field,
} from "@/shared/ui/Field";
import styles from "./style.module.scss";
import { InputAdornment } from "@/shared/ui/InputAdornment";
import { Options } from "../Options/Options";
import { Chip } from "@/shared/ui/Chip";
import { Icon } from "@/shared/ui/Icon";
import { IconButton } from "@/shared/ui/IconButton";
import { OptionItemProps } from "@/shared/ui/OptionItem";
import {
  Dropdown,
  DropdownPositionVariant,
} from "@/shared/ui/Dropdown";

export interface Option {
  value: string;
  label: string;
}

interface AutocompleteProps {
  id: string;
  className?: string;
  isStrict?: boolean;
  value: string;
  selectedValue: string | string[];
  options: Option[];
  onChange: (value: string) => void;
  onSelect: (optionValue: string | string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  getDisabledOption?: (value: string) => boolean;
  children: ReactElement<OptionItemProps>[];
  variant?: FieldVariant;
  labelVariant?: FieldLabelVariant;
  size?: FieldSize;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  tabIndex?: number;
  startAdornment?: ReactElement;
  label: string;
  menuHeight?: string;
  menuWidth?: string;
  menuPosition?: DropdownPositionVariant;
}

export const Autocomplete = memo((props: AutocompleteProps) => {
  const {
    id,
    className,
    value,
    selectedValue,
    options,
    onChange,
    onSelect,
    onBlur,
    onFocus,
    isStrict = true,
    readonly,
    disabled,
    required,
    children,
    getDisabledOption,
    variant,
    labelVariant,
    size,
    name,
    placeholder,
    errorMessage,
    tabIndex,
    startAdornment,
    label,
    menuHeight,
    menuWidth = "parent",
    menuPosition,
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [isStopFilter, setStopFilter] = useState<boolean>(true);
  const [isFocusedField, setIsFocusedField] = useState<boolean>(false);

  const [focusedOptionId, setFocusedOptionId] = useState<string | undefined>(
    undefined
  );
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const [isMountingMenu, setIsMountingMenu] = useState<boolean>(false);

  const fieldRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const optionsListId = id + "option-list";
  const labelId = id + "label";

  const isMulti = Array.isArray(selectedValue);

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

  const handleToggleVisibleMenu = useCallback(() => {
    if (readonly) return;
    if (!isMountingMenu) setIsMountingMenu(true);

    fieldRef.current?.focus();
    setIsVisibleMenu((prev) => !prev);
  }, [readonly, isMountingMenu]);

  const handleOpenMenu = useCallback(() => {
    if (!isMountingMenu) setIsMountingMenu(true);
    setIsVisibleMenu(true);
  }, [isMountingMenu]);

  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      onChange(value);
      if (value.length > 0) {
        handleOpenMenu();
      }
      setFocusedOptionIndex(-1);
      setStopFilter(false);
    },
    [onChange, handleOpenMenu]
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (isMulti) {
        let newSelectedValues: string[] = [];
        const alreadyExistingValue = selectedValue.filter(
          (value) => value === optionValue
        );

        if (alreadyExistingValue.length > 0) {
          newSelectedValues = selectedValue.filter(
            (value) => value !== optionValue
          );
        } else {
          newSelectedValues = [...selectedValue];
          newSelectedValues.push(optionValue);
        }
        onSelect(newSelectedValues);
        onChange("");
        return;
      }
      if (!isMulti) {
        const newSelectedValue =
          selectedValue === optionValue ? "" : optionValue;
        onSelect(newSelectedValue);
        onChange(
          newSelectedValue.length > 0
            ? localOptions[newSelectedValue].label
            : ""
        );
        setTimeout(() => {
          handleCloseMenu();
        }, 0);
      }
    },
    [selectedValue, onSelect, onChange, handleCloseMenu, localOptions, isMulti]
  );

  const handleDelete = useCallback(
    (optionValue: string) => {
      if (isMulti) {
        const newSelectedValues = selectedValue.filter(
          (selectedValue) => selectedValue !== optionValue
        );
        onSelect(newSelectedValues);
        onChange("");
      }
      fieldRef.current?.focus();
    },
    [selectedValue, onSelect, onChange, isMulti]
  );

  const handleBlur = useCallback(() => {
    if (isStrict) {
      isMulti
        ? onChange("")
        : selectedValue
          ? onChange(localOptions[selectedValue].label)
          : onChange("");
    }
    onBlur?.();
    setIsFocusedField(false);
    handleCloseMenu();
  }, [
    handleCloseMenu,
    onBlur,
    isStrict,
    onChange,
    localOptions,
    selectedValue,
    isMulti,
  ]);

  const handleFocus = useCallback(() => {
    setIsFocusedField(true);
    onFocus?.();
  }, [onFocus]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (readonly) return;

    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "Enter":
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
        if (isMulti && value === "" && selectedValue.length > 0) {
          event.preventDefault();
          const newValues = selectedValue.slice(0, -1);
          onSelect(newValues);
        }
        break
      default:
        break
    }
  };

  // Clear the selected value if input value = ''
  useEffect(() => {
    if (!isMulti && value === "" && selectedValue.length > 0) {
      onSelect("");
    }
  }, [onSelect, value, selectedValue, isMulti]);

  // Clear the filter if value === selected value
  useEffect(() => {
    if (
      !isMulti &&
      value === localOptions[selectedValue]?.label &&
      !isVisibleMenu
    ) {
      setStopFilter(true);
    }
  }, [value, selectedValue, localOptions, isVisibleMenu, isMulti]);

  // Render chips for multi autocomplete
  const renderSelectedOptions = useMemo(() => {
    if (isMulti && selectedValue.length > 0) {
      return selectedValue.map((value) => {
        return (
          <Chip
            color="secondary"
            variant={variant === "filled" ? "outlined" : "filled"}
            size="small"
            stopFocus
            onClose={() => handleDelete(value)}
            key={value}
            label={localOptions[value].label}
            closeButtonTabIndex={-1}
            readonly={readonly}
          />
        );
      });
    }
  }, [variant, handleDelete, readonly, localOptions, selectedValue, isMulti]);

  const mods: Record<string, boolean | undefined> = {
    [styles["visible-menu"]]: isVisibleMenu,
  };

  return (
    <div
      ref={autocompleteRef}
      className={classNames(styles["autocomplete"], [className], mods)}
    >
      <Field
        id={id}
        ref={fieldRef}
        labelId={labelId}
        label={label}
        placeholder={placeholder}
        errorMessage={errorMessage}
        name={name}
        value={value}
        variant={variant}
        size={size}
        labelVariant={labelVariant}
        tabIndex={tabIndex}
        debounceTime={100}
        disabled={disabled}
        readonly={readonly}
        required={required}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClick={handleToggleVisibleMenu}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        isMultiAutocomplete={isMulti}
        chips={renderSelectedOptions && <div className={styles['chips']} aria-hidden='true'>{renderSelectedOptions}</div>}
        autoComplete="off"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isVisibleMenu}
        aria-labelledby={labelId}
        aria-controls={isVisibleMenu ? optionsListId : undefined}
        aria-activedescendant={isVisibleMenu ? focusedOptionId : undefined}
        startAdornment={startAdornment}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small-l"
              variant="clear"
              color="secondary"
              stopFocus
              onClick={handleToggleVisibleMenu}
              tabIndex={-1}
              readonly={readonly}
            >
              <Icon className={styles["open-menu-icon"]} variant="arrow" />
            </IconButton>
          </InputAdornment>
        }
      />
      <Dropdown
        className={styles["menu"]}
        isVisible={isVisibleMenu}
        onClose={handleCloseMenu}
        parentRef={autocompleteRef}
        stopAnimation
        width={menuWidth}
        positionVariant={menuPosition}
      >
        {!disabled && !readonly && isMountingMenu && (
          <Options
            isVisible={isVisibleMenu}
            onClose={handleCloseMenu}
            onSelect={handleSelect}
            labelId={labelId}
            autocompleteRef={autocompleteRef}
            fieldRef={fieldRef}
            parentId={id}
            optionsListId={optionsListId}
            options={children}
            getDisabledOption={getDisabledOption}
            focusedOptionIndex={focusedOptionIndex}
            setFocusedOptionIndex={setFocusedOptionIndex}
            setFocusedOptionId={setFocusedOptionId}
            value={value}
            selectedValue={selectedValue}
            isStopFilter={isStopFilter}
            isFocusedField={isFocusedField}
            height={menuHeight}
          />
        )}
      </Dropdown>
    </div>
  );
});
