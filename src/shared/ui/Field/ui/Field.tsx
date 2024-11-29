import { classNames } from "@/shared/lib";
import {
  ChangeEvent,
  memo,
  useRef,
  forwardRef,
  useState,
  useId,
  InputHTMLAttributes,
  useEffect,
  ReactElement,
} from "react";
import styles from "./style.module.scss";
import { Icon } from "../../Icon";
import { IconButton } from "../../IconButton";
import type { InputAdornment } from "../../InputAdornment";

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
  startAdornment?: ReactElement<typeof InputAdornment>;
  endAdornment?:
    | ReactElement<typeof InputAdornment>
    | ReactElement<typeof InputAdornment>[];
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
        value,
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
        onClick,
        onBlur,
        onFocus,
        onSearch,
        type = "text",
        ...otherProps
      } = props;

      const [textareaValue, setTextareaValue] = useState<string>("");
      const [isFocusedField, setIsFocusedField] = useState<boolean>(false);
      const [transitionDuration, setTransitionDuration] = useState<
        string | undefined
      >(undefined);

      const isDirty = value.length > 0 || !!startAdornment;
      const id = useId();

      const inputRef = useRef<HTMLInputElement>(null);
      const input = ref ? (ref as React.RefObject<HTMLInputElement>) : inputRef;
      const textareaRef = useRef<HTMLTextAreaElement | null>(null);

      const handleKeyDown = (event: React.KeyboardEvent) => {
        if (onSearch) {
          if ((event.key === "Enter" || event.key === " ") && isDirty) {
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

      const handleSetFocus = () => {
        if (isMultiline) {
          textareaRef.current?.focus();
        } else {
          input.current?.focus();
        }
      };

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
      };

      const handleClear = () => {
        onChange?.("");
        input.current?.focus();
      };

      const handleChangeTextareaValue = (
        event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        const newValue = event.target.value;
        setTextareaValue(newValue);
        onChange?.(newValue);
      };

      useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          const newHeight = textarea.scrollHeight;
          textarea.style.height = `${newHeight}px`;
        }
      }, [textareaValue]);

      useEffect(() => {
        setTimeout(() => {
          setTransitionDuration("0.2s");
        }, 1000);
      }, []);

      useEffect(() => {
        isFocusedField && setTransitionDuration("0s");
        !isFocusedField && transitionDuration && setTransitionDuration("0.2s");
      }, [isFocusedField, transitionDuration]);

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

      if (isMultiline) {
        return (
          <div
            className={classNames(styles["wrapper"], additionalClasses, mods)}
          >
            <div className={styles["field-wrapper"]}>
              <label className={styles["label"]} htmlFor={id}>
                {label}
              </label>
              <div className={styles["field"]} onClick={handleSetFocus}>
                {startAdornment && <div className={styles['start-adornment']}>{startAdornment}</div>}
                <div className={styles["content"]}>
                  <textarea
                    rows={1}
                    style={{ transitionDuration }}
                    className={styles["input"]}
                    name={name}
                    tabIndex={localTabIndex}
                    placeholder={placeholder}
                    id={id}
                    value={value}
                    onChange={handleChangeTextareaValue}
                    ref={textareaRef}
                    disabled={isDisabled}
                    required={isRequired}
                    readOnly={isReadonly}
                    onClick={onClick}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    aria-errormessage={id + "error"}
                  />
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
                    isDisabled={isDisabled}
                    isReadonly={isReadonly}
                  >
                    <Icon variant="x-mark" />
                  </IconButton>
                )}
                {Array.isArray(endAdornment)
                  ? endAdornment.map((item, index) => {
                      return <div key={index}>{item}</div>;
                    })
                  : endAdornment}
              </div>
              </div>
            </div>
            {errorMessage && (
              <div className={styles["error-message"]} id={id + "error"}>
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        );
      }

      return (
        <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
          <div className={styles["field-wrapper"]}>
            <label className={styles["label"]} htmlFor={id}>
              {label}
            </label>
            <div className={styles["field"]} onClick={handleSetFocus}>
              <div className={styles["start-adornment"]}>{startAdornment}</div>
              <div className={styles["content"]}>
                <input
                  style={{transitionDuration}}
                  className={styles["input"]}
                  name={name}
                  tabIndex={localTabIndex}
                  placeholder={placeholder}
                  id={id}
                  value={value}
                  onChange={handleChange}
                  type={type}
                  ref={input}
                  disabled={isDisabled}
                  required={isRequired}
                  readOnly={isReadonly}
                  onClick={onClick}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  aria-errormessage={id + "error"}
                  onKeyDown={handleKeyDown}
                  {...otherProps}
                />
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
                    isDisabled={isDisabled}
                    isReadonly={isReadonly}
                  >
                    <Icon variant="x-mark" />
                  </IconButton>
                )}
                {Array.isArray(endAdornment)
                  ? endAdornment.map((item, index) => {
                      return <div key={index}>{item}</div>;
                    })
                  : endAdornment}
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
                >
                  <Icon variant="search" size="small-l" />
                </IconButton>
              )}
            </div>
          </div>
          {errorMessage && (
            <div className={styles["error-message"]} id={id + "error"}>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
    }
  )
);
