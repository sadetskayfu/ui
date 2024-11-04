import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

interface TooltipProps {
  label: string | number;
  parentRef: RefObject<HTMLElement>;
  anotherVisibilityCondition?: boolean
}

export const Tooltip = (props: TooltipProps) => {
  const { label, parentRef, anotherVisibilityCondition } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback((event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !parentRef.current?.contains(event.target as Node) && !anotherVisibilityCondition
    ) {
      setIsVisible(false);
    }
  }, [parentRef, anotherVisibilityCondition]);

  useEffect(() => {
    const currentParentRef = parentRef.current

    currentParentRef?.addEventListener('mouseenter', handleOpen)
    if(isVisible) {
      window.addEventListener('mousemove', handleClose)
    }
    return () => {
      window.removeEventListener('mousemove', handleClose)
      currentParentRef?.removeEventListener('mouseenter', handleOpen)
    }
  })

  const mods: Record<string, boolean | undefined> = {
    [styles['visible']]: isVisible
  }

  return (
    <div ref={tooltipRef} className={classNames(styles["container"], [], mods)}>
      <div className={styles["tooltip"]}>{label}</div>
    </div>
  );
};
