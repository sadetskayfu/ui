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
import { ActionButton } from "../../ActionButton";
import styles from "./style.module.scss";

export type InputVariant = "primary" | 'secondary' | "transparent" | 'clear';
export type InputSize = 'medium' | 'large'
export type InputLabelVariant = "jump" | "none" | "static";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">;

interface InputProps extends HTMLInputProps {
  className?: string;
  label: string;
  name: string;
  variant?: InputVariant;
  labelVariant?: InputLabelVariant;
  size?: InputSize;
  isReadonly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  showPasswordButton?: boolean;
  showOpenMenuButton?: boolean;
  errorMessage?: string;
  value: string;
  type?: 'text' | 'password';
  onChange?: (value: string) => void;
}

export const Input = memo(
  forwardRef((props: InputProps, ref: React.ForwardedRef<HTMLInputElement | null>) => {
    const {
      value,
      onChange,
      className,
      label,
      errorMessage,
      variant = "primary",
      labelVariant = "jump",
      size = 'medium',
      isReadonly,
      isRequired,
      isDisabled,
      showPasswordButton,
      type = 'text',
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
      [styles["readonly"]]: isReadonly,
      [styles["disabled"]]: isDisabled,
      [styles['required']]: isRequired
    };

    const additionalClasses: Array<string | undefined> = [
      className,
      styles[variant],
      styles[labelVariant],
      styles[size]
    ];

    const inputType: string = (type === 'password') ? (visibilityPassword? 'text' : 'password') : type

    const tabIndex:number = (isDisabled || isReadonly)? -1 : 0

    return (
      <div className={classNames(styles["wrapper"], additionalClasses, mods)}>
        <div className={styles["field"]}>
          <label className={styles["label"]} htmlFor={id}>
            {label}
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
            autoComplete="off"
            {...otherProps}
          />
          <div className={styles["buttons"]}>
          <ActionButton className={styles['clear-button']} tabIndex={-1} variant="cross" label="Clear field" onClick={handleClear} />
            {showPasswordButton && (
              <ActionButton
                className={styles['password-button']}
                variant="password"
                label="switch password visibility"
                isCrossed={visibilityPassword}
                onClick={toggleVisibilityPassword}
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
