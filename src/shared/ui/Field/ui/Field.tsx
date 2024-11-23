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
} from "react";
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
  placeholder?: string;
  variant?: FieldVariant;
  labelVariant?: FieldLabelVariant;
  size?: FieldSize;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isVisibleMenu?: boolean;
  isVisibleEyeButton?: boolean;
  isVisibleOpenMenuButton?: boolean;
  isHiddenLabel?: boolean;
  isMultiline?: boolean;
  isMultiAutocomplete?: boolean
  errorMessage?: string;
  value: string;
  type?: "text" | "password";
  tabIndex?: number;
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
        isVisibleMenu,
        isVisibleEyeButton,
        isVisibleOpenMenuButton,
        isMultiline,
        isMultiAutocomplete,
        tabIndex = 0,
        onClick,
        onBlur,
        onFocus,
        onSearch,
        type = "text",
        ...otherProps
      } = props;

      const [textareaValue, setTextareaValue] = useState<string>("");
      const [isPasswordVisible, setIsPasswordVisible] =
        useState<boolean>(false);
      const [isFocusedField, setIsFocusedField] = useState<boolean>(false);
      const [transitionDuration, setTransitionDuration] = useState<
        string | undefined
      >(undefined);

      const isDirty = value.length > 0;
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

      const handleToggleVisibilityPassword = () => {
        if (input.current && isVisibleEyeButton) {
          const cursorPosition = input.current.selectionStart;
          setIsPasswordVisible((prev) => !prev);
          setTimeout(() => {
            input.current!.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
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
        setTextareaValue(event.target.value);
        onChange?.(event.target.value);
      };

      useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          const newHeight = textarea.scrollHeight + 3;
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

      const inputType: string =
        type === "password" ? (isPasswordVisible ? "text" : "password") : type;

      const currentTabIndex: number = isDisabled ? -1 : tabIndex;

      const mods: Record<string, boolean | undefined> = {
        [styles["dirty"]]: isDirty,
        [styles["errored"]]: !!errorMessage,
        [styles["focused"]]: isFocusedField,
        [styles["readonly"]]: isReadonly,
        [styles["disabled"]]: isDisabled,
        [styles["required"]]: isRequired,
        [styles["multiline"]]: isMultiline,
        [styles["visible-menu"]]: isVisibleMenu,
        [styles['multi-autocomplete']]: isMultiAutocomplete
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
                <textarea
                  rows={1}
                  style={{ transitionDuration }}
                  className={styles["input"]}
                  name={name}
                  tabIndex={currentTabIndex}
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
              <div className={styles['content']}>

              {/*  */}
                <input
                  style={{ transitionDuration }}
                  className={styles["input"]}
                  name={name}
                  tabIndex={currentTabIndex}
                  placeholder={placeholder}
                  id={id}
                  value={value}
                  onChange={handleChange}
                  type={inputType}
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
                {isDirty && !isReadonly && !isDisabled && (
                  <IconButton
                    onClick={handleClear}
                    className={styles["clear-field-button"]}
                    isStopFocus
                    size="small-m"
                    variant="clear"
                    color="secondary"
                    aria-label="Clear the field"
                    tabIndex={-1}
                    isDisabled={isDisabled}
                    isReadonly={isReadonly}
                  >
                    <Icon variant="x-mark" />
                  </IconButton>
                )}
                {type === "password" && isVisibleEyeButton && (
                  <IconButton
                    onClick={handleToggleVisibilityPassword}
                    isStopFocus
                    size="small-m"
                    variant="clear"
                    color="secondary"
                    aria-label="Toggle visible the password"
                    tabIndex={currentTabIndex}
                    isDisabled={isDisabled}
                  >
                    <Icon variant="eye" />
                  </IconButton>
                )}
                {isVisibleOpenMenuButton && (
                  <IconButton
                    className={styles["open-menu-button"]}
                    onClick={onClick}
                    isStopFocus
                    size="small-m"
                    variant="clear"
                    color="secondary"
                    aria-label="Toggle visible the password"
                    tabIndex={currentTabIndex}
                    isDisabled={isDisabled}
                  >
                    <Icon variant="arrow" />
                  </IconButton>
                )}
              </div>
              {onSearch && (
                <IconButton
                  onClick={onSearch}
                  className={styles["search-button"]}
                  color="secondary"
                  borderRadius="none"
                  size="custom-size"
                  tabIndex={currentTabIndex}
                >
                  <Icon variant="search" />
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
