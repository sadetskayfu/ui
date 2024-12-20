import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib";
import { Portal } from "@/shared/ui/Portal";
import { throttle } from "lodash";
import {
  DropdownClosingVariant,
  DropdownPositionVariant,
} from "../Dropdown/Dropdown";
import styles from "./style.module.scss";

interface DropdownPortalProps {
  className?: string;
  positionVariant?: DropdownPositionVariant;
  closingVariant?: DropdownClosingVariant;
  children: ReactNode;
  isVisible: boolean;
  isUnmountingAnimation?: boolean;
  isMountingAnimation?: boolean;
  stopAnimation?: boolean;
  onClose: () => void;
  parentRef: React.RefObject<HTMLElement>;
  width?: "parent" | string;
  height?: "full-screen" | string;
  zIndex?: number;
}

export const DropdownPortal = (props: DropdownPortalProps) => {
  const {
    className,
    positionVariant = "column",
    closingVariant = "mousedown",
    children,
    isVisible,
    onClose,
    parentRef,
    isMountingAnimation,
    isUnmountingAnimation,
    stopAnimation,
    width,
    height,
    zIndex = 1300
  } = props;

  const [position, setPosition] = useState({
    translateX: "-100%",
    translateY: "-100%",
    width: "0",
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      const menu = menuRef.current;
      const parent = parentRef.current;
      if (
        menu &&
        parent &&
        !menu.contains(event.target as Node) &&
        !parent.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose, parentRef]
  );

  const handleStopFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleChangePosition = useCallback(() => {
    const menu = menuRef.current;
    const parent = parentRef.current;

    if (!menu || !parent) return;
    
    const menuHeight = menu.offsetHeight;
    const menuWidth = menu.offsetWidth;

    const parentRect = parent.getBoundingClientRect();
    const parentWidth = parentRect.width;

    const spaceBottom = window.innerHeight - parentRect.bottom;
    const spaceTop = parentRect.top;
    const spaceRight = window.innerWidth - parentRect.right;
    const spaceLeft = parentRect.left;

    const newPosition = { ...position };

    // Auto width
    if (width === "parent") {
      newPosition.width = parentWidth + "px";
    }
    // Row
    if (positionVariant === "column") {
      newPosition.translateY = parentRect.bottom + window.scrollY + "px";
      newPosition.translateX = parentRect.left + window.scrollX + "px";

      if (spaceTop > spaceBottom) {
        newPosition.translateY =
          parentRect.top - menuHeight + window.scrollY + "px";
      }
      if (spaceLeft > spaceRight && width !== "parent") {
        newPosition.translateX =
          parentRect.left - (menuWidth - parentWidth) + window.scrollX + "px";
      }
    }

    // Column
    if (positionVariant === "row") {
      height === 'full' ? newPosition.translateY = '0%' : newPosition.translateY = parentRect.top + window.scrollY + "px";
      newPosition.translateX = parentRect.right + window.scrollX + "px";

      if (spaceTop > spaceBottom && height !== 'full') {
        newPosition.translateY =
          parentRect.bottom - menuHeight + window.scrollY + "px";
      }
      if (spaceLeft > spaceRight) {
        newPosition.translateX =
          parentRect.left - menuWidth + window.scrollX + "px";
      }
    }

    setPosition(newPosition);
  }, [parentRef, width, height, positionVariant]);

  // Opening direction
  useEffect(() => {
    const parent = parentRef.current;
    const menu = menuRef.current;

    const throttledHandleChanges = throttle(handleChangePosition, 1000);

    const resizeObserver = new ResizeObserver(throttledHandleChanges);

    if (parent && menu) {
      resizeObserver.observe(parent);
      resizeObserver.observe(menu);
    }

    window.addEventListener("resize", throttledHandleChanges);
    window.addEventListener("scroll", throttledHandleChanges);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", throttledHandleChanges);
      window.removeEventListener("scroll", throttledHandleChanges);
      throttledHandleChanges.cancel();
    };
  }, [isVisible, parentRef, handleChangePosition]);

  // Closing the menu by clicking outside the menu area
  useEffect(() => {
    if (isVisible) {
      window.addEventListener(closingVariant, handleClose);
    }
    return () => {
      window.removeEventListener(closingVariant, handleClose);
    };
  }, [isVisible, handleClose, closingVariant]);

  const mods: Record<string, boolean | undefined> = {
    [styles["visible"]]: isVisible,
    [styles["no-transition"]]: !!stopAnimation,
    [styles['unmounting']]: isUnmountingAnimation && !stopAnimation,
    [styles['mounting']] : isMountingAnimation && !stopAnimation
  };

  const additionalClasses: Array<string | undefined> = [className];

  return (
    <Portal>
      <div
        className={classNames(styles["dropdown"], additionalClasses, mods)}
        ref={menuRef}
        onMouseDown={handleStopFocus}
        style={{
          position: height === "full-screen" ? "fixed" : "absolute",
          top: 0,
          left: 0,
          width: width === "parent" ? position.width : width,
          height: height === 'full-screen' ? '100vh' : height,
          translate: `${position.translateX} ${position.translateY}`,
          zIndex: isVisible ? zIndex : -1000,
        }}
        role="presentation"
      >
        {children}
      </div>
    </Portal>
  );
};
