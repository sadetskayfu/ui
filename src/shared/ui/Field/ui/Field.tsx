import { classNames } from "@/shared/lib";
import {
  ChangeEvent,
  memo,
  useRef,
  forwardRef,
  useState,
  InputHTMLAttributes,
  useEffect,
  ReactElement,
  Children,
  cloneElement,
} from "react";
import { debounce } from "lodash";
import styles from "./style.module.scss";
import { Icon } from "../../Icon";
import { IconButton } from "../../IconButton";

export type FieldVariant = "outlined" | "filled";
export type FieldSize = "small" | "medium" | "large";
export type FieldLabelVariant = "visible" | "hidden";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "size"
>;

interface FieldProps extends HTMLInputProps {
  className?: string;
  label: string;
  name?: string;
  id: string;
  labelId?: string;
  placeholder?: string;
  variant?: FieldVariant;
  labelVariant?: FieldLabelVariant;
  size?: FieldSize;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  isMultiline?: boolean;
  isMultiAutocomplete?: boolean;
  errorMessage?: string;
  value: string;
  tabIndex?: number;
  chips?: ReactElement;
  startAdornment?: ReactElement;
  endAdornment?: ReactElement | ReactElement[];
  debounceTime?: number;
  onClick?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export const Field = memo(
  forwardRef(
    (props: FieldProps, ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement | null>) => {
      const {
        id,
        labelId,
        value: externalValue,
        onChange,
        className,
        name,
        label,
        errorMessage,
        placeholder,
        variant = "outlined",
        labelVariant = "visible",
        size = "medium",
        readonly,
        required,
        disabled,
        isMultiline,
        isMultiAutocomplete,
        tabIndex = 0,
        startAdornment,
        endAdornment,
        chips,
        onClick,
        onBlur,
        onFocus,
        onSearch,
        debounceTime = 0,
        ...otherProps
      } = props;

      
      const [value, setValue] = useState<string>(externalValue);
      const [isDirty, setIsDirty] = useState<boolean>(false)
      const [isMovedLabel, setIsMovedLabel] = useState<boolean>(false)
      const [isFocusedField, setIsFocusedField] = useState<boolean>(false);
      const [transitionDuration, setTransitionDuration] = useState<
        string | undefined
      >(undefined);

      const errorMessageId = id + 'error-message';
      const localLabelId = labelId ? labelId : id + 'label'

      const localInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
      const inputRef = ref ? (ref as React.RefObject<HTMLInputElement | HTMLTextAreaElement>) : localInputRef;
      
      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (onSearch) {
          if (event.key === "Enter" && isDirty) {
            onSearch();
          }
        }
      };

      const handleFocus = () => {
        setIsFocusedField(true);
        onFocus?.();
      };

      const handleBlur = () => {
        setIsFocusedField(false);
        onBlur?.();
      };

      const handleClick = () => {
          inputRef.current?.focus();
        onClick?.();
      };

      const debouncedOnChange = useRef(
        debounce((value: string) => {
          onChange?.(value);
        }, debounceTime)
      ).current;

      const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const newValue = event.target.value;
        setValue(newValue);
        debounceTime ? debouncedOnChange(newValue) : onChange?.(newValue);
      };

      const handleClear = () => {
        setValue("");
        onChange?.("");
        inputRef.current?.focus();
      };

      useEffect(() => {
        return () => {
          debouncedOnChange.cancel();
        };
      }, [debouncedOnChange]);

      // Update height textarea
      useEffect(() => {
        const textarea = inputRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          const newHeight = textarea.scrollHeight;
          textarea.style.height = `${newHeight}px`;
        }
      }, [value, inputRef]);

      // Add lazy transition for skip autofill
      useEffect(() => {
        setTimeout(() => {
          setTransitionDuration("0.2s");
        }, 1000);
      }, []);

      useEffect(() => {
        isFocusedField && setTransitionDuration("0s");
        !isFocusedField && transitionDuration && setTransitionDuration("0.2s");
      }, [isFocusedField, transitionDuration]);

      // Update value
      useEffect(() => {
        setValue(externalValue);
      }, [externalValue]);

      // Update isDirty
      useEffect(() => {
        value.length > 0 ? setIsDirty(true) : setIsDirty(false)
      }, [value])

      // Update isMovedLabel
      useEffect(() => {
        if(isDirty || !!startAdornment || !!chips) {
          setIsMovedLabel(true)
        } else {
          setIsMovedLabel(false)
        }
      }, [isDirty, startAdornment, chips])

      const localTabIndex: number = disabled ? -1 : tabIndex;

      const mods: Record<string, boolean | undefined> = {
        [styles["dirty"]]: isDirty,
        [styles['moved-label']]: isMovedLabel,
        [styles["errored"]]: !!errorMessage,
        [styles["focused"]]: isFocusedField,
        [styles["readonly"]]: readonly,
        [styles["disabled"]]: disabled,
        [styles["required"]]: required,
        [styles["multiline"]]: isMultiline,
        [styles["multi-autocomplete"]]: isMultiAutocomplete,
      };

      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[labelVariant],
        styles[size],
      ];
      
      const inputProps = {
        name,
        id,
        placeholder,
        tabIndex: localTabIndex,
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        onFocus: handleFocus,
        disabled: disabled,
        required: required,
        readOnly: readonly,
        className: styles['input'],
      }

      return (
        <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
          <div className={styles["field-wrapper"]}>
            <label className={styles["label"]} htmlFor={id} id={localLabelId}>
              {label}
            </label>
            <div
              className={styles["field"]}
              onClick={handleClick}
              onMouseDown={(event) => event.preventDefault()}
            >
              {startAdornment && (
                <div className={styles["start-adornment"]}>
                  {startAdornment}
                </div>
              )}
              <div className={styles["content"]}>
                {chips && chips}
                {isMultiline ? (
                  <textarea
                    rows={1}
                    style={{ transitionDuration }}
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    aria-errormessage={
                      errorMessage ? errorMessageId : undefined
                    }
                    {...inputProps}
                  />
                ) : (
                  <input
                    style={{ transitionDuration }}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    aria-errormessage={
                      errorMessage ? errorMessageId : undefined
                    }
                    onKeyDown={handleKeyDown}
                    {...inputProps}
                    {...otherProps}
                  />
                )}
              </div>
              <div className={styles["buttons"]}>
                {isDirty && !readonly && !disabled && (
                  <IconButton
                    onClick={handleClear}
                    className={styles["clear-field-button"]}
                    stopFocus
                    size="small-l"
                    variant="clear"
                    color="secondary"
                    tabIndex={-1}
                  >
                    <Icon variant="x-mark" />
                  </IconButton>
                )}
                {Children.map(endAdornment, (item) => {
                  return cloneElement(item as ReactElement);
                })}
              </div>
              {onSearch && (
                <IconButton
                  onClick={onSearch}
                  className={styles["search-button"]}
                  color="secondary"
                  borderRadius="none"
                  size="custom-size"
                  tabIndex={-1}
                  aria-label="Find by the entered value"
                  readonly={readonly}
                >
                  <Icon variant="search" size="small-l" />
                </IconButton>
              )}
            </div>
          </div>
          {errorMessage && (
            <p className={styles["error-message"]} id={errorMessageId}>
              {errorMessage}
            </p>
          )}
        </div>
      );
    }
  )
);
