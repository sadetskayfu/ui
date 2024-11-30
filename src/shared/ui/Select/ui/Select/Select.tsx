import { classNames } from "@/shared/lib";
import {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import { Options } from "@/shared/ui/Options";
import { Chip } from "@/shared/ui/Chip";
import { Icon } from "@/shared/ui/Icon";
import type { InputAdornment } from "@/shared/ui/InputAdornment";

export type SelectVariant = "outlined" | "filled";
export type SelectSize = "medium" | "large";
export type SelectLabelVariant = "visible" | "hidden";

interface OptionsMenuProps {
  width: string;
  height: string;
}

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
  options: Record<string, Option>;
  children?: ReactElement[];
  tabIndex?: number;
  isRequired?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  startAdornment?: ReactElement<typeof InputAdornment>;
  optionsMenuProps?: OptionsMenuProps;
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
    isRequired,
    isReadonly,
    isDisabled,
    errorMessage,
    onBlur,
    onFocus,
    startAdornment,
    optionsMenuProps,
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    value
  );
  const [isFocusedField, setIsFocusedField] = useState<boolean>(false);
  const [activeOptionId, setActiveOptionId] = useState<string | undefined>(
    undefined
  );

  const fieldRef = useRef<HTMLDivElement | null>(null);

  const optionsListId = useId() + id;
  const labelId = useId() + id;
  const errorMessageId = useId() + id;

  const handleToggleVisibleMenu = () => {
    if(isReadonly) return
    setIsVisibleMenu((prev) => !prev);
  };

  const handleOpenMenu = useCallback(() => {
    setIsVisibleMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (Array.isArray(selectedValues)) {
        let newSelectedValues: string[] = [];
        const alreadyExistingValue = selectedValues.filter(
          (selectedValue) => selectedValue === optionValue
        );

        if (alreadyExistingValue.length > 0) {
          newSelectedValues = selectedValues.filter(
            (selectedValue) => selectedValue !== optionValue
          );
        } else {
          newSelectedValues = [...selectedValues];
          newSelectedValues.push(optionValue);
        }
        setSelectedValues(newSelectedValues);
        onSelect(newSelectedValues);
      }
      if (typeof selectedValues === "string") {
        const newSelectedValue = selectedValues === optionValue ? "" : optionValue;
        setSelectedValues(newSelectedValue);
        onSelect(newSelectedValue);
        handleCloseMenu();
      }
    },
    [selectedValues, onSelect, handleCloseMenu]
  );

  const handleDelete = useCallback(
    (optionValue: string) => {
      if (Array.isArray(selectedValues)) {
        const newSelectedValues = selectedValues.filter(
          (selectedValue) => selectedValue !== optionValue
        );
        setSelectedValues(newSelectedValues);
        onSelect(newSelectedValues);
      }
      fieldRef.current?.focus();
    },
    [selectedValues, onSelect]
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
    if(isReadonly) return
    if (
      event.key === "Backspace" &&
      Array.isArray(selectedValues) &&
      selectedValues.length > 0
    ) {
      event.preventDefault();
      const newValues = selectedValues.slice(0, -1);
      setSelectedValues(newValues);
      onSelect(newValues);
    }
  };

  const getSelectedOptions = useMemo((): Option[] => {
    const selectedOptions: Option[] = [];

    if (Array.isArray(selectedValues) && selectedValues.length > 0) {
      selectedValues.forEach((value) => {
        selectedOptions.push(options[value]);
      });
      return selectedOptions;
    }
    if (typeof selectedValues === "string" && selectedValues.length > 0) {
      selectedOptions.push(options[selectedValues]);
      return selectedOptions;
    }
    return [];
  }, [options, selectedValues]);

  const renderSelectedOptions = useMemo(() => {
    if (Array.isArray(selectedValues) && selectedValues.length > 0) {
      return getSelectedOptions.map((option) => {
        return (
          <Chip
            color="secondary"
            variant={variant === "filled" ? "outlined" : "filled"}
            size="small"
            onClose={() => handleDelete(option.value)}
            key={option.value}
            label={option.label}
            closeButtonTabIndex={-1}
            isReadonly={isReadonly}
          />
        );
      });
    }
  }, [getSelectedOptions, selectedValues, handleDelete, variant, isReadonly]);

  const optionsArray = useMemo(() => Object.values(options), [options]);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const isDirty = selectedValues.length > 0 || !!startAdornment;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[size],
    styles[labelVariant],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["required"]]: isRequired,
    [styles["disabled"]]: isDisabled,
    [styles["dirty"]]: isDirty,
    [styles["visible-menu"]]: isVisibleMenu,
    [styles["errored"]]: !!errorMessage,
    [styles["focused"]]: isFocusedField,
  };

  const localTabIndex = isDisabled ? -1 : tabIndex;

  return (
    <div className={classNames(styles["select"], additionalClasses, mods)}>
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
          aria-activedescendant={isVisibleMenu ? activeOptionId : undefined}
          aria-readonly={isReadonly ? 'true' : undefined}
          aria-required={isRequired ? 'true' : undefined}
        >
          {startAdornment && (
            <div className={styles["start-adornment"]}>{startAdornment}</div>
          )}
          <div className={styles["content"]}>
            <p className={styles["placeholder"]}>{placeholder}</p>
            {Array.isArray(selectedValues) ? (
              <div className={styles["chips"]}>{renderSelectedOptions}</div>
            ) : (
              <p>{getSelectedOptions[0]?.label}</p>
            )}
          </div>
          <Icon
            className={styles["open-menu-button"]}
            variant="arrow"
            size="small-l"
            color="dark"
          />
        </div>
      </div>
      {errorMessage && (
        <div className={styles["error-message"]} id={errorMessageId}>
          <p>{errorMessage}</p>
        </div>
      )}
      {!isReadonly &&
        (!isDisabled && (
          <Options
            onSelect={handleSelect}
            getDisabledOption={getDisabledOption}
            options={optionsArray}
            menuItems={children}
            isVisible={isVisibleMenu}
            parentRef={fieldRef}
            selectedValue={selectedValues}
            onClose={handleCloseMenu}
            onOpen={handleOpenMenu}
            setActiveOptionId={setActiveOptionId}
            optionsListId={optionsListId}
            labelId={labelId}
            parentId={id}
            {...optionsMenuProps}
          />
        ))}
    </div>
  );
});
