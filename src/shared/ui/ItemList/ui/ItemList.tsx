import {
  Children,
  useState,
  useCallback,
  useRef,
  useEffect,
  cloneElement,
  ReactElement,
} from "react";
import styles from "./style.module.scss";
import { classNames } from "@/shared/lib";

interface ItemListProps {
  children?: React.ReactNode;
  isVisible?: boolean;
  startIndex?: number;
  onOpen: () => void;
  onClose: () => void;
  parentRef: React.RefObject<HTMLElement>;
}

export const ItemList = (props: ItemListProps) => {
  const {
    children,
    isVisible,
    startIndex = -1,
    onOpen,
    onClose,
    parentRef,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(startIndex);

  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const childrenArray = Children.toArray(children);

  const handleMouseOver = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        // Arrow Up
        case "ArrowUp":
          event.preventDefault();
          if (childrenArray.length > 0) {
            isVisible
              ? setActiveIndex((prevIndex) =>
                  prevIndex === -1
                    ? prevIndex + childrenArray.length
                    : (prevIndex - 1 + childrenArray.length) %
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
            if (activeIndex >= 0) {
                itemRefs.current[activeIndex]?.click();
            } else {
              onClose();
            }
          } else {
            onOpen();
          }
          break;
        // Space
        case " ":
          event.preventDefault();
          break;
        // Escape
        case "Escape":
          isVisible ? onClose() : parentRef.current?.blur();
          break;
        case "Tab":
          parentRef.current?.blur();
          onClose();
          break;
        default:
          break;
      }
    },
    [activeIndex, childrenArray, isVisible, onClose, onOpen, parentRef]
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
    <ul className={styles["list"]} ref={listRef} role="menu">
      {Children.map(children, (child, index) => {
        const mods: Record<string, boolean> = {
          [styles["hovered"]]: index === activeIndex,
        };

        return (
          <li key={index} className={classNames(styles["item"], [], mods)}>
            {cloneElement(child as ReactElement, {
              ref: (el: HTMLElement | null) => (itemRefs.current[index] = el),
              onMouseMove: () => handleMouseOver(index),
              role: "menuitem",
            })}
          </li>
        );
      })}
    </ul>
  );
};
