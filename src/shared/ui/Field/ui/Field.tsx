import { classNames } from "@/shared/lib";
import { ChangeEvent, memo, useRef, forwardRef, useState, useId, InputHTMLAttributes } from "react";
import styles from "./style.module.scss";
import { Icon } from "../../Icon";
import { Button } from "../../Button";

export type FieldVariant = "outlined";
export type FieldSize = "small" | "medium" | "large";
export type FieldLabelVariant = "jump" | "static";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>

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
  isVisibleEyeButton?: boolean;
  isVisibleOpenMenuButton?: boolean;
  isSearch?: boolean;
  errorMessage?: string;
  value: string;
  type?: "text" | "password";
  tabIndex?: number;
  onClick?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: string) => void;
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
        labelVariant = "jump",
        size = "medium",
        isReadonly,
        isRequired,
        isDisabled,
        isSearch,
        isVisibleEyeButton,
        isVisibleOpenMenuButton,
        tabIndex = 0,
        onClick,
        onBlur,
        onFocus,
        type = "text",
        ...otherProps
      } = props;

      const [isPasswordVisible, setIsPasswordVisible] =
        useState<boolean>(false);

      const [isFocusedField, setIsFocusedField] = useState<boolean>(false);

      const id = useId();

      const inputRef = useRef<HTMLInputElement>(null);
      const input = ref ? (ref as React.RefObject<HTMLInputElement>) : inputRef;

      const handleFocus = () => {
        setIsFocusedField(true);
        onFocus?.();
      };

      const handleBlur = () => {
        setIsFocusedField(false);
        onBlur?.();
      };

      const handleSetFocus = () => {
        input.current?.focus()
      }

      const toggleVisibilityPassword = () => {
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

      const isDirty = value.length > 0

      const inputType: string =
        type === "password" ? (isPasswordVisible ? "text" : "password") : type;

      const currentTabIndex: number = isDisabled || isReadonly ? -1 : tabIndex;

      const mods: Record<string, boolean | undefined> = {
        [styles["dirty"]]: isDirty,
        [styles["errored"]]: !!errorMessage,
        [styles['focused']]: isFocusedField,
        [styles["readonly"]]: isReadonly,
        [styles["disabled"]]: isDisabled,
        [styles["required"]]: isRequired,
      };

      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[labelVariant],
        styles[size],
      ];

      return (
        <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
          <div className={styles["field-wrapper"]}>
            <label className={styles["label"]} htmlFor={id}>
              {label}
            </label>
            <div className={styles["field"]} onClick={handleSetFocus}>
              <input
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
                {...otherProps}
              />
              <div className={styles["buttons"]}>
                {isDirty && (
                  <Button
                    onClick={handleClear}
                    className={styles["clear-field-button"]}
                    isStopFocus
                    size="small-m"
                    variant="clear"
                    isHiddenLabel
                    minimalism="round"
                    Icon={
                      <Icon
                        variant="x-mark"
                        size="small"
                        color="custom-color"
                      />
                    }
                  >
                    Clear field
                  </Button>
                )}
                {type === "password" && isVisibleEyeButton && (
                  <Button
                    className={styles['eye-button']}
                    onClick={toggleVisibilityPassword}
                    isStopFocus
                    size="small-m"
                    variant="clear"
                    isHiddenLabel
                    minimalism="round"
                    Icon={
                      <Icon variant="eye" size="small" color="custom-color" />
                    }
                  >
                    Toggle visibility password
                  </Button>
                )}
                {isVisibleOpenMenuButton && (
                  <Button
                    className={styles["open-menu-button"]}
                    isStopFocus
                    size="small-m"
                    variant="clear"
                    isHiddenLabel
                    minimalism="round"
                    Icon={
                      <Icon variant="arrow" size="small" color="custom-color" />
                    }
                  >
                    Open options menu
                  </Button>
                )}
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
  )
);
