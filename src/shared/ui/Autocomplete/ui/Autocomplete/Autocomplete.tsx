import { classNames, getItemOnId } from "@/shared/lib";
import { Input } from "../../../Input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Options } from "../Options/Options";
import styles from "./style.module.scss";
import { InputVariant, InputLabelVariant } from "@/shared/ui/Input/ui/Input";

export type AutocompleteVariant = 'text' | 'countries'

export interface Option {
  id: string;
  label: string;
  phone?: string;
}

interface AutocompleteProps {
  className?: string;
  variant?: AutocompleteVariant
  inputVariant?: InputVariant
  labelVariant?: InputLabelVariant
  strict?: boolean
  name: string;
  label: string;
  value: string;
  selectedValue: string;
  options: Option[];
  placeholder?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onSelect?: (id: string, value: string) => void;
  onValidate?: (value: string) => string[];
}

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    className,
    variant = 'text',
    inputVariant = 'transparent',
    labelVariant = 'jump',
    strict = true,
    name,
    label,
    value,
    placeholder,
    options,
    selectedValue,
    errorMessage,
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
  const handleClearAfterBlur = useCallback(() => {
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
      <Input
        variant={inputVariant}
        labelVariant={labelVariant}
        name={name}
        label={label}
        value={value}
        placeholder={placeholder}
        errorMessage={errorMessage}
        onChange={handleChange}
        onBlur={handleClearAfterBlur}
        onClick={handleToggleMenu}
        ref={inputRef}
        type="text"
      />
      <Options
        isVisible={isVisibleMenu}
        onClose={handleCloseMenu}
        onOpen={handleOpenMenu}
        onSelect={handleSelect}
        parentRef={inputRef}
        options={filteredOptions}
        selectedValue={selectedValue}
        variant={variant}
      />
    </div>
  );
};
