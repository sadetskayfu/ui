import { classNames } from "@/shared/lib";
import {
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

export interface Option {
  value: string;
  label: string;
}

interface FieldProps {
  className?: string
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
  options: Record<string, Option>;
  onChange: (value: string) => void;
  onSelect: (optionValue: string | string[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  fieldProps: FieldProps;
}

export const Autocomplete = (props: AutocompleteProps) => {
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
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [activeOptionId, setActiveOptionId] = useState<string | undefined>(
    undefined
  );

  const fieldRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null)

  const optionsListId = useId() + id;
  const labelId = useId() + id;

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

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (Array.isArray(selectedValue)) {
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
      if (typeof selectedValue === "string") {
        const newSelectedValue =
          selectedValue === optionValue ? "" : optionValue;
        onSelect(newSelectedValue);
        onChange(newSelectedValue.length > 0 ? options[newSelectedValue].label : '');
        handleCloseMenu();
      }
    },
    [selectedValue, onSelect, onChange, handleCloseMenu, options]
  );

  const handleDelete = useCallback(
    (optionValue: string) => {
      if (Array.isArray(selectedValue)) {
        const newSelectedValues = selectedValue.filter(
          (selectedValue) => selectedValue !== optionValue
        );
        onSelect(newSelectedValues);
        onChange("");
      }
      fieldRef.current?.focus();
    },
    [selectedValue, onSelect, onChange]
  );

  const handleBlur = useCallback(() => {
    if (isStrict) {
      Array.isArray(selectedValue)
        ? onChange("")
        : selectedValue
        ? onChange(options[selectedValue].label)
        : onChange('');
    }
    onBlur?.();
    handleCloseMenu();
  }, [handleCloseMenu, onBlur, isStrict, onChange, options, selectedValue]);

  // Clear value
  useEffect(() => {
    if(typeof value === 'string' && value === '') {
      onSelect('')
    }
  }, [onSelect, value])

  const optionsArray = useMemo(() => Object.values(options), [options]);

  return (
    <div ref={autocompleteRef} className={classNames(styles["autocomplete"], [className])}>
      <Field
        id={id}
        ref={fieldRef}
        labelId={labelId}
        value={value}
        isDisabled={isDisabled}
        isReadonly={isReadonly}
        isRequired={isRequired}
        onBlur={handleBlur}
        onFocus={onFocus}
        onClick={handleToggleVisibleMenu}
        onChange={onChange}
        autoComplete="off"
        {...fieldProps}
      />
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
        options={optionsArray}
        isAutocomplete
      />
    </div>
  );
};
