import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
import { Portal } from "../../Portal";
import { throttle } from "lodash";

export type DropdownPositionVariant = "row" | "column";
export type DropdownClosingVariant = "mousedown" | "mousemove";

interface DropdownMenuProps {
  className?: string;
  positionVariant?: DropdownPositionVariant;
  closingVariant?: DropdownClosingVariant;
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  parentRef: React.RefObject<HTMLElement>;
  width?: string
}

export const Dropdown = (props: DropdownMenuProps) => {
  const {
    className,
    positionVariant = "row",
    closingVariant = "mousedown",
    children,
    isVisible,
    onClose,
    parentRef,
    width
  } = props;

  const [position, setPosition] = useState({
    left: "0",
    top: "0",
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !parentRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose, parentRef]
  );

  const handleStopFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  // Opening direction
  useEffect(() => {
    if (!isVisible) return;;

    const handleChanges = () => {
      if (!menuRef.current || !parentRef.current) return;

      const menuRect = menuRef.current.getBoundingClientRect();
      const menuHeight = menuRect.height;
      const menuWidth = menuRect.width;

      const parentRect = parentRef.current.getBoundingClientRect();
      const parentBottomPosition = parentRect.bottom;
      const parentRightPosition = parentRect.right;
      const spaceBottom = window.innerHeight - parentRect.bottom;
      const spaceTop = parentRect.top;
      const spaceRight = window.innerWidth - parentRect.right;
      const spaceLeft = parentRect.left;

      const newPosition = { ...position };

      // Row
      if (positionVariant === "row") {
        if (spaceTop > spaceBottom) {
          newPosition.top = spaceTop - menuHeight + window.scrollY + "px";
        } else {
          newPosition.top = parentBottomPosition + window.scrollY + "px";
        }
        if (spaceRight > spaceLeft) {
          newPosition.left = spaceLeft + window.scrollX + "px";
        } else {
          newPosition.left =
            parentRightPosition + window.scrollX - menuWidth + "px";
        }
      }
      // Column
      if (positionVariant === "column") {
        if (spaceTop > spaceBottom) {
          newPosition.top =
            parentBottomPosition - menuHeight + window.scrollY + "px";
        } else {
          newPosition.top = spaceTop + window.scrollY + "px";
        }
        if (spaceRight > spaceLeft) {
          newPosition.left = parentRightPosition + window.scrollX + "px";
        } else {
          newPosition.left = spaceLeft + window.scrollX - menuWidth + "px";
        }
      }

      setPosition(newPosition);
    };

    const throttledHandleChanges = throttle(handleChanges, 300);

    const resizeObserver = new ResizeObserver(throttledHandleChanges);

    if (parentRef.current && menuRef.current) {
      resizeObserver.observe(parentRef.current);
      resizeObserver.observe(menuRef.current);
    }

    window.addEventListener("scroll", throttledHandleChanges);
    window.addEventListener("resize", throttledHandleChanges);

    handleChanges();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", throttledHandleChanges);
      window.removeEventListener("resize", throttledHandleChanges);
      throttledHandleChanges.cancel();
      console.log("remove");
    };
  }, [isVisible, parentRef, positionVariant]);

  // Closing the menu by clicking outside the menu area
  useEffect(() => {
    if (isVisible) {
      window.addEventListener(closingVariant, handleClose);
    }
    return () => {
      window.removeEventListener(closingVariant, handleClose);
    };
  }, [isVisible, handleClose, closingVariant]);

  const mods: Record<string, boolean> = {
    [styles["visible"]]: isVisible,
  };

  const additionalClasses: Array<string | undefined> = [className];

  return (
    <Portal>
      <div
        className={classNames(styles["dropdown"], additionalClasses, mods)}
        ref={menuRef}
        onMouseDown={handleStopFocus}
        style={{ top: position.top, left: position.left, width }}
      >
        {children}
      </div>
    </Portal>
  );
};
