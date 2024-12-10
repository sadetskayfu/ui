import {
  cloneElement,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "@/shared/lib";
import { Portal } from "@/shared/ui/Portal";
import { throttle } from "lodash";
import styles from "./style.module.scss";

type TooltipPositionVariant = "left" | "top" | "bottom" | "right";

interface TooltipProps {
  className?: string
  position?: TooltipPositionVariant;
  children: ReactElement;
  Component: ReactElement;
  clickableTooltip?: boolean;
  disabledFocus?: boolean
  disabledHover?: boolean
}

export const Tooltip = memo((props: TooltipProps) => {
  const {
    className,
    position: tooltipPosition = "top",
    children,
    Component,
    clickableTooltip,
    disabledFocus,
    disabledHover,
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isUnmountingAnimation, setIsUnmountingAnimation] = useState<boolean>(false)
  const [position, setPosition] = useState({
    translateX: "-100%",
    translateY: "-100%",
  });

  const triggerElementRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    if(timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
      setIsUnmountingAnimation(false)
    }
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsUnmountingAnimation(true)
    timeoutIdRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 200)
  }

  useEffect(() => {
    if(!isVisible && isUnmountingAnimation) {
      setIsUnmountingAnimation(false)
    }
  }, [isVisible, isUnmountingAnimation])

  const handleChangePosition = useCallback(() => {
    const triggerElement = triggerElementRef.current;
    const tooltip = tooltipRef.current;

    if (!triggerElement || !tooltip) return;
    
    const triggerElementRect = triggerElement.getBoundingClientRect();

    const newPosition = { ...position };

    switch (tooltipPosition) {
      case "top":
      case "bottom":
        newPosition.translateX =
          triggerElementRect.left -
          (tooltip.offsetWidth - triggerElementRect.width) / 2 +
          window.scrollX +
          "px";
        newPosition.translateY =
          tooltipPosition === "top"
            ? triggerElementRect.top -
              tooltip.offsetHeight +
              window.scrollY +
              "px"
            : triggerElementRect.bottom + window.scrollY + "px";
        break;
      case "left":
      case "right":
        newPosition.translateY =
          triggerElementRect.top -
          (tooltip.offsetHeight - triggerElementRect.height) / 2 +
          window.scrollY +
          "px";
        newPosition.translateX =
          tooltipPosition === "left"
            ? triggerElementRect.left -
              tooltip.offsetWidth +
              window.scrollX +
              "px"
            : triggerElementRect.right + window.scrollX + "px";
        break;
    }
    setPosition(newPosition);
  }, [tooltipPosition]);

  // Update position
  useEffect(() => {
    if(!isVisible) return

    const triggerElement = triggerElementRef.current;
    const tooltip = tooltipRef.current;

    const throttledHandleChanges = throttle(handleChangePosition, 1000);

    const resizeObserver = new ResizeObserver(throttledHandleChanges);

    if (tooltip && triggerElement) {
      resizeObserver.observe(tooltip);
      resizeObserver.observe(triggerElement);
    }

    window.addEventListener("resize", throttledHandleChanges);
    window.addEventListener("scroll", throttledHandleChanges);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", throttledHandleChanges);
      window.removeEventListener("scroll", throttledHandleChanges);
      throttledHandleChanges.cancel();
    };
  }, [isVisible, handleChangePosition]);

  const triggerElementProps = {
    onFocus: !disabledFocus ? handleOpen : undefined,
    onBlur: !disabledFocus ? handleClose : undefined,
    onMouseEnter: !disabledHover ? handleOpen : undefined,
    onMouseLeave: (!clickableTooltip && !disabledHover) ? handleClose : undefined,
    ref: triggerElementRef
  }

  const mods: Record<string, boolean> = {
    [styles['unmounting']]: isUnmountingAnimation,
  }

  return (
    <div className={classNames(styles['container'], [className])} onMouseLeave={(clickableTooltip && !disabledHover) ? handleClose : undefined}>
        {cloneElement(Component, {...triggerElementProps})}
      {isVisible && (
        <Portal>
          <div
            ref={tooltipRef}
            className={classNames(styles["tooltip-wrapper"], [
              styles[tooltipPosition]
            ], mods)}
            style={{
              translate: `${position.translateX} ${position.translateY}`,
            }}
          >
            <div className={styles["tooltip"]}>
                {children}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
});
