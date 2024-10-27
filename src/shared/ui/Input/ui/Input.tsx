import { classNames } from "@/shared/lib";
import {
  InputHTMLAttributes,
  ChangeEvent,
  memo,
  useRef,
  forwardRef,
  useState,
  useId,
} from "react";
import { ClearFieldButton } from "../../ClearFieldButton";
import { ShowButtonPassword } from "../../ShowPasswordButton";

import styles from "./style.module.scss";

export type InputVariant = "primary" | "transparent";
export type LabelVariant = "placeholder" | "none" | "static";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface InputProps extends HTMLInputProps {
  className?: string;
  label: string;
  name: string;
  required?: boolean;
  variant?: InputVariant;
  labelVariant?: LabelVariant;
  readonly?: boolean;
  disabled?: boolean;
  showPasswordButton?: boolean;
  showOpenMenuButton?: boolean;
  errorMessage?: string;
  value: string;
  type: string;
  onChange?: (value: string) => void;
}

export const Input = memo(
  forwardRef((props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      value,
      onChange,
      className,
      label,
      errorMessage,
      required,
      variant = "primary",
      labelVariant = "label-placeholder",
      readOnly,
      disabled,
      showPasswordButton,
      type,
      ...otherProps
    } = props;

    const [visibilityPassword, setVisibilityPassword] =
      useState<boolean>(false);

    const id = useId()

    const inputRef = useRef<HTMLInputElement>(null)
    const input = ref ? ref as React.RefObject<HTMLInputElement> : inputRef
    

    const toggleVisibilityPassword = () => {
        if(input.current && showPasswordButton) {
            const cursorPosition = input.current.selectionStart
            setVisibilityPassword((prev) => !prev);
            setTimeout(() => {
                input.current!.setSelectionRange(cursorPosition, cursorPosition)
            }, 0)
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
      [styles["readonly"]]: readOnly,
      [styles["disabled"]]: disabled,
    };

    const additionalClasses: Array<string | undefined> = [
      className,
      styles[variant],
      styles[labelVariant],
    ];

    const inputType: string = (type === 'password') ? (visibilityPassword? 'text' : 'password') : type

    const tabIndex:number = (disabled || readOnly)? -1 : 0

    return (
      <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
        <div className={styles["field"]}>
          <label className={styles["label"]} htmlFor={id}>
            {label}
            {required && <span className={styles["label__required"]}>*</span>}
          </label>
          <input
            className={styles["input"]}
            tabIndex={tabIndex}
            id={id}
            aria-errormessage={id+'errors'}
            value={value}
            onChange={handleChange}
            type={inputType}
            ref={input}
            {...otherProps}
          />
          <div className={styles["buttons"]}>
          <ClearFieldButton className={styles['clear-button']} label="clear field" onClear={handleClear} />
            {showPasswordButton && (
              <ShowButtonPassword
                className={styles['password-button']}
                label="switching password visibility"
                isCrossed={visibilityPassword}
                onToggle={toggleVisibilityPassword}
              />
            )}
          </div>
        </div>
        {errorMessage && (
          <span id={id+'errors'} className={styles["error-message"]}>{errorMessage}</span>
        )}
      </div>
    );
  })
);
