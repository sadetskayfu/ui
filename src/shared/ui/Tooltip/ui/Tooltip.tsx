import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

interface TooltipProps {
  label: string | number;
  parentRef: RefObject<HTMLElement>;
  anotherVisibilityCondition?: boolean;
  initialVisibility?: boolean;
  onToggle?: (value: boolean) => void;
}

export const Tooltip = memo((props: TooltipProps) => {
  const {
    label,
    parentRef,
    anotherVisibilityCondition,
    initialVisibility = false,
    onToggle,
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = useCallback(() => {
    setIsVisible(true);
    onToggle?.(true);
  }, [onToggle]);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !parentRef.current?.contains(event.target as Node) &&
        !anotherVisibilityCondition
      ) {
        setIsVisible(false);
        onToggle?.(false);
      }
    },
    [parentRef, anotherVisibilityCondition, onToggle]
  );

  useEffect(() => {
    const currentParentRef = parentRef.current;

    currentParentRef?.addEventListener("mouseenter", handleOpen);
    if (isVisible) {
      window.addEventListener("mousemove", handleClose);
    }
    return () => {
      window.removeEventListener("mousemove", handleClose);
      currentParentRef?.removeEventListener("mouseenter", handleOpen);
    };
  });

  useEffect(() => {
    setIsVisible(initialVisibility);
  }, [initialVisibility]);

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: isVisible,
  };

  return (
      <div
        ref={tooltipRef}
        className={classNames(styles["container"], [], mods)}
      >
        <div className={styles["tooltip"]}>{label}</div>
      </div>
  );
});
