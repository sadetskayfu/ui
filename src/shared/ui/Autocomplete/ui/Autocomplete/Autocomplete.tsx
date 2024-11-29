import { classNames, getItemOnId } from "@/shared/lib";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FieldVariant, FieldLabelVariant, Field } from "@/shared/ui/Field";
import styles from "./style.module.scss";

interface Option {
  id: string;
  label: string;
}

interface AutocompleteProps {
  className?: string;
  variant?: FieldVariant
  labelVariant?: FieldLabelVariant
  isStrict?: boolean
  name: string;
  label: string;
  value: string;
  selectedValue: string;
  options: Option[];
  placeholder?: string;
  errorMessage?: string;
  tabIndex?: number
  onChange?: (value: string) => void;
  onSelect?: (id: string, value: string) => void;
  onValidate?: (value: string) => string[];
}

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    className,
    variant = 'outlined',
    labelVariant = 'visible',
    isStrict = true,
    name,
    label,
    value,
    placeholder,
    options,
    selectedValue,
    errorMessage,
    tabIndex = 0,
    onChange,
    onSelect,
    onValidate,
  } = props;

  const [stopFilter, setStopFilter] = useState<boolean>(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleMenu = useCallback(() => {
    setIsVisibleMenu((prev) => !prev)
  }, [])

  const handleOpenMenu = useCallback(() => {
    setIsVisibleMenu(true);
  }, []);
  
  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleSelect = useCallback((id: string, value: string) => {
    if(selectedValue === id) {
      onSelect?.('', '')
    } else {
      onSelect?.(id, value);
    }
    setStopFilter(true);
  }, [onSelect, selectedValue]);

  const handleChange = useCallback((value: string) => {
    if (!isVisibleMenu) {
      handleOpenMenu();
    }
    onChange?.(value);
    setStopFilter(false);
  }, [handleOpenMenu, isVisibleMenu, onChange]);

  const handleRemove = useCallback(() => {
    onSelect?.("", "");
  }, [onSelect]);

  // Clear after blur and close options menu + validate
  const handleBlur = useCallback(() => {
    if(strict) {
      selectedValue === '' ? onChange?.('') : onChange?.(getItemOnId(options, selectedValue).label);
    }
    setStopFilter(true)
    setIsVisibleMenu(false);
    onValidate?.(value);
  }, [onChange, onValidate, options, selectedValue, value, strict]);

  // Clear
  useEffect(() => {
    if (value === "") {
      handleRemove();
    }
  }, [value, handleRemove]);

  // Filter options
  const filteredOptions = useMemo(() => {
    if (stopFilter) {
      return options;
    }
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    return filteredOptions;
  }, [value, options, stopFilter]);

  return (
    <div className={classNames(styles["wrapper"], [className])}>
      <Field
        variant={inputVariant}
        labelVariant={labelVariant}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={errorMessage}
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={handleToggleMenu}
        ref={inputRef}
        tabIndex={tabIndex}
        type="text"
      />
    </div>
  );
};
