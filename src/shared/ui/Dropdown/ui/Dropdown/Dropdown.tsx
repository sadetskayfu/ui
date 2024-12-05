import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";
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
  isStopAnimation?: boolean;
  width?: string | 'parent';
  height?: string;
}

type VerticalOpeningDirection =
  | "row-down"
  | "row-up"
  | "column-down"
  | "column-up";
type HorizontalOpeningDirection =
  | "row-left"
  | "row-right"
  | "column-left"
  | "column-right";

export const Dropdown = (props: DropdownMenuProps) => {
  const {
    className,
    positionVariant = "row",
    closingVariant = "mousedown",
    children,
    isVisible,
    onClose,
    parentRef,
    isStopAnimation,
    width,
    height,
  } = props;

  const [verticalOpeningDirection, setVerticalOpeningDirection] =
    useState<VerticalOpeningDirection>("row-down");
  const [horizontalOpeningDirection, setHorizontalOpeningDirection] =
    useState<HorizontalOpeningDirection>("row-left");

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
    const parent = parentRef.current;

    if (!parent) return;
    
    const parentRect = parent.getBoundingClientRect();

    const spaceBottom = window.innerHeight - parentRect.bottom;
    const spaceTop = parentRect.top;
    const spaceRight = window.innerWidth - parentRect.right;
    const spaceLeft = parentRect.left;

    // Row
    if (positionVariant === "row") {
      if (spaceTop > spaceBottom) {
        setVerticalOpeningDirection("row-up");
      } else {
        setVerticalOpeningDirection("row-down");
      }
      if (spaceLeft > spaceRight) {
        setHorizontalOpeningDirection("row-left");
      } else {
        setHorizontalOpeningDirection("row-right");
      }
    }

    // Column
    if (positionVariant === "column") {
      if (spaceTop > spaceBottom) {
        setVerticalOpeningDirection("column-up");
      } else {
        setVerticalOpeningDirection("column-down");
      }
      if (spaceLeft > spaceRight) {
        setHorizontalOpeningDirection("column-left");
      } else {
        setHorizontalOpeningDirection("column-right");
      }
    }
  }, [parentRef, positionVariant])

  useEffect(() => {
    const throttledHandleChanges = throttle(handleChangePosition, 1000);

    window.addEventListener("resize", throttledHandleChanges);
    window.addEventListener("scroll", throttledHandleChanges);

    handleChangePosition()

    return () => {
      console.log("remove");
      window.removeEventListener("resize", throttledHandleChanges);
      window.removeEventListener("scroll", throttledHandleChanges);
      throttledHandleChanges.cancel();
    };

  }, [parentRef, positionVariant, isVisible, handleChangePosition]);

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
    [styles["no-animation"]]: !!isStopAnimation,
  };

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[horizontalOpeningDirection],
    styles[verticalOpeningDirection],
  ];

  return (
    <div
      className={classNames(styles["dropdown"], additionalClasses, mods)}
      ref={menuRef}
      onMouseDown={handleStopFocus}
      role="presentation"
      style={{
        width: width === 'parent' ? '100%' : width,
        height: height,
      }}
    >
      {children}
    </div>
  );
};
