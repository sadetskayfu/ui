import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib";
import styles from "./style.module.scss";

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
export type DropdownPositionVariant = "row" | "column";
export type DropdownClosingVariant = "mousedown" | "mousemove";

interface DropdownMenuProps {
  className?: string;
  positionVariant?: DropdownPositionVariant;
  closingVariant?: DropdownClosingVariant;
  children: ReactElement;
  isVisible: boolean;
  onClose: () => void;
  parentRef: React.RefObject<HTMLElement>;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    className,
    positionVariant = "row",
    closingVariant = "mousedown",
    children,
    isVisible,
    onClose,
    parentRef,
  } = props;

  const [verticalOpeningDirection, setVerticalOpeningDirection] =
    useState<VerticalOpeningDirection>("row-down");
  const [horizontalOpeningDirection, setHorizontalOpeningDirection] =
    useState<HorizontalOpeningDirection>("row-left");

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
    if (menuRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const spaceBottom = window.innerHeight - parentRect.bottom;
      const spaceTop = parentRect.top;
      const spaceRight = window.innerWidth - parentRect.right;
      const spaceLeft = parentRect.left;

      // Vertical
      if (spaceTop > spaceBottom) {
        if (positionVariant === "row") {
          setVerticalOpeningDirection("row-up");
        } else {
          setVerticalOpeningDirection("column-up");
        }
      } else {
        if (positionVariant === "row") {
          setVerticalOpeningDirection("row-down");
        } else {
          setVerticalOpeningDirection("column-down");
        }
      }

      // Horizontal
      if (spaceRight > spaceLeft) {
        if (positionVariant === "row") {
          setHorizontalOpeningDirection("row-right");
        } else {
          setHorizontalOpeningDirection("column-right");
        }
      } else {
        if (positionVariant === "row") {
          setHorizontalOpeningDirection("row-left");
        } else {
          setHorizontalOpeningDirection("column-left");
        }
      }
    }
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

  const additionalClasses: Array<string | undefined> = [
    className,
    styles[verticalOpeningDirection],
    styles[horizontalOpeningDirection],
  ];

  return (
    <div
      className={classNames(styles["dropdown"], additionalClasses, mods)}
      ref={menuRef}
      onMouseDown={handleStopFocus}
    >
      {children}
    </div>
  );
};
