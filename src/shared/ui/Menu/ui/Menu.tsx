import { classNames } from "@/shared/lib";
import {
  Dropdown,
  DropdownClosingVariant,
  DropdownPositionVariant,
} from "@/shared/ui/Dropdown";
import {
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";

interface MenuProps {
  className?: string;
  children: ReactElement[];
  isVisible: boolean;
  onClose: () => void;
  parentRef: RefObject<HTMLElement>;
  id: string;
  labelId: string;
  positionVariant?: DropdownPositionVariant;
  closingVariant?: DropdownClosingVariant;
}

export const Menu = (props: MenuProps) => {
  const {
    className,
    children,
    isVisible,
    onClose,
    parentRef,
    id,
    labelId,
    positionVariant,
    closingVariant,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const menuRef = useRef<HTMLUListElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  // Get items
  useEffect(() => {
    if (!menuRef.current) return;

    const currentMenu = menuRef.current;

    const updateFocusableElements = () => {
      const focusableElements = currentMenu.querySelectorAll<HTMLElement>(
        "a, button, [tabindex]"
      );
      focusableElementsRef.current = Array.from(focusableElements);
    };

    const observer = new MutationObserver(updateFocusableElements);

    observer.observe(currentMenu, {
      childList: true,
      subtree: true,
    });

    updateFocusableElements();

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let newIndex = activeIndex;
      const currentFocusableElements = focusableElementsRef.current;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowUp" ? -1 : 1;
          newIndex =
            newIndex === -1 && direction === -1
              ? currentFocusableElements.length - 1
              : (activeIndex + direction + currentFocusableElements.length) %
                currentFocusableElements.length;
          currentFocusableElements[newIndex].focus();
          break;
        case "Escape":
        case "Tab":
          event.preventDefault();
          onClose();
          break;
        default:
          break;
      }

      if (event.shiftKey && event.key === "Tab") {
        event.preventDefault();
        onClose();
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    },
    [activeIndex, onClose]
  );

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }
    if (!isVisible && activeIndex !== -1) {
      setActiveIndex(-1);
      parentRef.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isVisible, activeIndex, parentRef]);

  return (
    <Dropdown
      isVisible={isVisible}
      onClose={onClose}
      parentRef={parentRef}
      closingVariant={closingVariant}
      positionVariant={positionVariant}
    >
      <ul
        className={classNames(styles["menu-list"], [className])}
        role="menu"
        ref={menuRef}
        id={id}
        aria-labelledby={labelId}
      >
        {children}
      </ul>
    </Dropdown>
  );
};
