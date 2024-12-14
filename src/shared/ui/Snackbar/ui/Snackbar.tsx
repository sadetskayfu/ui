import { ReactElement, useEffect, useRef, useState } from "react";
import { Portal } from "@/shared/ui/Portal";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

type SnackbarVariant = 'filled' | 'clear'
type SnackbarPosition = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'

interface SnackbarProps {
  className?: string
  isVisible: boolean;
  onClose: () => void
  autoHideDuration?: number;
  message?: string
  children?: ReactElement;
  variant?: SnackbarVariant
  position?: SnackbarPosition;
  zIndex?: number
}

export const Snackbar = (props: SnackbarProps) => {
    const { isVisible: externalIsVisible, onClose, autoHideDuration, message, children, variant = 'filled', position = 'top-right', className, zIndex = 1400} = props;

    const [isUnmountingAnimation, setIsUnmountingAnimation] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(externalIsVisible)

    const unmountingTimeoutId = useRef<NodeJS.Timeout | null>(null)
    const autoHideTimeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if(!externalIsVisible && isVisible) {
        setIsUnmountingAnimation(true)
        unmountingTimeoutId.current = setTimeout(() => {
            setIsVisible(false)
        }, 300)
    }
    return () => {
        setIsUnmountingAnimation(false)
        if(unmountingTimeoutId.current) clearTimeout(unmountingTimeoutId.current)
    }
  }, [externalIsVisible, isVisible])

  useEffect(() => {
    if(externalIsVisible) {
        setIsVisible(true)
    }
  }, [externalIsVisible])

  // Auto hide
  useEffect(() => {
    if(isVisible && autoHideDuration) {
        autoHideTimeoutId.current = setTimeout(() => {
            onClose()
        }, autoHideDuration) 
    }
    return () => {
        if(autoHideTimeoutId.current) clearTimeout(autoHideTimeoutId.current)
    }
  }, [isVisible, autoHideDuration, onClose])

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[variant],
    styles[position]
  ]

  const mods: Record<string, boolean> = {
    [styles['unmounting']]: isUnmountingAnimation
  }

  if (!isVisible) return;

  return (
    <Portal>
      <div className={classNames(styles['snackbar'], additionalClasses, mods)} style={{zIndex}}>
        {message && <p className={styles['message']}>{message}</p>}
        {children && children}
      </div>
    </Portal>
  );
};
