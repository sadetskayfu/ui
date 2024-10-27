import { Children, useState, useCallback, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

interface ItemListProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (index: number) => void;
  parentRef: React.RefObject<HTMLElement>;
}

export const ItemList = (props: ItemListProps) => {
  const { children, isVisible, onOpen, onClose, onSelect, parentRef } = props;

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const listRef = useRef<HTMLUListElement>(null);

  const childrenArray = Children.toArray(children);

  const handleMouseOver = useCallback(
    (index: number) => {
        setActiveIndex(index);
    },[]
  );

  const handleSelect = useCallback((index: number) => {
    onSelect(index)
    onClose()
  }, [onClose, onSelect])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        // Arrow Up
        case "ArrowUp":
          event.preventDefault();
          if (childrenArray.length > 0) {
            isVisible
              ? setActiveIndex(
                  (prevIndex) =>
                    (prevIndex - 1 + childrenArray.length) %
                    childrenArray.length
                )
              : onOpen();
          }
          break;
        // Arrow Down
        case "ArrowDown":
          event.preventDefault();
          if (childrenArray.length > 0) {
            isVisible
              ? setActiveIndex(
                  (prevIndex) => (prevIndex + 1) % childrenArray.length
                )
              : onOpen();
          }
          break;
        // Enter
        case "Enter":
          if (isVisible) {
            if(activeIndex >= 0) {
               handleSelect(activeIndex)
            } else {
                onClose()
            }
          } else {
            onOpen();
          }
          break;
        // Escape
        case "Escape":
          isVisible ? onClose() : parentRef.current?.blur();
          break;
        default:
          break;
      }
    },
    [
      activeIndex,
      childrenArray,
      isVisible,
      onClose,
      onOpen,
      parentRef,
      handleSelect,
    ]
  );

  // Add handle keydown on parent
  useEffect(() => {
    const currentParentRef = parentRef.current;
    currentParentRef?.addEventListener("keydown", handleKeyDown);
    return () => {
      currentParentRef?.removeEventListener("keydown", handleKeyDown);
    };
  }, [parentRef, handleKeyDown]);

  // Scroll list if selected item not visible
  useEffect(() => {
    const currentList = listRef.current;
    if (currentList && activeIndex !== -1) {
      const selectedElement = currentList.children[activeIndex];
      const listRect = currentList.getBoundingClientRect();

      if (selectedElement) {
        const selectedRect = selectedElement.getBoundingClientRect();

        if (selectedRect.bottom > listRect.bottom) {
          currentList.scrollTop += selectedRect.bottom - listRect.bottom;
        } else if (selectedRect.top < listRect.top) {
          currentList.scrollTop -= listRect.top - selectedRect.top;
        }
      }
    }
  }, [activeIndex]);

  return (
    <ul className={styles["list"]} ref={listRef}>
      {childrenArray.map((child, index) => {
        const mods: Record<string, boolean> = {
          [styles["hovered"]]: index === activeIndex,
        };

        return (
          <li
            key={index}
            className={classNames(styles["item"], [], mods)}
            onMouseMove={() => handleMouseOver(index)}
            onClick={() => handleSelect(index)}
          >
            {child}
          </li>
        );
      })}
    </ul>
  );
};
