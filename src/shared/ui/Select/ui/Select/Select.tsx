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

export type SelectVariant = "outlined" | "filled";
export type SelectSize = "medium" | "large";
export type SelectLabelVariant = "visible" | "hidden";

export interface Option {
  value: string
  label: string
}

export type MenuItem = ReactElement<typeof MenuItem>

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
  onBlur?: () => void
  children: MenuItem[]
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
    children
  } = props;

  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string | string[]>(
    value
  );

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
          newValues = selectedValues.filter((selectedValue) => selectedValue !== value);
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
      }
    },
    [selectedValues, onSelect]
  );

  const handleDelete = useCallback(
    (value: string) => {
      if (Array.isArray(selectedValues)) {
        const newValues = selectedValues.filter((selectedValue) => selectedValue !== value);
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
            variant="filled"
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
  };

  const currentTabIndex = isDisabled || isReadonly ? -1 : tabIndex;

  return (
    <div className={classNames(styles["select"], additionalClasses, mods)}>
      <div className={styles["field-container"]}>
        <div
          className={classNames(styles["field"], [], {
            [styles["dirty"]]: isDirty,
          })}
          ref={fieldRef}
          tabIndex={currentTabIndex}
          id={id}
          onClick={handleToggleVisibleMenu}
          onBlur={handleBlur}
          onFocus={onFocus}
          aria-readonly={isReadonly ? 'true' : 'false'}
          aria-disabled={isDisabled ? 'true' : 'false'}
          aria-errormessage={id + 'error'}
        >
          <span className={styles["label"]}>{label}</span>
          {typeof selectedValues === "string" ? (
            <span>{getSelectedOptions[0]?.label}</span>
          ) : (
            <div className={styles["chips"]}>{renderSelectedOptions}</div>
          )}
          <Icon
            className={styles["arrow-icon"]}
            variant="arrow"
            size="small-l"
            color="secondary"
          />
          {placeholder && (
            <span className={styles["placeholder"]}>{placeholder}</span>
          )}
        </div>
        <Options
          onSelect={handleSelect}
          menuItems={children}
          isVisible={isVisibleMenu}
          parentRef={fieldRef}
          selectedValue={selectedValues}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          isCloseAfterSelect={Array.isArray(selectedValues) ? false : true}
        />
      </div>
      {errorMessage && (
        <div className={styles["error-message"]} id={id + 'error'}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
});
