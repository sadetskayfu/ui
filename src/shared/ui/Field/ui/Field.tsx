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
  labelId: string;
  placeholder?: string;
  variant?: FieldVariant;
  labelVariant?: FieldLabelVariant;
  size?: FieldSize;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isHiddenLabel?: boolean;
  isMultiline?: boolean;
  isMultiAutocomplete?: boolean;
  errorMessage?: string;
  value: string;
  type?: "text" | "password";
  tabIndex?: number;
  chips?: ReactElement[];
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
    (props: FieldProps, ref: React.ForwardedRef<HTMLInputElement | null>) => {
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
        isReadonly,
        isRequired,
        isDisabled,
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
        type = "text",
        debounceTime = 0,
        ...otherProps
      } = props;

      const [value, setValue] = useState<string>(externalValue);
      const [isFocusedField, setIsFocusedField] = useState<boolean>(false);
      const [transitionDuration, setTransitionDuration] = useState<
        string | undefined
      >(undefined);

      const isDirty = value.length > 0 || !!startAdornment || !!chips;

      const errorMessageId = id + 'error-message';

      const inputRef = useRef<HTMLInputElement>(null);
      const input = ref ? (ref as React.RefObject<HTMLInputElement>) : inputRef;
      const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
        if (isMultiline) {
          textareaRef.current?.focus();
        } else {
          input.current?.focus();
        }
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
        input.current?.focus();
      };

      useEffect(() => {
        return () => {
          debouncedOnChange.cancel();
        };
      }, [debouncedOnChange]);

      // Update height textarea
      useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          const newHeight = textarea.scrollHeight;
          textarea.style.height = `${newHeight}px`;
        }
      }, [value]);

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

      const localTabIndex: number = isDisabled ? -1 : tabIndex;

      const mods: Record<string, boolean | undefined> = {
        [styles["dirty"]]: isDirty,
        [styles["errored"]]: !!errorMessage,
        [styles["focused"]]: isFocusedField,
        [styles["readonly"]]: isReadonly,
        [styles["disabled"]]: isDisabled,
        [styles["required"]]: isRequired,
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
        disabled: isDisabled,
        required: isRequired,
        readOnly: isReadonly,
        className: styles['input'],
      }

      return (
        <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
          <div className={styles["field-wrapper"]}>
            <label className={styles["label"]} htmlFor={id} id={labelId}>
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
                    ref={textareaRef}
                    aria-errormessage={
                      errorMessage ? errorMessageId : undefined
                    }
                    {...inputProps}
                  />
                ) : (
                  <input
                    style={{ transitionDuration }}
                    type={type}
                    ref={input}
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
                {value.length > 0 && !isReadonly && !isDisabled && (
                  <IconButton
                    onClick={handleClear}
                    className={styles["clear-field-button"]}
                    isStopFocus
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
                  isReadonly={isReadonly}
                >
                  <Icon variant="search" size="small-l" />
                </IconButton>
              )}
            </div>
          </div>
          {errorMessage && (
            <div className={styles["error-message"]} id={errorMessageId}>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
    }
  )
);
