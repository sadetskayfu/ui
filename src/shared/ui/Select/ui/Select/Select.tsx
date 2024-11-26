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
import { Options } from "../Options/Options";
import { Chip } from "@/shared/ui/Chip";
import { Icon } from "@/shared/ui/Icon";
import type { MenuItem } from "@/shared/ui/MenuItem";
import type { InputAdornment } from "@/shared/ui/InputAdornment";

export type SelectVariant = "outlined" | "filled";
export type SelectSize = "medium" | "large";
export type SelectLabelVariant = "visible" | "hidden";

export interface Option {
  value: string;
  label: string;
}

export type MenuItem = ReactElement<typeof MenuItem>;

interface SelectProps {
  className?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  labelVariant?: SelectLabelVariant;
  placeholder?: string;
  label: string;
  value: string | string[];
  onSelect: (values: string | string[]) => void;
  options: Record<string, Option>;
  tabIndex?: number;
  isRequired?: boolean;
  isReadonly?: boolean;
  isDisabled?: boolean;
  errorMessage?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  children?: MenuItem[];
  startAdornment?: ReactElement<typeof InputAdornment>;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    variant = "outlined",
    size = "medium",
    labelVariant = "visible",
    placeholder,
    label,
    value,
    options,
    onSelect,
    tabIndex = 0,
    isRequired,
    isReadonly,
    isDisabled,
    errorMessage,
    onBlur,
    onFocus,
    children,
    startAdornment
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    value
  );
  const [isFocusedField, setIsFocusedField] = useState<boolean>(false);

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const handleToggleVisibleMenu = () => {
    setIsVisibleMenu((prev) => !prev);
  };

  const handleOpenMenu = useCallback(() => {
    setIsVisibleMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsVisibleMenu(false);
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      if (Array.isArray(selectedValues)) {
        let newValues: string[] = [];
        const alreadyExistingValue = selectedValues.filter(
          (selectedValue) => selectedValue === value
        );

        if (alreadyExistingValue.length > 0) {
          newValues = selectedValues.filter(
            (selectedValue) => selectedValue !== value
          );
        } else {
          newValues = [...selectedValues];
          newValues.push(value);
        }
        setSelectedValues(newValues);
        onSelect(newValues);
      }
      if (typeof selectedValues === "string") {
        const newValue = selectedValues === value ? "" : value;
        setSelectedValues(newValue);
        onSelect(newValue);
        handleCloseMenu();
      }
    },
    [selectedValues, onSelect, handleCloseMenu]
  );

  const handleDelete = useCallback(
    (value: string) => {
      if (Array.isArray(selectedValues)) {
        const newValues = selectedValues.filter(
          (selectedValue) => selectedValue !== value
        );
        setSelectedValues(newValues);
        onSelect(newValues);
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
            color={variant === 'filled' ? 'primary' : 'secondary'}
            variant='filled'
            size="small"
            isStopFocus
            onClose={() => handleDelete(option.value)}
            key={option.value}
            label={option.label}
          />
        );
      });
    }
  }, [getSelectedOptions, selectedValues, handleDelete]);

  const optionsArray = useMemo(() => Object.values(options), [options]);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const isDirty = selectedValues.length > 0;

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[size],
    styles[labelVariant],
  ];

  const mods: Record<string, boolean | undefined> = {
    [styles["required"]]: isRequired,
    [styles["disabled"]]: isDisabled,
    [styles["readonly"]]: isReadonly,
    [styles["dirty"]]: isDirty,
    [styles["visible-menu"]]: isVisibleMenu,
    [styles["errored"]]: !!errorMessage,
    [styles["focused"]]: isFocusedField,
  };

  const localTabIndex = isDisabled ? -1 : tabIndex;

  return (
    <div className={classNames(styles["select"], additionalClasses, mods)}>
      <div className={styles["field-wrapper"]}>
        <label className={styles["label"]}>{label}</label>
        <div
          className={styles["field"]}
          tabIndex={localTabIndex}
          id={id}
          ref={fieldRef}
          onClick={handleToggleVisibleMenu}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-errormessage={id + "error"}
        >
          <div className={styles["start-adornment"]}>{startAdornment}</div>
          <div className={styles["content"]}>
            <p className={styles["placeholder"]}>{placeholder}</p>
            {Array.isArray(selectedValues) ? <div className={styles['chips']}>{renderSelectedOptions}</div> : <p>{getSelectedOptions[0]?.label}</p>}
          </div>
            <Icon className={styles['open-menu-button']} variant="arrow" size="small-l" color="dark"/>
        </div>
        <Options
          onSelect={handleSelect}
          menuItems={children}
          options={optionsArray}
          isVisible={isVisibleMenu}
          parentRef={fieldRef}
          selectedValue={selectedValues}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
        />
      </div>
      {errorMessage && (
        <div className={styles["error-message"]} id={id + "error"}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
});
