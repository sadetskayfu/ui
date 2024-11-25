import {
  Children,
  useState,
  useCallback,
  useRef,
  useEffect,
  cloneElement,
  ReactElement,
} from "react";
import { MenuItemProps } from "../../MenuItem";
import styles from "./style.module.scss";

interface MenuListProps {
  children?: ReactElement[] | ReactElement;
  isVisible?: boolean;
  startIndex?: number;
  onOpen: () => void;
  onClose: () => void;
  parentRef: React.RefObject<HTMLElement>;
}

export const MenuList = (props: MenuListProps) => {
  const {
    children,
    isVisible,
    startIndex = -1,
    onOpen,
    onClose,
    parentRef,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(startIndex);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const interactiveElements: NodeListOf<HTMLButtonElement> | undefined = menuRef.current?.querySelectorAll('button, a')

  const childrenArray = Children.toArray(children);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
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
        case "Enter":
        case ' ':
          event.preventDefault()
          if (isVisible) {
            if (activeIndex >= 0) {
              interactiveElements?.[activeIndex].click()
          } else {
            setTimeout(() => {
              onClose()
            }, 0)
          }} else {
            onOpen()
          }
          break;
        case "Escape":
          isVisible && onClose();
          break;
        default:
          break;
      }
    },
    [activeIndex, childrenArray, isVisible, onClose, onOpen, interactiveElements]
  );

  // Add handle keydown on parent
  useEffect(() => {
      const currentParent = parentRef.current
      currentParent?.addEventListener('keydown', handleKeyDown)
    return () => {
      currentParent?.removeEventListener("keydown", handleKeyDown);
    };
  }, [parentRef, handleKeyDown]);

  // Scroll list if selected item not visible
  useEffect(() => {
    const currentMenu = menuRef.current;
    if (currentMenu && activeIndex !== -1) {
      const selectedElement = currentMenu.children[activeIndex];
      const menuRect = currentMenu.getBoundingClientRect();

      if (selectedElement) {
        const selectedRect = selectedElement.getBoundingClientRect();

        if (selectedRect.bottom > menuRect.bottom) {
          currentMenu.scrollTop += selectedRect.bottom - menuRect.bottom;
        } else if (selectedRect.top < menuRect.top) {
          currentMenu.scrollTop -= menuRect.top - selectedRect.top;
        }
      }
    }
  }, [activeIndex]);

  return (
    <ul className={styles["menu"]} ref={menuRef} role="menu">
      {Children.map(children, (child, index) => {

        const isHovered = index === activeIndex;

        const props: Partial<MenuItemProps> = {
          isHovered: isHovered,
          index: index,
          setActiveIndex: setActiveIndex
        }

        return cloneElement(child as ReactElement, {
          ...props
        });
      })}
    </ul>
  );
};
