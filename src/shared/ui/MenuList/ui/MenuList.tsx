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
import type { MenuItem } from "@/shared/ui/MenuItem";
import styles from "./style.module.scss";

interface MenuListProps {
  children: ReactElement<typeof MenuItem>[] | ReactElement<typeof MenuItem>;
  isVisible?: boolean;
  startIndex?: number;
  onOpen: () => void;
  onClose: () => void;
  setActiveOptionId: (id: string) => void;
  parentRef: React.RefObject<HTMLElement>;
  role: string;
  ariaMultiselectable?: "true" | "false";
  labelId?: string;
  id?: string;
}

export const MenuList = (props: MenuListProps) => {
  const {
    children,
    isVisible,
    startIndex = -1,
    onOpen,
    onClose,
    setActiveOptionId,
    parentRef,
    role,
    ariaMultiselectable,
    labelId,
    id,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(startIndex);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const interactiveElementsRef = useRef<
    Array<HTMLButtonElement | HTMLLinkElement>
  >([]);

  // Get interactive elements
  useEffect(() => {
    const currentMenu = menuRef.current;
    if (!currentMenu) return;

    const updateInteractiveElements = () => {
      const interactiveElements = currentMenu.querySelectorAll<
        HTMLButtonElement | HTMLLinkElement
      >("a, button");
      interactiveElementsRef.current = Array.from(interactiveElements);
    };

    const observer = new MutationObserver(updateInteractiveElements);

    observer.observe(currentMenu, {
      childList: true,
    });

    updateInteractiveElements();

    return () => {
      observer.disconnect();
    };
  }, []);

  const findNextEnabledItem = useCallback(
    (currentIndex: number, direction: 1 | -1) => {
      const currentInteractiveElements = interactiveElementsRef.current;

      let nextIndex = activeIndex;

      for (let i = 1; i <= currentInteractiveElements.length; i++) {
        const step = direction * i;
        nextIndex =
          (currentIndex + step + currentInteractiveElements.length) %
          currentInteractiveElements.length;
        const isDisabled =
          currentInteractiveElements[nextIndex].getAttribute(
            "data-disabled"
          ) === "true";
        if (!isDisabled) return nextIndex;
      }

      return -1;
    },
    [activeIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let newIndex = activeIndex;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          isVisible && interactiveElementsRef.current.length > 0
            ? (newIndex = findNextEnabledItem(activeIndex, direction))
            : onOpen();

          if (newIndex !== -1 && newIndex !== activeIndex && interactiveElementsRef.current) {
            const hoveredItem = interactiveElementsRef.current[newIndex];
            setActiveOptionId(hoveredItem.getAttribute("id") as string);
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (isVisible) {
            activeIndex <= -1
              ? onClose()
              : interactiveElementsRef.current[activeIndex].click();
          } else {
            onOpen();
          }
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        default:
          return;
      }

      newIndex !== activeIndex && setActiveIndex(newIndex);
    },
    [
      activeIndex,
      isVisible,
      onClose,
      onOpen,
      findNextEnabledItem,
      setActiveOptionId,
    ]
  );

  // Add handle keydown on parent
  useEffect(() => {
    const currentParent = parentRef.current;
    currentParent?.addEventListener("keydown", handleKeyDown);
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
    <ul
      className={styles["menu"]}
      ref={menuRef}
      role={role}
      aria-multiselectable={ariaMultiselectable}
      aria-labelledby={labelId}
      id={id}
    >
      {Children.map(children, (child, index) => {
        const isHovered = index === activeIndex;

        const props: Partial<MenuItemProps> = {
          isHovered,
          index,
          setActiveIndex,
        };

        return cloneElement(child as ReactElement, {
          ...props,
        });
      })}
    </ul>
  );
};
