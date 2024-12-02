import { classNames } from "@/shared/lib";
import {
  Children,
  cloneElement,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useId,
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
import type { InputAdornment } from "@/shared/ui/InputAdornment";
import { Options } from "@/shared/ui/Options";
import { Chip } from "@/shared/ui/Chip";
import type { MenuItemProps } from "@/shared/ui/MenuItem";

export interface Option {
  value: string;
  label: string;
}

interface OptionsMenuProps {
  width?: string;
  height?: string;
}

interface FieldProps {
  className?: string;
  variant?: FieldVariant;
  labelVariant?: FieldLabelVariant;
  size?: FieldSize;
  label: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  tabIndex?: number;
  isHiddenLabel?: boolean;
  startAdornment?: ReactElement<typeof InputAdornment>;
  endAdornment?:
    | ReactElement<typeof InputAdornment>
    | ReactElement<typeof InputAdornment>[];
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
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  groupBy?: keyof Option | "first-letter";
  getDisabledOption?: (value: string) => boolean;
  fieldProps: FieldProps;
  children?: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[];
  optionsMenuProps?: OptionsMenuProps;
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
    isReadonly,
    isDisabled,
    isRequired,
    fieldProps,
    groupBy,
    children,
    getDisabledOption,
    optionsMenuProps,
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [activeOptionId, setActiveOptionId] = useState<string | undefined>(
    undefined
  );
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isStopFilter, setStopFilter] = useState<boolean>(true);

  const fieldRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const optionsListId = useId() + id;
  const labelId = useId() + id;

  const isMultiAutocomplete = Array.isArray(selectedValue);

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

  // handlers for toggle visible options menu
  const handleToggleVisibleMenu = useCallback(() => {
    if (isReadonly) return;
    setIsVisibleMenu((prev) => !prev);
  }, [isReadonly]);
  const handleOpenMenu = useCallback(() => {
    setIsVisibleMenu(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      onChange(value);
      if (value.length > 0) {
        handleOpenMenu();
      }
      setTimeout(() => {
        setActiveIndex(-1);
      }, 0);
      setStopFilter(false);
    },
    [onChange, handleOpenMenu]
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (isMultiAutocomplete) {
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
      }
      if (!isMultiAutocomplete) {
        const newSelectedValue =
          selectedValue === optionValue ? "" : optionValue;
        onSelect(newSelectedValue);
        onChange(
          newSelectedValue.length > 0
            ? localOptions[newSelectedValue].label
            : ""
        );
        handleCloseMenu();
      }
    },
    [
      selectedValue,
      onSelect,
      onChange,
      handleCloseMenu,
      localOptions,
      isMultiAutocomplete,
    ]
  );

  const handleDelete = useCallback(
    (optionValue: string) => {
      if (isMultiAutocomplete) {
        const newSelectedValues = selectedValue.filter(
          (selectedValue) => selectedValue !== optionValue
        );
        onSelect(newSelectedValues);
        onChange("");
      }
      fieldRef.current?.focus();
    },
    [selectedValue, onSelect, onChange, isMultiAutocomplete]
  );

  const handleBlur = useCallback(() => {
    if (isStrict) {
      isMultiAutocomplete
        ? onChange("")
        : selectedValue
          ? onChange(localOptions[selectedValue].label)
          : onChange("");
    }
    onBlur?.();
    handleCloseMenu();
  }, [
    handleCloseMenu,
    onBlur,
    isStrict,
    onChange,
    localOptions,
    selectedValue,
    isMultiAutocomplete,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if(event.key === 'Backspace' && value === '' && isMultiAutocomplete && selectedValue.length > 0) {
      event.preventDefault();
      const newValues = selectedValue.slice(0, -1);
      onSelect(newValues);
    }
  }

  // Clear the selected value if input value = ''
  useEffect(() => {
    if (!isMultiAutocomplete && value === "" && selectedValue.length > 0) {
      onSelect("");
    }
  }, [onSelect, value, selectedValue, isMultiAutocomplete]);

  // Clear the filter if value === selected value
  useEffect(() => {
    if (
      !isMultiAutocomplete &&
      value === localOptions[selectedValue]?.label &&
      !isVisibleMenu
    ) {
      setStopFilter(true);
    }
  }, [value, selectedValue, localOptions, isVisibleMenu, isMultiAutocomplete]);

  // Filter the options, if you not have children options
  const filteredOptions = useMemo(() => {
    if (children) return;
    if (isStopFilter) return options;

    let newOptions: Option[] = [];
    newOptions = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );

    return newOptions;
  }, [options, value, isStopFilter, children]);

  // Filter the children options
  const filteredChildrenOptions = useMemo(() => {
    if (!children) return;
    if (isStopFilter) return children;

    const filteredItems: ReactElement<MenuItemProps>[] = [];

    Children.map(children, (menuItem: ReactElement<MenuItemProps>) => {
      const label = menuItem.props.label;
      if (label!.toLocaleLowerCase().includes(value.toLowerCase()))
        filteredItems.push(cloneElement(menuItem));
    });

    return filteredItems;
  }, [children, value, isStopFilter]);

  // Render chips for multi autocomplete
  const renderSelectedOptions = useMemo(() => {
    if (isMultiAutocomplete && selectedValue.length > 0) {
      return selectedValue.map((option) => {
        return (
          <Chip
            color="secondary"
            variant={fieldProps.variant === "filled" ? "outlined" : "filled"}
            size="small"
            isStopFocus
            onClose={() => handleDelete(option)}
            key={option}
            label={localOptions[option].label}
            closeButtonTabIndex={-1}
            isReadonly={isReadonly}
          />
        );
      });
    }
  }, [
    fieldProps.variant,
    handleDelete,
    isReadonly,
    localOptions,
    selectedValue,
    isMultiAutocomplete,
  ]);

  return (
    <div
      ref={autocompleteRef}
      className={classNames(styles["autocomplete"], [className])}
    >
      <Field
        id={id}
        ref={fieldRef}
        labelId={labelId}
        value={value}
        debounceTime={300}
        isDisabled={isDisabled}
        isReadonly={isReadonly}
        isRequired={isRequired}
        onBlur={handleBlur}
        onFocus={onFocus}
        onClick={handleToggleVisibleMenu}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        isMultiAutocomplete={isMultiAutocomplete}
        chips={renderSelectedOptions}
        autoComplete="off"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isVisibleMenu}
        aria-labelledby={labelId}
        aria-controls={isVisibleMenu ? optionsListId : undefined}
        aria-activedescendant={isVisibleMenu ? activeOptionId : undefined}
        {...fieldProps}
      />
      {!isDisabled && !isReadonly && (
        <Options
          isVisible={isVisibleMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          onSelect={handleSelect}
          labelId={labelId}
          parentRef={autocompleteRef}
          parentId={id}
          setActiveOptionId={setActiveOptionId}
          optionsListId={optionsListId}
          selectedValue={selectedValue}
          options={filteredOptions}
          childrenOptions={filteredChildrenOptions}
          isAutocomplete
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          groupBy={groupBy}
          getDisabledOption={getDisabledOption}
          {...optionsMenuProps}
        />
      )}
    </div>
  );
});
