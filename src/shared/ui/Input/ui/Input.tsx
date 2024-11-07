import { classNames } from "@/shared/lib";
import {
  ChangeEvent,
  memo,
  useRef,
  forwardRef,
  useState,
  useId,
} from "react";
import styles from "./style.module.scss";
import { IconButton } from "../../IconButton";
import PasswordIcon from "@/shared/assets/icons/eye-password.svg?react";
import SearchIcon from '@/shared/assets/icons/search.svg?react';

export type InputVariant = "primary" | "transparent" | "clear";
export type InputSize = "medium" | "large";
export type InputLabelVariant = "jump" | "none" | "static";

interface InputProps {
  className?: string;
  label: string;
  name: string;
  placeholder?: string;
  variant?: InputVariant;
  labelVariant?: InputLabelVariant;
  size?: InputSize;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isVisiblePasswordButton?: boolean;
  isVisibleOpenMenuButton?: boolean;
  isSearch?: boolean;
  errorMessage?: string;
  value: string;
  type?: "text" | "password";
  onClick?: () => void
  onBlur?: () => void
  onFocus?: () => void
  onChange?: (value: string) => void;
}

export const Input = memo(
  forwardRef(
    (props: InputProps, ref: React.ForwardedRef<HTMLInputElement | null>) => {
      const {
        value,
        onChange,
        className,
        label,
        errorMessage,
        placeholder,
        variant = "primary",
        labelVariant = "jump",
        size = "medium",
        isReadonly,
        isRequired,
        isDisabled,
        isSearch,
        isVisiblePasswordButton,
        onClick,
        onBlur,
        onFocus,
        type = "text",
      } = props;

      const [isPasswordVisible, setIsPasswordVisible] =
        useState<boolean>(false);

      const id = useId();

      const inputRef = useRef<HTMLInputElement>(null);
      const input = ref ? (ref as React.RefObject<HTMLInputElement>) : inputRef;

      const isFocus = document.activeElement === input.current

      const toggleVisibilityPassword = () => {
        if (input.current && isVisiblePasswordButton) {
          const cursorPosition = input.current.selectionStart;
          setIsPasswordVisible((prev) => !prev);
          setTimeout(() => {
            input.current!.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        }
      };

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value.trim());
      };

      const handleClear = () => {
        onChange?.("");
      };

      const mods: Record<string, boolean | undefined> = {
        [styles["dirty"]]: value.length !== 0,
        [styles["error"]]: !!errorMessage,
        [styles["readonly"]]: isReadonly,
        [styles["disabled"]]: isDisabled,
        [styles["required"]]: isRequired,
        [styles['password']]: isVisiblePasswordButton,
        [styles['search']]: isSearch
      };

      const additionalClasses: Array<string | undefined> = [
        className,
        styles[variant],
        styles[labelVariant],
        styles[size],
      ];

      const inputType: string =
        type === "password" ? (isPasswordVisible ? "text" : "password") : type;

      const tabIndex: number = isDisabled || isReadonly ? -1 : 0;

      return (
        <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor={id}>
              {label}
            </label>
            <input
              className={styles["input"]}
              tabIndex={tabIndex}
              placeholder={placeholder}
              id={id}
              aria-errormessage={id + "errors"}
              value={value}
              onChange={handleChange}
              type={inputType}
              ref={input}
              autoComplete={type === 'password' ? 'new-password' : 'off'}
              disabled={isDisabled}
              required={isRequired}
              readOnly={isReadonly}
              onClick={onClick}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            <div className={styles["buttons"]}>
              <IconButton
                className={styles["clear-button"]}
                variant="cross"
                size="small"
                onClick={handleClear}
                isStopFocus
                tabIndex={isFocus && value.length > 0 && !isDisabled && !isReadonly ? 0 : -1}
              >
                Clear field
              </IconButton>
              {isVisiblePasswordButton && (
                <IconButton
                  onClick={toggleVisibilityPassword}
                  Icon={PasswordIcon}
                  size="small"
                  variant="password"
                  isActive={isPasswordVisible}
                  isStopFocus
                  tabIndex={isFocus && !isDisabled && !isReadonly ? 0 : -1}
                >
                  Toggle visibility password
                </IconButton>
              )}
              {isSearch && (
                <IconButton
                  onClick={onClick}
                  Icon={SearchIcon}
                  size="small"
                  tabIndex={isFocus && !isDisabled && !isReadonly ? 0 : -1}
                >
                  Search
                </IconButton>
              )}
            </div>
          </div>
          {errorMessage && (
            <span id={id + "errors"} className={styles["error-message"]}>
              {errorMessage}
            </span>
          )}
        </div>
      );
    }
  )
);
